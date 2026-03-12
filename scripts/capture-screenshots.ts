import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import { SCREENSHOT_CAPTURE_MAPPING } from "@/content/screenshot-capture-mapping";
import { SCREENSHOT_CONTRACT_BY_ID } from "@/content/screenshot-contract";
import { getCaptureBaseUrl, getCaptureStorageStatePath } from "@/lib/env";
import { validateScreenshotContractAndMapping } from "@/lib/screenshot-validation";

interface CaptureResult {
  captured: string[];
  todo: string[];
  failed: Array<{ slotId: string; reason: string }>;
  skipped: string[];
}

async function ensureStorageStateExists(filePath: string): Promise<void> {
  try {
    await fs.access(filePath);
  } catch {
    throw new Error(`Playwright storageState nicht gefunden: ${filePath}`);
  }
}

async function runCapture(): Promise<CaptureResult> {
  const validation = validateScreenshotContractAndMapping();
  const result: CaptureResult = {
    captured: [],
    todo: [],
    failed: [],
    skipped: []
  };

  if (validation.configuredCaptureSlots === 0) {
    for (const mapping of SCREENSHOT_CAPTURE_MAPPING) {
      result.todo.push(mapping.slotId);
    }

    return result;
  }

  const baseUrl = getCaptureBaseUrl();
  const storageStatePath = getCaptureStorageStatePath();
  await ensureStorageStateExists(storageStatePath);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    baseURL: baseUrl,
    storageState: storageStatePath,
    viewport: { width: 1600, height: 900 }
  });
  const page = await context.newPage();

  try {
    for (const mapping of SCREENSHOT_CAPTURE_MAPPING) {
      const contractItem = SCREENSHOT_CONTRACT_BY_ID[mapping.slotId];

      if (mapping.todo) {
        result.todo.push(mapping.slotId);
        continue;
      }

      if (!mapping.path || !mapping.readySelector) {
        result.skipped.push(mapping.slotId);
        continue;
      }

      const outputPath = path.join(process.cwd(), "public", contractItem.assetPath.slice(1));
      await fs.mkdir(path.dirname(outputPath), { recursive: true });

      try {
        await page.goto(new URL(mapping.path, baseUrl).toString(), {
          waitUntil: "networkidle",
          timeout: 30_000
        });
        await page.waitForSelector(mapping.readySelector, { timeout: 20_000 });

        if (mapping.waitMs) {
          await page.waitForTimeout(mapping.waitMs);
        }

        if (mapping.clipSelector) {
          const locator = page.locator(mapping.clipSelector).first();
          await locator.screenshot({ path: outputPath });
        } else {
          await page.screenshot({ path: outputPath, fullPage: true });
        }

        result.captured.push(mapping.slotId);
      } catch (error: unknown) {
        result.failed.push({
          slotId: mapping.slotId,
          reason: error instanceof Error ? error.message : "Unbekannter Fehler"
        });
      }
    }
  } finally {
    await context.close();
    await browser.close();
  }

  return result;
}

runCapture()
  .then((result) => {
    console.log("Screenshot-Capture abgeschlossen.");
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

    if (result.failed.length > 0) {
      console.error("Fehlgeschlagene Slots:");
      for (const item of result.failed) {
        console.error(`- ${item.slotId}: ${item.reason}`);
      }
      process.exit(1);
    }
  })
  .catch((error: unknown) => {
    console.error("Screenshot-Capture fehlgeschlagen.");
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
