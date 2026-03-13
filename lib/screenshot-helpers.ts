import fs from "node:fs/promises";
import path from "node:path";
import {
  SCREENSHOT_CONTRACT,
  SCREENSHOT_CONTRACT_BY_ID,
  type ScreenshotContractItem,
  type ScreenshotSlotId
} from "@/content/screenshot-contract";
import type { ModuleId } from "@/lib/domain";

export function getScreenshotById(id: ScreenshotSlotId): ScreenshotContractItem {
  return SCREENSHOT_CONTRACT_BY_ID[id];
}

export function getScreenshotsByIds(ids: ScreenshotSlotId[]): ScreenshotContractItem[] {
  return ids.map((id) => getScreenshotById(id));
}

export function getScreenshotsByModule(module: ModuleId): ScreenshotContractItem[] {
  if (module === "task-room") {
    return [];
  }

  return SCREENSHOT_CONTRACT.filter((item) => item.module === module);
}

export function getHeroScreenshot(module: ModuleId): ScreenshotContractItem | null {
  return getScreenshotsByModule(module).find((item) => item.purpose === "hero") ?? null;
}

export function getProofScreenshots(module: ModuleId): ScreenshotContractItem[] {
  return getScreenshotsByModule(module).filter((item) => item.purpose === "proof");
}

export function getDifferentiatorScreenshot(module: ModuleId): ScreenshotContractItem | null {
  return getScreenshotsByModule(module).find((item) => item.purpose === "differentiator") ?? null;
}

export async function hasScreenshotAssets(
  assetPaths: (string | null | undefined)[]
): Promise<boolean[]> {
  return Promise.all(assetPaths.map(hasScreenshotAsset));
}

export async function hasScreenshotAsset(assetPath: string | null | undefined): Promise<boolean> {
  if (typeof assetPath !== "string") {
    return false;
  }

  const normalizedPath = assetPath.trim();

  if (!normalizedPath.startsWith("/")) {
    return false;
  }

  const absolute = path.join(process.cwd(), "public", normalizedPath.slice(1));

  try {
    await fs.access(absolute);
    return true;
  } catch {
    return false;
  }
}
