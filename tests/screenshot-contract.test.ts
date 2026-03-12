import {
  REQUIRED_PURPOSE_BY_SLOT,
  SCREENSHOT_CONTRACT,
  SCREENSHOT_SLOT_IDS,
  type ScreenshotContractItem
} from "@/content/screenshot-contract";
import {
  SCREENSHOT_CAPTURE_MAPPING,
  type CaptureMappingItem
} from "@/content/screenshot-capture-mapping";
import {
  validateScreenshotContract,
  validateScreenshotContractAndMapping
} from "@/lib/screenshot-validation";

function cloneContract(): ScreenshotContractItem[] {
  return SCREENSHOT_CONTRACT.map((item) => ({ ...item }));
}

function cloneMapping(): CaptureMappingItem[] {
  return SCREENSHOT_CAPTURE_MAPPING.map((item) => ({ ...item }));
}

describe("screenshot contract", () => {
  it("contains exactly the allowed slot IDs", () => {
    const ids = SCREENSHOT_CONTRACT.map((item) => item.id);
    expect(SCREENSHOT_SLOT_IDS).toHaveLength(17);
    expect(ids).toEqual(SCREENSHOT_SLOT_IDS);
    expect(new Set(ids).size).toBe(17);
  });

  it("uses the required purpose mapping", () => {
    for (const item of SCREENSHOT_CONTRACT) {
      expect(item.purpose).toBe(REQUIRED_PURPOSE_BY_SLOT[item.id]);
    }
  });

  it("validates canonical contract and mapping consistency", () => {
    const report = validateScreenshotContractAndMapping();
    expect(report.todoCaptureSlots).toBe(17);
    expect(report.configuredCaptureSlots).toBe(0);
  });

  it("accepts null assetPath values", () => {
    const validWithNullAssetPath = cloneContract();
    validWithNullAssetPath[0] = { ...validWithNullAssetPath[0], assetPath: null };

    expect(() => validateScreenshotContract(validWithNullAssetPath)).not.toThrow();
  });

  it("fails on duplicate contract IDs", () => {
    const invalid = cloneContract();
    invalid[1] = { ...invalid[1], id: invalid[0].id };

    expect(() => validateScreenshotContract(invalid)).toThrow(/Doppelter Screenshot-Slot/);
  });

  it("fails on unknown module", () => {
    const invalid = cloneContract();
    invalid[0] = {
      ...invalid[0],
      module: "unknown-module" as unknown as ScreenshotContractItem["module"]
    };

    expect(() => validateScreenshotContract(invalid)).toThrow(/Unbekanntes Modul/);
  });

  it("fails on unknown purpose", () => {
    const invalid = cloneContract();
    invalid[0] = {
      ...invalid[0],
      purpose: "unknown-purpose" as unknown as ScreenshotContractItem["purpose"]
    };

    expect(() => validateScreenshotContract(invalid)).toThrow(/Unbekannter Screenshot-Purpose/);
  });

  it("fails when task-room gets a screenshot", () => {
    const invalid = cloneContract();
    invalid[0] = { ...invalid[0], module: "task-room" as unknown as ScreenshotContractItem["module"] };

    expect(() => validateScreenshotContract(invalid)).toThrow(/Task Room darf in v1 keinen Screenshot-Slot haben/);
  });

  it("fails when a whitelist slot is missing", () => {
    const invalid = cloneContract().slice(1);

    expect(() => validateScreenshotContract(invalid)).toThrow(/muss exakt 17 Eintraege haben/);
  });

  it("fails when an extra non-whitelisted slot appears", () => {
    const invalid = cloneContract();
    invalid[0] = { ...invalid[0], id: "extra-slot" as unknown as ScreenshotContractItem["id"] };

    expect(() => validateScreenshotContract(invalid)).toThrow(/Unbekannter Screenshot-Slot/);
  });

  it("fails when a module does not have exactly one hero slot", () => {
    const invalid = cloneContract();
    const riskHeroIndex = invalid.findIndex((item) => item.id === "risk-overview-visualization");
    const whistleProofIndex = invalid.findIndex((item) => item.id === "whistleblowing-case-detail-ai");

    invalid[riskHeroIndex] = { ...invalid[riskHeroIndex], module: "whistleblowing" };
    invalid[whistleProofIndex] = { ...invalid[whistleProofIndex], module: "risk" };

    expect(() => validateScreenshotContract(invalid)).toThrow(/genau einen Hero-Slot/);
  });

  it("fails on unknown capture-mapping slots", () => {
    const invalidMapping = cloneMapping();
    invalidMapping[0] = {
      ...invalidMapping[0],
      slotId: "unknown-slot" as unknown as CaptureMappingItem["slotId"]
    };

    expect(() => validateScreenshotContractAndMapping(SCREENSHOT_CONTRACT, invalidMapping)).toThrow(
      /unbekannten Slot/
    );
  });

  it("fails on duplicate capture-mapping slots", () => {
    const invalidMapping = cloneMapping();
    invalidMapping[1] = { ...invalidMapping[1], slotId: invalidMapping[0].slotId };

    expect(() => validateScreenshotContractAndMapping(SCREENSHOT_CONTRACT, invalidMapping)).toThrow(
      /Doppeltes Capture-Mapping/
    );
  });
});
