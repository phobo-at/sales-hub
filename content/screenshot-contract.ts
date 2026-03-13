import type { ModuleId } from "@/lib/domain";

export const SCREENSHOT_SLOT_IDS = [
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

export type ScreenshotSlotId = (typeof SCREENSHOT_SLOT_IDS)[number];
export type ScreenshotModuleId = Exclude<ModuleId, "task-room">;

export const SCREENSHOT_PURPOSES = ["hero", "proof", "differentiator"] as const;
export type ScreenshotPurpose = (typeof SCREENSHOT_PURPOSES)[number];

export const SCREENSHOT_STATUSES = ["required", "planned", "missing", "available"] as const;
export type ScreenshotStatus = (typeof SCREENSHOT_STATUSES)[number];

export interface ScreenshotContractItem {
  id: ScreenshotSlotId;
  module: ScreenshotModuleId;
  title: string;
  purpose: ScreenshotPurpose;
  caption: string;
  status: ScreenshotStatus;
  assetPath: string | null;
  sourceNote: string;
}

type ScreenshotContractMetaById = Record<ScreenshotSlotId, Omit<ScreenshotContractItem, "id">>;

const SCREENSHOT_CONTRACT_META_BY_ID = {
  "whistleblowing-inbox": {
    module: "whistleblowing",
    title: "Whistleblowing Inbox",
    purpose: "hero",
    caption: "Zentraler Eingangskanal für eingehende Hinweise.",
    status: "missing",
    assetPath: "/assets/screenshots/whistleblowing-inbox.png",
    sourceNote: "Offizieller v1-Slot. Asset wird über Capture-Pipeline erzeugt."
  },
  "whistleblowing-case-detail-ai": {
    module: "whistleblowing",
    title: "Whistleblowing Case Detail mit KI",
    purpose: "proof",
    caption: "Strukturierte Fallansicht mit KI-unterstützter Aufbereitung.",
    status: "missing",
    assetPath: "/assets/screenshots/whistleblowing-case-detail-ai.png",
    sourceNote: "Offizieller v1-Slot. Asset wird über Capture-Pipeline erzeugt."
  },
  "whistleblowing-summary-ai": {
    module: "whistleblowing",
    title: "Whistleblowing Zusammenfassung mit KI",
    purpose: "differentiator",
    caption: "KI-generierte Zusammenfassungen beschleunigen die Fallarbeit.",
    status: "missing",
    assetPath: "/assets/screenshots/whistleblowing-summary-ai.png",
    sourceNote: "Offizieller v1-Slot. Asset wird über Capture-Pipeline erzeugt."
  },
  "risk-overview-visualization": {
    module: "risk",
    title: "Risk Overview Visualisierung",
    purpose: "hero",
    caption: "Risikofelder werden auf einen Blick priorisierbar visualisiert.",
    status: "missing",
    assetPath: "/assets/screenshots/risk-overview-visualization.png",
    sourceNote: "Offizieller v1-Slot. Asset wird über Capture-Pipeline erzeugt."
  },
  "risk-register-measures": {
    module: "risk",
    title: "Risk Register und Maßnahmen",
    purpose: "proof",
    caption: "Maßnahmen können direkt aus dem Register abgeleitet und verfolgt werden.",
    status: "missing",
    assetPath: "/assets/screenshots/risk-register-measures.png",
    sourceNote: "Offizieller v1-Slot. Asset wird über Capture-Pipeline erzeugt."
  },
  "risk-assessment-questionnaire": {
    module: "risk",
    title: "Risk Assessment Fragebogen",
    purpose: "proof",
    caption: "Standardisierte Bewertungen sichern Vergleichbarkeit und Nachvollziehbarkeit.",
    status: "missing",
    assetPath: "/assets/screenshots/risk-assessment-questionnaire.png",
    sourceNote: "Offizieller v1-Slot. Asset wird über Capture-Pipeline erzeugt."
  },
  "integrity-check-home-categories": {
    module: "integrity-check",
    title: "Integrity Check Kategorien",
    purpose: "hero",
    caption: "Klar strukturierter Einstieg für Integritätsprüfungen.",
    status: "missing",
    assetPath: "/assets/screenshots/integrity-check-home-categories.png",
    sourceNote: "Offizieller v1-Slot. Asset wird über Capture-Pipeline erzeugt."
  },
  "integrity-check-request-form": {
    module: "integrity-check",
    title: "Integrity Check Anfrageformular",
    purpose: "proof",
    caption: "Anfragen werden standardisiert erfasst und direkt in den Prozess überführt.",
    status: "missing",
    assetPath: "/assets/screenshots/integrity-check-request-form.png",
    sourceNote: "Offizieller v1-Slot. Asset wird über Capture-Pipeline erzeugt."
  },
  "integrity-check-questionnaire": {
    module: "integrity-check",
    title: "Integrity Check Fragebogen",
    purpose: "proof",
    caption: "Regelbasierte Prüfungen sichern konsistente Entscheidungen.",
    status: "missing",
    assetPath: "/assets/screenshots/integrity-check-questionnaire.png",
    sourceNote: "Offizieller v1-Slot. Asset wird über Capture-Pipeline erzeugt."
  },
  "policy-navigator-overview": {
    module: "policy-navigator",
    title: "Policy Navigator Overview",
    purpose: "hero",
    caption: "Richtlinien werden zentral bereitgestellt und leicht auffindbar gemacht.",
    status: "missing",
    assetPath: "/assets/screenshots/policy-navigator-overview.png",
    sourceNote: "Offizieller v1-Slot. Asset wird über Capture-Pipeline erzeugt."
  },
  "policy-navigator-olex-qa": {
    module: "policy-navigator",
    title: "Policy Navigator .LOUPE Olex Q&A",
    purpose: "differentiator",
    caption: ".LOUPE Olex erleichtert mit kontextbezogenen Antworten das Verstehen komplexer Richtlinien.",
    status: "missing",
    assetPath: "/assets/screenshots/policy-navigator-olex-qa.png",
    sourceNote: "Offizieller v1-Slot. Asset wird über Capture-Pipeline erzeugt."
  },
  "policy-navigator-read-confirmation": {
    module: "policy-navigator",
    title: "Policy Navigator Lesebestätigung",
    purpose: "proof",
    caption: "Bestätigungen sind revisionssicher dokumentiert.",
    status: "missing",
    assetPath: "/assets/screenshots/policy-navigator-read-confirmation.png",
    sourceNote: "Offizieller v1-Slot. Asset wird über Capture-Pipeline erzeugt."
  },
  "dawn-raids-alert-portal": {
    module: "dawn-raids",
    title: "Dawn Raids Alarmportal",
    purpose: "hero",
    caption: "Im Ernstfall kann sofort eine zentrale Alarmkette ausgelöst werden.",
    status: "missing",
    assetPath: "/assets/screenshots/dawn-raids-alert-portal.png",
    sourceNote: "Offizieller v1-Slot. Asset wird über Capture-Pipeline erzeugt."
  },
  "dawn-raids-incident-documentation": {
    module: "dawn-raids",
    title: "Dawn Raids Einsatzdokumentation",
    purpose: "proof",
    caption: "Maßnahmen und Ereignisse werden strukturiert und zentral dokumentiert.",
    status: "missing",
    assetPath: "/assets/screenshots/dawn-raids-incident-documentation.png",
    sourceNote: "Offizieller v1-Slot. Asset wird über Capture-Pipeline erzeugt."
  },
  "business-partner-overview-risk": {
    module: "business-partner",
    title: "Business Partner Risiko-Overview",
    purpose: "hero",
    caption: "Lieferketten- und Partner-Risiken sind zentral priorisierbar.",
    status: "missing",
    assetPath: "/assets/screenshots/business-partner-overview-risk.png",
    sourceNote: "Offizieller v1-Slot. Asset wird über Capture-Pipeline erzeugt."
  },
  "business-partner-profile-detail": {
    module: "business-partner",
    title: "Business Partner Profil-Detail",
    purpose: "proof",
    caption: "Detailprofile bündeln relevante Risiko- und Kontextinformationen.",
    status: "missing",
    assetPath: "/assets/screenshots/business-partner-profile-detail.png",
    sourceNote: "Offizieller v1-Slot. Asset wird über Capture-Pipeline erzeugt."
  },
  "business-partner-questionnaire": {
    module: "business-partner",
    title: "Business Partner Assessment",
    purpose: "proof",
    caption: "Assessments schaffen Vergleichbarkeit und belastbare Entscheidungsgrundlagen.",
    status: "missing",
    assetPath: "/assets/screenshots/business-partner-questionnaire.png",
    sourceNote: "Offizieller v1-Slot. Asset wird über Capture-Pipeline erzeugt."
  }
} as const satisfies ScreenshotContractMetaById;

export const SCREENSHOT_CONTRACT: readonly ScreenshotContractItem[] = SCREENSHOT_SLOT_IDS.map((id) => ({
  id,
  ...SCREENSHOT_CONTRACT_META_BY_ID[id]
}));

export const REQUIRED_PURPOSE_BY_SLOT: Record<ScreenshotSlotId, ScreenshotPurpose> =
  Object.fromEntries(
    SCREENSHOT_SLOT_IDS.map((id) => [id, SCREENSHOT_CONTRACT_META_BY_ID[id].purpose])
  ) as Record<ScreenshotSlotId, ScreenshotPurpose>;

export const SCREENSHOT_CONTRACT_BY_ID: Record<ScreenshotSlotId, ScreenshotContractItem> =
  Object.fromEntries(SCREENSHOT_CONTRACT.map((item) => [item.id, item])) as Record<
    ScreenshotSlotId,
    ScreenshotContractItem
  >;
