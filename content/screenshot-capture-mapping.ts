import type { ScreenshotSlotId } from "@/content/screenshot-contract";

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

export const SCREENSHOT_CAPTURE_MAPPING: readonly CaptureMappingItem[] = [
  { slotId: "whistleblowing-inbox", todo: TODO_NOTE },
  { slotId: "whistleblowing-case-detail-ai", todo: TODO_NOTE },
  { slotId: "whistleblowing-summary-ai", todo: TODO_NOTE },
  { slotId: "risk-overview-visualization", todo: TODO_NOTE },
  { slotId: "risk-register-measures", todo: TODO_NOTE },
  { slotId: "risk-assessment-questionnaire", todo: TODO_NOTE },
  { slotId: "integrity-check-home-categories", todo: TODO_NOTE },
  { slotId: "integrity-check-request-form", todo: TODO_NOTE },
  { slotId: "integrity-check-questionnaire", todo: TODO_NOTE },
  { slotId: "policy-navigator-overview", todo: TODO_NOTE },
  { slotId: "policy-navigator-olex-qa", todo: TODO_NOTE },
  { slotId: "policy-navigator-read-confirmation", todo: TODO_NOTE },
  { slotId: "dawn-raids-alert-portal", todo: TODO_NOTE },
  { slotId: "dawn-raids-incident-documentation", todo: TODO_NOTE },
  { slotId: "business-partner-overview-risk", todo: TODO_NOTE },
  { slotId: "business-partner-profile-detail", todo: TODO_NOTE },
  { slotId: "business-partner-questionnaire", todo: TODO_NOTE }
] as const;
