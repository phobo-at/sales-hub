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
import {
  SCREENSHOT_MANIFEST,
  SCREENSHOT_VIEWPORTS,
  type ScreenshotManifestItem
} from "@/content/screenshot-manifest";
import { MODULE_IDS, type ModuleId } from "@/lib/domain";

const MODULE_IDS_WITH_SCREENS = MODULE_IDS.filter(
  (moduleId): moduleId is Exclude<ModuleId, "task-room"> => moduleId !== "task-room"
);

const ALLOWED_SLOT_IDS = new Set<string>(SCREENSHOT_SLOT_IDS);
const ALLOWED_PURPOSES = new Set<string>(SCREENSHOT_PURPOSES);
const ALLOWED_MODULE_IDS = new Set<string>(MODULE_IDS);
const ALLOWED_VIEWPORTS = new Set<string>(Object.keys(SCREENSHOT_VIEWPORTS));

export interface ScreenshotValidationReport {
  configuredCaptureSlots: number;
  todoCaptureSlots: number;
}

export function validateScreenshotManifest(
  contract: readonly ScreenshotContractItem[] = SCREENSHOT_CONTRACT,
  manifest: readonly ScreenshotManifestItem[] = SCREENSHOT_MANIFEST
): void {
  const seenManifestIds = new Set<string>();
  const contractById = Object.fromEntries(contract.map((item) => [item.id, item])) as Record<
    ScreenshotSlotId,
    ScreenshotContractItem
  >;

  for (const item of manifest) {
    const slotId = item.id as string;
    const moduleId = item.module as string;

    if (!ALLOWED_SLOT_IDS.has(slotId)) {
      throw new Error(`Manifest enthaelt unbekannten Screenshot-Slot: ${slotId}`);
    }

    if (seenManifestIds.has(slotId)) {
      throw new Error(`Manifest enthaelt doppelten Screenshot-Slot: ${slotId}`);
    }
    seenManifestIds.add(slotId);

    if (!ALLOWED_MODULE_IDS.has(moduleId)) {
      throw new Error(`Manifest enthaelt unbekanntes Modul fuer ${slotId}: ${moduleId}`);
    }

    if (moduleId === "task-room") {
      throw new Error("Task Room darf in v1 keinen Screenshot-Slot haben.");
    }

    const contractItem = contractById[item.id];

    if (!contractItem) {
      throw new Error(`Manifest-Slot ${slotId} fehlt im Screenshot-Contract.`);
    }

    if (contractItem.module !== item.module) {
      throw new Error(
        `Manifest-Modul fuer ${slotId} ist ${item.module}; erwartet ist ${contractItem.module}.`
      );
    }

    if (!item.route.startsWith("/")) {
      throw new Error(`Manifest-Route fuer ${slotId} muss mit '/' beginnen.`);
    }

    if (!ALLOWED_VIEWPORTS.has(item.viewport)) {
      throw new Error(`Manifest-Viewport fuer ${slotId} ist ungueltig: ${item.viewport}.`);
    }

    if (item.waitFor.trim().length === 0) {
      throw new Error(`Manifest-waitFor fuer ${slotId} darf nicht leer sein.`);
    }

    if (!item.output.startsWith("/assets/screenshots/")) {
      throw new Error(`Manifest-output fuer ${slotId} ist ungueltig: ${item.output}`);
    }

    if (!contractItem.assetPath) {
      throw new Error(`Contract-Slot ${slotId} hat keinen assetPath und kann nicht capturen.`);
    }

    if (contractItem.assetPath !== item.output) {
      throw new Error(
        `Manifest-output fuer ${slotId} muss exakt dem Contract-assetPath entsprechen (${contractItem.assetPath}).`
      );
    }
  }
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
  mapping: readonly CaptureMappingItem[] = SCREENSHOT_CAPTURE_MAPPING,
  manifest: readonly ScreenshotManifestItem[] = SCREENSHOT_MANIFEST
): ScreenshotValidationReport {
  validateScreenshotContract(contract);
  validateScreenshotManifest(contract, manifest);

  const manifestById = Object.fromEntries(manifest.map((item) => [item.id, item])) as Partial<
    Record<ScreenshotSlotId, ScreenshotManifestItem>
  >;
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
      if (manifestById[captureMapping.slotId]) {
        throw new Error(
          `Capture-Mapping fuer ${slotId} darf kein todo sein, da ein Manifest-Eintrag existiert.`
        );
      }

      todoCaptureSlots += 1;
      continue;
    }

    if (!captureMapping.path || !captureMapping.readySelector) {
      throw new Error(
        `Capture-Mapping fuer ${slotId} braucht path und readySelector oder ein todo.`
      );
    }

    const manifestItem = manifestById[captureMapping.slotId];

    if (!manifestItem) {
      throw new Error(
        `Capture-Mapping fuer ${slotId} ist konfiguriert, aber nicht im Screenshot-Manifest enthalten.`
      );
    }

    if (captureMapping.path !== manifestItem.route) {
      throw new Error(
        `Capture-Mapping fuer ${slotId} hat path=${captureMapping.path}; erwartet ist ${manifestItem.route}.`
      );
    }

    if (captureMapping.readySelector !== manifestItem.waitFor) {
      throw new Error(
        `Capture-Mapping fuer ${slotId} hat readySelector=${captureMapping.readySelector}; erwartet ist ${manifestItem.waitFor}.`
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
