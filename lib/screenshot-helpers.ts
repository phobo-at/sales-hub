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

export function getScreenshotsForModule(module: Exclude<ModuleId, "task-room">): ScreenshotContractItem[] {
  return SCREENSHOT_CONTRACT.filter((item) => item.module === module);
}

export async function hasScreenshotAsset(assetPath: string): Promise<boolean> {
  if (!assetPath.startsWith("/")) {
    return false;
  }

  const absolute = path.join(process.cwd(), "public", assetPath.slice(1));

  try {
    await fs.access(absolute);
    return true;
  } catch {
    return false;
  }
}
