import { SCREENSHOT_CONTRACT, type ScreenshotSlotId } from "@/content/screenshot-contract";
import { SCREENSHOT_MANIFEST_BY_ID } from "@/content/screenshot-manifest";

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

const CANVAS_SELECTOR = '[data-testid="screen-canvas"]';

export const SCREENSHOT_CAPTURE_MAPPING: readonly CaptureMappingItem[] = SCREENSHOT_CONTRACT.map(
  (item) => {
    const manifestItem = SCREENSHOT_MANIFEST_BY_ID[item.id];

    if (!manifestItem) {
      return {
        slotId: item.id,
        todo: TODO_NOTE
      };
    }

    return {
      slotId: item.id,
      path: manifestItem.route,
      readySelector: manifestItem.waitFor,
      clipSelector: CANVAS_SELECTOR
    };
  }
);
