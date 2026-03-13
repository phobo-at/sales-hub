import type { ModuleId } from "@/lib/domain";
import type { ScreenshotSlotId } from "@/content/screenshot-contract";

export interface OlexSignal {
  badgeLabel: string;
  title: string;
  description: string;
  bullets: string[];
  highlightTitle: string;
  highlightText: string;
  microLabel: string;
}

const OLEX_SIGNAL_BY_MODULE: Partial<Record<ModuleId, OlexSignal>> = {
  whistleblowing: {
    badgeLabel: ".LOUPE Olex · Fallreview",
    title: "KI-gestützte Fallaufbereitung für schnellere Erstbewertung",
    description:
      ".LOUPE Olex verdichtet Eingangshinweise, markiert Risikomuster und macht aus unstrukturierten Fakten eine belastbare Arbeitsgrundlage für Compliance und Legal.",
    bullets: [
      "Priorisiert relevante Sachverhalte für die Triage ohne separaten Chatbot-Kontextwechsel.",
      "Führt Fallteam, Status und nächste Schritte in einer nachvollziehbaren Sicht zusammen.",
      "Hält KI-Unterstützung ruhig im Prozess und nicht als aufdringliches Overlay."
    ],
    highlightTitle: "KI-Layer für sensible Untersuchungsabläufe",
    highlightText:
      "Besonders bei Whistleblowing wird Olex als eingebettete Assistenz sichtbar: klar, kontextbezogen und revisionsfähig.",
    microLabel: "Strukturierte KI-Unterstützung"
  },
  "policy-navigator": {
    badgeLabel: ".LOUPE Olex · Policy-Hilfe",
    title: "Kontextbezogene Richtlinienhilfe direkt im Policy Navigator",
    description:
      ".LOUPE Olex liefert verständliche Antworten aus dem Richtlinienkontext und entlastet Compliance-Teams, ohne die Verbindlichkeit der freigegebenen Policy-Basis aufzuweichen.",
    bullets: [
      "Beantwortet Rückfragen aus dem Policy-Kontext statt mit generischen Suchtreffern.",
      "Verkürzt die Strecke zwischen Richtlinienbereitstellung, Verständnis und Lesebestätigung.",
      "Stärkt die Plattform als glaubwürdige KI-Erweiterung für regulierte Prozesse."
    ],
    highlightTitle: "KI-Hilfe mit Policy-Kontext statt generischer Suche",
    highlightText:
      "Auf Policy-Seiten zeigt Olex seinen Wert in Klarheit, Orientierung und schnellerem Verständnis komplexer Inhalte.",
    microLabel: "Kontextbezogene Policy-KI"
  },
  "integrity-check": {
    badgeLabel: ".LOUPE Olex · Integrity-Prüfung",
    title: "KI-gestützte Integritätsprüfung mit klarer Entscheidungslogik",
    description:
      ".LOUPE Olex unterstützt Integrity Check bei der strukturierten Bewertung von Anfragen, priorisiert kritische Antworten und reduziert manuelle Nacharbeit in der Vorprüfung.",
    bullets: [
      "Markiert risikorelevante Muster früh im Intake und im Questionnaire.",
      "Verdichtet Antwortdaten zu einer nachvollziehbaren Entscheidungsvorlage für Compliance und Legal.",
      "Bleibt als ruhige Assistenz im Regelwerk eingebettet, ohne den Prozess zu übersteuern."
    ],
    highlightTitle: "KI-Assistenz für konsistente Integrity-Entscheidungen",
    highlightText:
      "Integrity Check profitiert von Olex als eingebetteter Prüfunterstützung für Tempo, Konsistenz und Governance.",
    microLabel: "Risikosensible Integrity-KI"
  }
};

const OLEX_SCREENSHOT_SLOT_IDS: readonly ScreenshotSlotId[] = [
  "whistleblowing-case-detail-ai",
  "whistleblowing-summary-ai",
  "policy-navigator-olex-qa",
  "integrity-check-questionnaire"
];

const OLEX_SCREENSHOT_SLOT_SET = new Set<ScreenshotSlotId>(OLEX_SCREENSHOT_SLOT_IDS);

export function getOlexSignal(moduleId: ModuleId): OlexSignal | null {
  return OLEX_SIGNAL_BY_MODULE[moduleId] ?? null;
}

export function hasOlexSignal(moduleId: ModuleId): boolean {
  return getOlexSignal(moduleId) !== null;
}

export function isOlexScreenshotSlot(slotId: ScreenshotSlotId): boolean {
  return OLEX_SCREENSHOT_SLOT_SET.has(slotId);
}
