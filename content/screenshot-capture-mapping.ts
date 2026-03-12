import { SCREENSHOT_CONTRACT, type ScreenshotSlotId } from "@/content/screenshot-contract";

export interface CaptureMappingItem {
  slotId: ScreenshotSlotId;
  path?: string;
  readySelector?: string;
  clipSelector?: string;
  waitMs?: number;
  todo?: string;
}

const TODO_NOTE =
  "Produkt-Route und stabiler Selector muessen mit der .LOUPE-Produktoberflaeche verbunden werden.";

export const SCREENSHOT_CAPTURE_MAPPING: readonly CaptureMappingItem[] = SCREENSHOT_CONTRACT.map(
  (item) => ({
    slotId: item.id,
    todo: TODO_NOTE
  })
);
