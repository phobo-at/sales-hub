import {
  REQUIRED_PURPOSE_BY_SLOT,
  SCREENSHOT_CONTRACT,
  SCREENSHOT_SLOT_IDS,
  type ScreenshotSlotId
} from "@/content/screenshot-contract";
import { SCREENSHOT_CAPTURE_MAPPING } from "@/content/screenshot-capture-mapping";

export interface ScreenshotValidationReport {
  configuredCaptureSlots: number;
  todoCaptureSlots: number;
}

export function validateScreenshotContractAndMapping(): ScreenshotValidationReport {
  if (SCREENSHOT_CONTRACT.length !== SCREENSHOT_SLOT_IDS.length) {
    throw new Error(
      `Screenshot-Contract muss exakt ${SCREENSHOT_SLOT_IDS.length} Eintraege haben.`
    );
  }

  const seenContract = new Set<ScreenshotSlotId>();

  for (const item of SCREENSHOT_CONTRACT) {
    if (seenContract.has(item.id)) {
      throw new Error(`Doppelter Screenshot-Slot im Contract: ${item.id}`);
    }
    seenContract.add(item.id);

    if (item.purpose !== REQUIRED_PURPOSE_BY_SLOT[item.id]) {
      throw new Error(
        `Slot ${item.id} hat purpose=${item.purpose}; erwartet ist ${REQUIRED_PURPOSE_BY_SLOT[item.id]}.`
      );
    }

    if (!item.assetPath.startsWith("/assets/screenshots/")) {
      throw new Error(`Slot ${item.id} hat ungueltigen assetPath: ${item.assetPath}`);
    }

  }

  for (const slotId of SCREENSHOT_SLOT_IDS) {
    if (!seenContract.has(slotId)) {
      throw new Error(`Screenshot-Slot fehlt im Contract: ${slotId}`);
    }
  }

  const seenMappings = new Set<ScreenshotSlotId>();
  let configuredCaptureSlots = 0;
  let todoCaptureSlots = 0;

  for (const mapping of SCREENSHOT_CAPTURE_MAPPING) {
    if (seenMappings.has(mapping.slotId)) {
      throw new Error(`Doppeltes Capture-Mapping fuer Slot: ${mapping.slotId}`);
    }
    seenMappings.add(mapping.slotId);

    const isTodo = Boolean(mapping.todo);
    if (isTodo) {
      todoCaptureSlots += 1;
      continue;
    }

    if (!mapping.path || !mapping.readySelector) {
      throw new Error(
        `Capture-Mapping fuer ${mapping.slotId} braucht path und readySelector oder ein todo.`
      );
    }

    configuredCaptureSlots += 1;
  }

  for (const slotId of SCREENSHOT_SLOT_IDS) {
    if (!seenMappings.has(slotId)) {
      throw new Error(`Capture-Mapping fehlt fuer Slot: ${slotId}`);
    }
  }

  return {
    configuredCaptureSlots,
    todoCaptureSlots
  };
}
