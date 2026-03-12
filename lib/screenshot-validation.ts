import {
  REQUIRED_PURPOSE_BY_SLOT,
  SCREENSHOT_CONTRACT,
  SCREENSHOT_PURPOSES,
  SCREENSHOT_SLOT_IDS,
  type ScreenshotContractItem,
  type ScreenshotSlotId
} from "@/content/screenshot-contract";
import {
  SCREENSHOT_CAPTURE_MAPPING,
  type CaptureMappingItem
} from "@/content/screenshot-capture-mapping";
import { MODULE_IDS, type ModuleId } from "@/lib/domain";

const MODULE_IDS_WITH_SCREENS = MODULE_IDS.filter(
  (moduleId): moduleId is Exclude<ModuleId, "task-room"> => moduleId !== "task-room"
);

const ALLOWED_SLOT_IDS = new Set<string>(SCREENSHOT_SLOT_IDS);
const ALLOWED_PURPOSES = new Set<string>(SCREENSHOT_PURPOSES);
const ALLOWED_MODULE_IDS = new Set<string>(MODULE_IDS);

export interface ScreenshotValidationReport {
  configuredCaptureSlots: number;
  todoCaptureSlots: number;
}

export function validateScreenshotContract(
  contract: readonly ScreenshotContractItem[] = SCREENSHOT_CONTRACT
): void {
  if (contract.length !== SCREENSHOT_SLOT_IDS.length) {
    throw new Error(`Screenshot-Contract muss exakt ${SCREENSHOT_SLOT_IDS.length} Eintraege haben.`);
  }

  const seenContract = new Set<string>();

  for (const item of contract) {
    const slotId = item.id as string;

    if (!ALLOWED_SLOT_IDS.has(slotId)) {
      throw new Error(`Unbekannter Screenshot-Slot im Contract: ${slotId}`);
    }

    if (seenContract.has(slotId)) {
      throw new Error(`Doppelter Screenshot-Slot im Contract: ${slotId}`);
    }
    seenContract.add(slotId);

    const moduleId = item.module as string;

    if (!ALLOWED_MODULE_IDS.has(moduleId)) {
      throw new Error(`Unbekanntes Modul im Screenshot-Contract: ${moduleId}`);
    }

    if (moduleId === "task-room") {
      throw new Error("Task Room darf in v1 keinen Screenshot-Slot haben.");
    }

    const purpose = item.purpose as string;

    if (!ALLOWED_PURPOSES.has(purpose)) {
      throw new Error(`Unbekannter Screenshot-Purpose fuer Slot ${slotId}: ${purpose}`);
    }

    if (item.purpose !== REQUIRED_PURPOSE_BY_SLOT[item.id]) {
      throw new Error(
        `Slot ${slotId} hat purpose=${item.purpose}; erwartet ist ${REQUIRED_PURPOSE_BY_SLOT[item.id]}.`
      );
    }

    if (item.assetPath !== null && typeof item.assetPath !== "string") {
      throw new Error(`Slot ${slotId} hat ungueltigen assetPath-Typ.`);
    }

    if (typeof item.assetPath === "string" && !item.assetPath.startsWith("/assets/screenshots/")) {
      throw new Error(`Slot ${slotId} hat ungueltigen assetPath: ${item.assetPath}`);
    }
  }

  for (const slotId of SCREENSHOT_SLOT_IDS) {
    if (!seenContract.has(slotId)) {
      throw new Error(`Screenshot-Slot fehlt im Contract: ${slotId}`);
    }
  }

  for (const moduleId of MODULE_IDS_WITH_SCREENS) {
    const screenshotsForModule = contract.filter((item) => item.module === moduleId);

    if (screenshotsForModule.length === 0) {
      throw new Error(`Modul ${moduleId} muss mindestens einen Screenshot-Slot haben.`);
    }

    const heroCount = screenshotsForModule.filter((item) => item.purpose === "hero").length;

    if (heroCount !== 1) {
      throw new Error(`Modul ${moduleId} muss genau einen Hero-Slot haben (gefunden: ${heroCount}).`);
    }
  }
}

export function validateScreenshotContractAndMapping(
  contract: readonly ScreenshotContractItem[] = SCREENSHOT_CONTRACT,
  mapping: readonly CaptureMappingItem[] = SCREENSHOT_CAPTURE_MAPPING
): ScreenshotValidationReport {
  validateScreenshotContract(contract);

  const seenMappings = new Set<string>();
  let configuredCaptureSlots = 0;
  let todoCaptureSlots = 0;

  for (const captureMapping of mapping) {
    const slotId = captureMapping.slotId as string;

    if (!ALLOWED_SLOT_IDS.has(slotId)) {
      throw new Error(`Capture-Mapping enthaelt unbekannten Slot: ${slotId}`);
    }

    if (seenMappings.has(slotId)) {
      throw new Error(`Doppeltes Capture-Mapping fuer Slot: ${slotId}`);
    }

    seenMappings.add(slotId);

    if (captureMapping.todo) {
      todoCaptureSlots += 1;
      continue;
    }

    if (!captureMapping.path || !captureMapping.readySelector) {
      throw new Error(
        `Capture-Mapping fuer ${slotId} braucht path und readySelector oder ein todo.`
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
