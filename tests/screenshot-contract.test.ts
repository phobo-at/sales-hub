import {
  REQUIRED_PURPOSE_BY_SLOT,
  SCREENSHOT_CONTRACT,
  SCREENSHOT_SLOT_IDS
} from "@/content/screenshot-contract";
import { validateScreenshotContractAndMapping } from "@/lib/screenshot-validation";

const expectedSlotIds = [
  "whistleblowing-inbox",
  "whistleblowing-case-detail-ai",
  "whistleblowing-summary-ai",
  "risk-overview-visualization",
  "risk-register-measures",
  "risk-assessment-questionnaire",
  "integrity-check-home-categories",
  "integrity-check-request-form",
  "integrity-check-questionnaire",
  "policy-navigator-overview",
  "policy-navigator-olex-qa",
  "policy-navigator-read-confirmation",
  "dawn-raids-alert-portal",
  "dawn-raids-incident-documentation",
  "business-partner-overview-risk",
  "business-partner-profile-detail",
  "business-partner-questionnaire"
] as const;

describe("screenshot contract", () => {
  it("contains exactly the 17 allowed slot IDs", () => {
    expect(SCREENSHOT_SLOT_IDS).toEqual(expectedSlotIds);
    expect(SCREENSHOT_CONTRACT).toHaveLength(17);

    const ids = SCREENSHOT_CONTRACT.map((item) => item.id);
    expect(new Set(ids).size).toBe(17);
    expect(ids.sort()).toEqual([...expectedSlotIds].sort());
  });

  it("uses the required purpose mapping", () => {
    for (const item of SCREENSHOT_CONTRACT) {
      expect(item.purpose).toBe(REQUIRED_PURPOSE_BY_SLOT[item.id]);
    }
  });

  it("does not contain task-room screenshot entries", () => {
    expect(SCREENSHOT_CONTRACT.some((item) => item.module === "task-room")).toBe(false);
  });

  it("validates contract and capture mapping consistency", () => {
    const report = validateScreenshotContractAndMapping();
    expect(report.todoCaptureSlots).toBe(17);
    expect(report.configuredCaptureSlots).toBe(0);
  });
});
