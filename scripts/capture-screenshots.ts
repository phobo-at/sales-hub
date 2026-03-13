import fs from "node:fs/promises";
import path from "node:path";
import { chromium, type BrowserContextOptions } from "playwright";
import { SCREENSHOT_CONTRACT, SCREENSHOT_SLOT_IDS } from "@/content/screenshot-contract";
import {
  SCREENSHOT_MANIFEST_BY_ID,
  SCREENSHOT_VIEWPORTS,
  type ScreenshotManifestItem
} from "@/content/screenshot-manifest";
import { MODULE_IDS, type ModuleId } from "@/lib/domain";
import {
  getCaptureBaseUrl,
  getCaptureStorageStatePath,
  getScreenshotAuthCredentials
} from "@/lib/env";
import { validateScreenshotContractAndMapping } from "@/lib/screenshot-validation";

interface CaptureResult {
  selected: string[];
  captured: string[];
  todo: string[];
  failed: Array<{ slotId: string; reason: string }>;
  skipped: Array<{ slotId: string; reason: string }>;
}

interface CaptureCliOptions {
  id?: string;
  module?: ModuleId;
}

const SCREENSHOT_CANVAS_SELECTOR = '[data-testid="screen-canvas"]';

async function ensureStorageStateExists(filePath: string): Promise<void> {
  try {
    await fs.access(filePath);
  } catch {
    throw new Error(`Playwright storageState nicht gefunden: ${filePath}`);
  }
}

function parseCliOptions(args: string[]): CaptureCliOptions {
  const options: CaptureCliOptions = {};

  for (let index = 0; index < args.length; index += 1) {
    const token = args[index];

    if (token === "--id") {
      const value = args[index + 1];
      if (!value) {
        throw new Error("Argument --id braucht einen Wert.");
      }
      options.id = value;
      index += 1;
      continue;
    }

    if (token.startsWith("--id=")) {
      options.id = token.slice("--id=".length);
      continue;
    }

    if (token === "--module") {
      const value = args[index + 1];
      if (!value) {
        throw new Error("Argument --module braucht einen Wert.");
      }
      options.module = value as ModuleId;
      index += 1;
      continue;
    }

    if (token.startsWith("--module=")) {
      options.module = token.slice("--module=".length) as ModuleId;
      continue;
    }

    throw new Error(`Unbekanntes Argument: ${token}`);
  }

  if (options.id && !SCREENSHOT_SLOT_IDS.includes(options.id as (typeof SCREENSHOT_SLOT_IDS)[number])) {
    throw new Error(`Unbekannte Screenshot-ID fuer --id: ${options.id}`);
  }

  if (options.module && !MODULE_IDS.includes(options.module)) {
    throw new Error(`Unbekanntes Modul fuer --module: ${options.module}`);
  }

  return options;
}

function getSelectedContractSlots(options: CaptureCliOptions) {
  const selected = SCREENSHOT_CONTRACT.filter((item) => {
    if (options.id && item.id !== options.id) {
      return false;
    }

    if (options.module && item.module !== options.module) {
      return false;
    }

    return true;
  });

  if (selected.length === 0) {
    const moduleInfo = options.module ? `, module=${options.module}` : "";
    const idInfo = options.id ? `id=${options.id}` : "ohne id-Filter";
    throw new Error(`Keine Screenshot-Slots gefunden fuer ${idInfo}${moduleInfo}.`);
  }

  return selected;
}

function resolveManifestItem(slotId: string): ScreenshotManifestItem | null {
  return SCREENSHOT_MANIFEST_BY_ID[slotId as keyof typeof SCREENSHOT_MANIFEST_BY_ID] ?? null;
}

async function runCapture(options: CaptureCliOptions): Promise<CaptureResult> {
  const selectedSlots = getSelectedContractSlots(options);
  const result: CaptureResult = {
    selected: selectedSlots.map((item) => item.id),
    captured: [],
    todo: [],
    failed: [],
    skipped: []
  };
  const manifestCandidates = selectedSlots.filter((item) => Boolean(resolveManifestItem(item.id)));

  if (manifestCandidates.length === 0) {
    for (const slot of selectedSlots) {
      result.todo.push(slot.id);
    }
    return result;
  }

  const baseUrl = getCaptureBaseUrl();
  const storageStatePath = getCaptureStorageStatePath();
  const authCredentials = getScreenshotAuthCredentials();
  const contextOptions: BrowserContextOptions = { baseURL: baseUrl };

  if (storageStatePath) {
    await ensureStorageStateExists(storageStatePath);
    contextOptions.storageState = storageStatePath;
  }

  if (authCredentials) {
    contextOptions.httpCredentials = authCredentials;
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext(contextOptions);

  try {
    for (const contractItem of selectedSlots) {
      const manifestItem = resolveManifestItem(contractItem.id);

      if (!manifestItem) {
        result.todo.push(contractItem.id);
        continue;
      }

      if (manifestItem.requiresAuth && !storageStatePath && !authCredentials) {
        result.skipped.push({
          slotId: manifestItem.id,
          reason: "Manifest-Eintrag verlangt Auth, aber keine Auth-ENV ist gesetzt."
        });
        continue;
      }

      const outputPath = path.join(process.cwd(), "public", manifestItem.output.slice(1));
      const viewport = SCREENSHOT_VIEWPORTS[manifestItem.viewport];
      await fs.mkdir(path.dirname(outputPath), { recursive: true });

      const page = await context.newPage();

      try {
        await page.setViewportSize(viewport);
        await page.goto(new URL(manifestItem.route, baseUrl).toString(), {
          waitUntil: "networkidle",
          timeout: 30_000
        });
        await page.waitForSelector(manifestItem.waitFor, { timeout: 20_000 });

        const locator = page.locator(SCREENSHOT_CANVAS_SELECTOR).first();
        if ((await locator.count()) > 0) {
          await locator.screenshot({ path: outputPath });
        } else {
          await page.screenshot({ path: outputPath, fullPage: true });
        }

        result.captured.push(contractItem.id);
      } catch (error: unknown) {
        result.failed.push({
          slotId: contractItem.id,
          reason: error instanceof Error ? error.message : "Unbekannter Fehler"
        });
      } finally {
        await page.close();
      }
    }
  } finally {
    await context.close();
    await browser.close();
  }

  return result;
}

async function main(): Promise<void> {
  const options = parseCliOptions(process.argv.slice(2));
  const validationReport = validateScreenshotContractAndMapping();
  const result = await runCapture(options);

  console.log("Screenshot-Capture abgeschlossen.");
  console.log(
    `Capture-Ready laut Mapping: ${validationReport.configuredCaptureSlots} konfiguriert / ${validationReport.todoCaptureSlots} TODO`
  );
  console.log(`Selected: ${result.selected.length}`);
  console.log(`Captured: ${result.captured.length}`);
  console.log(`TODO: ${result.todo.length}`);
  console.log(`Skipped: ${result.skipped.length}`);
  console.log(`Failed: ${result.failed.length}`);

  if (result.todo.length > 0) {
    console.log("TODO-Slots:");
    for (const slotId of result.todo) {
      console.log(`- ${slotId}`);
    }
  }

  if (result.skipped.length > 0) {
    console.log("Skipped-Slots:");
    for (const item of result.skipped) {
      console.log(`- ${item.slotId}: ${item.reason}`);
    }
  }

  if (result.failed.length > 0) {
    console.error("Fehlgeschlagene Slots:");
    for (const item of result.failed) {
      console.error(`- ${item.slotId}: ${item.reason}`);
    }
    process.exit(1);
  }
}

main().catch((error: unknown) => {
  console.error("Screenshot-Capture fehlgeschlagen.");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
