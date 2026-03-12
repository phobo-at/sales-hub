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
export type ScreenshotPurpose = "hero" | "proof" | "differentiator";
export type ScreenshotStatus = "required" | "planned" | "missing" | "available";

export interface ScreenshotContractItem {
  id: ScreenshotSlotId;
  module: Exclude<ModuleId, "task-room">;
  title: string;
  purpose: ScreenshotPurpose;
  caption: string;
  status: ScreenshotStatus;
  assetPath: string;
  sourceNote: string;
}

export const REQUIRED_PURPOSE_BY_SLOT: Record<ScreenshotSlotId, ScreenshotPurpose> = {
  "whistleblowing-inbox": "hero",
  "whistleblowing-case-detail-ai": "proof",
  "whistleblowing-summary-ai": "differentiator",
  "risk-overview-visualization": "hero",
  "risk-register-measures": "proof",
  "risk-assessment-questionnaire": "proof",
  "integrity-check-home-categories": "hero",
  "integrity-check-request-form": "proof",
  "integrity-check-questionnaire": "proof",
  "policy-navigator-overview": "hero",
  "policy-navigator-olex-qa": "differentiator",
  "policy-navigator-read-confirmation": "proof",
  "dawn-raids-alert-portal": "hero",
  "dawn-raids-incident-documentation": "proof",
  "business-partner-overview-risk": "hero",
  "business-partner-profile-detail": "proof",
  "business-partner-questionnaire": "proof"
};

export const SCREENSHOT_CONTRACT: readonly ScreenshotContractItem[] = [
  {
    id: "whistleblowing-inbox",
    module: "whistleblowing",
    title: "Whistleblowing Inbox",
    purpose: "hero",
    caption: "Zentraler Eingangskanal fuer eingehende Hinweise.",
    status: "missing",
    assetPath: "/assets/screenshots/whistleblowing-inbox.png",
    sourceNote: "Offizieller v1-Slot. Asset wird ueber Capture-Pipeline erzeugt."
  },
  {
    id: "whistleblowing-case-detail-ai",
    module: "whistleblowing",
    title: "Whistleblowing Case Detail mit KI",
    purpose: "proof",
    caption: "Strukturierte Fallansicht mit KI-unterstuetzter Aufbereitung.",
    status: "missing",
    assetPath: "/assets/screenshots/whistleblowing-case-detail-ai.png",
    sourceNote: "Offizieller v1-Slot. Asset wird ueber Capture-Pipeline erzeugt."
  },
  {
    id: "whistleblowing-summary-ai",
    module: "whistleblowing",
    title: "Whistleblowing Zusammenfassung mit KI",
    purpose: "differentiator",
    caption: "KI-generierte Zusammenfassungen beschleunigen die Fallarbeit.",
    status: "missing",
    assetPath: "/assets/screenshots/whistleblowing-summary-ai.png",
    sourceNote: "Offizieller v1-Slot. Asset wird ueber Capture-Pipeline erzeugt."
  },
  {
    id: "risk-overview-visualization",
    module: "risk",
    title: "Risk Overview Visualisierung",
    purpose: "hero",
    caption: "Risikofelder werden auf einen Blick priorisierbar visualisiert.",
    status: "missing",
    assetPath: "/assets/screenshots/risk-overview-visualization.png",
    sourceNote: "Offizieller v1-Slot. Asset wird ueber Capture-Pipeline erzeugt."
  },
  {
    id: "risk-register-measures",
    module: "risk",
    title: "Risk Register und Massnahmen",
    purpose: "proof",
    caption: "Massnahmen koennen direkt aus dem Register abgeleitet und verfolgt werden.",
    status: "missing",
    assetPath: "/assets/screenshots/risk-register-measures.png",
    sourceNote: "Offizieller v1-Slot. Asset wird ueber Capture-Pipeline erzeugt."
  },
  {
    id: "risk-assessment-questionnaire",
    module: "risk",
    title: "Risk Assessment Fragebogen",
    purpose: "proof",
    caption: "Standardisierte Bewertungen sichern Vergleichbarkeit und Nachvollziehbarkeit.",
    status: "missing",
    assetPath: "/assets/screenshots/risk-assessment-questionnaire.png",
    sourceNote: "Offizieller v1-Slot. Asset wird ueber Capture-Pipeline erzeugt."
  },
  {
    id: "integrity-check-home-categories",
    module: "integrity-check",
    title: "Integrity Check Kategorien",
    purpose: "hero",
    caption: "Klar strukturierter Einstieg fuer Integritaetspruefungen.",
    status: "missing",
    assetPath: "/assets/screenshots/integrity-check-home-categories.png",
    sourceNote: "Offizieller v1-Slot. Asset wird ueber Capture-Pipeline erzeugt."
  },
  {
    id: "integrity-check-request-form",
    module: "integrity-check",
    title: "Integrity Check Anfrageformular",
    purpose: "proof",
    caption: "Anfragen werden standardisiert erfasst und direkt in den Prozess ueberfuehrt.",
    status: "missing",
    assetPath: "/assets/screenshots/integrity-check-request-form.png",
    sourceNote: "Offizieller v1-Slot. Asset wird ueber Capture-Pipeline erzeugt."
  },
  {
    id: "integrity-check-questionnaire",
    module: "integrity-check",
    title: "Integrity Check Fragebogen",
    purpose: "proof",
    caption: "Regelbasierte Pruefungen sichern konsistente Entscheidungen.",
    status: "missing",
    assetPath: "/assets/screenshots/integrity-check-questionnaire.png",
    sourceNote: "Offizieller v1-Slot. Asset wird ueber Capture-Pipeline erzeugt."
  },
  {
    id: "policy-navigator-overview",
    module: "policy-navigator",
    title: "Policy Navigator Overview",
    purpose: "hero",
    caption: "Richtlinien werden zentral bereitgestellt und leicht auffindbar gemacht.",
    status: "missing",
    assetPath: "/assets/screenshots/policy-navigator-overview.png",
    sourceNote: "Offizieller v1-Slot. Asset wird ueber Capture-Pipeline erzeugt."
  },
  {
    id: "policy-navigator-olex-qa",
    module: "policy-navigator",
    title: "Policy Navigator OLEX Q&A",
    purpose: "differentiator",
    caption: "Kontextbezogene Antworten erleichtern das Verstehen komplexer Richtlinien.",
    status: "missing",
    assetPath: "/assets/screenshots/policy-navigator-olex-qa.png",
    sourceNote: "Offizieller v1-Slot. Asset wird ueber Capture-Pipeline erzeugt."
  },
  {
    id: "policy-navigator-read-confirmation",
    module: "policy-navigator",
    title: "Policy Navigator Lesebestaetigung",
    purpose: "proof",
    caption: "Bestaetigungen sind revisionssicher dokumentiert.",
    status: "missing",
    assetPath: "/assets/screenshots/policy-navigator-read-confirmation.png",
    sourceNote: "Offizieller v1-Slot. Asset wird ueber Capture-Pipeline erzeugt."
  },
  {
    id: "dawn-raids-alert-portal",
    module: "dawn-raids",
    title: "Dawn Raids Alarmportal",
    purpose: "hero",
    caption: "Im Ernstfall kann sofort eine zentrale Alarmkette ausgeloest werden.",
    status: "missing",
    assetPath: "/assets/screenshots/dawn-raids-alert-portal.png",
    sourceNote: "Offizieller v1-Slot. Asset wird ueber Capture-Pipeline erzeugt."
  },
  {
    id: "dawn-raids-incident-documentation",
    module: "dawn-raids",
    title: "Dawn Raids Einsatzdokumentation",
    purpose: "proof",
    caption: "Massnahmen und Ereignisse werden strukturiert und zentral dokumentiert.",
    status: "missing",
    assetPath: "/assets/screenshots/dawn-raids-incident-documentation.png",
    sourceNote: "Offizieller v1-Slot. Asset wird ueber Capture-Pipeline erzeugt."
  },
  {
    id: "business-partner-overview-risk",
    module: "business-partner",
    title: "Business Partner Risiko-Overview",
    purpose: "hero",
    caption: "Lieferketten- und Partner-Risiken sind zentral priorisierbar.",
    status: "missing",
    assetPath: "/assets/screenshots/business-partner-overview-risk.png",
    sourceNote: "Offizieller v1-Slot. Asset wird ueber Capture-Pipeline erzeugt."
  },
  {
    id: "business-partner-profile-detail",
    module: "business-partner",
    title: "Business Partner Profil-Detail",
    purpose: "proof",
    caption: "Detailprofile buendeln relevante Risiko- und Kontextinformationen.",
    status: "missing",
    assetPath: "/assets/screenshots/business-partner-profile-detail.png",
    sourceNote: "Offizieller v1-Slot. Asset wird ueber Capture-Pipeline erzeugt."
  },
  {
    id: "business-partner-questionnaire",
    module: "business-partner",
    title: "Business Partner Assessment",
    purpose: "proof",
    caption: "Assessments schaffen Vergleichbarkeit und belastbare Entscheidungsgrundlagen.",
    status: "missing",
    assetPath: "/assets/screenshots/business-partner-questionnaire.png",
    sourceNote: "Offizieller v1-Slot. Asset wird ueber Capture-Pipeline erzeugt."
  }
] as const;

export const SCREENSHOT_CONTRACT_BY_ID: Record<ScreenshotSlotId, ScreenshotContractItem> =
  Object.fromEntries(SCREENSHOT_CONTRACT.map((item) => [item.id, item])) as Record<
    ScreenshotSlotId,
    ScreenshotContractItem
  >;
