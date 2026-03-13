import type { ModuleId } from "@/lib/domain";

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
    badgeLabel: ".LOUPE Olex for Case Review",
    title: "AI-gestützte Fallaufbereitung für schnellere Erstbewertung",
    description:
      ".LOUPE Olex verdichtet Eingangshinweise, markiert Risikomuster und macht aus unstrukturierten Fakten eine belastbare Arbeitsgrundlage für Compliance und Legal.",
    bullets: [
      "Priorisiert relevante Sachverhalte für die Triage ohne separaten Chatbot-Kontextwechsel.",
      "Führt Fallteam, Status und nächste Schritte in einer nachvollziehbaren Sicht zusammen.",
      "Hält AI-Unterstützung ruhig im Prozess und nicht als aufdringliches Overlay."
    ],
    highlightTitle: "AI-Layer für sensible Untersuchungsabläufe",
    highlightText:
      "Besonders bei Whistleblowing wird Olex als eingebettete Assistenz sichtbar: klar, kontextbezogen und revisionsfähig.",
    microLabel: "Structured AI assistance"
  },
  "policy-navigator": {
    badgeLabel: ".LOUPE Olex for Policy Guidance",
    title: "Kontextbezogene Richtlinienhilfe direkt im Policy Navigator",
    description:
      ".LOUPE Olex liefert verständliche Antworten aus dem Richtlinienkontext und entlastet Compliance-Teams, ohne die Verbindlichkeit der freigegebenen Policy-Basis aufzuweichen.",
    bullets: [
      "Beantwortet Rückfragen aus dem Policy-Kontext statt mit generischen Suchtreffern.",
      "Verkürzt die Strecke zwischen Richtlinienbereitstellung, Verständnis und Lesebestätigung.",
      "Stärkt die Plattform als glaubwürdige AI-Erweiterung für regulierte Prozesse."
    ],
    highlightTitle: "AI-Hilfe mit Policy-Kontext statt generischer Suche",
    highlightText:
      "Auf Policy-Seiten zeigt Olex seinen Wert in Klarheit, Orientierung und schnellerem Verständnis komplexer Inhalte.",
    microLabel: "Context-aware policy AI"
  },
  "integrity-check": {
    badgeLabel: ".LOUPE Olex for Integrity Review",
    title: "AI-gestützte Integritätsprüfung mit klarer Entscheidungslogik",
    description:
      ".LOUPE Olex unterstützt Integrity Check bei der strukturierten Bewertung von Anfragen, priorisiert kritische Antworten und reduziert manuelle Nacharbeit in der Vorprüfung.",
    bullets: [
      "Markiert risikorelevante Muster früh im Intake und im Questionnaire.",
      "Verdichtet Antwortdaten zu einer nachvollziehbaren Entscheidungsvorlage für Compliance und Legal.",
      "Bleibt als ruhige Assistenz im Regelwerk eingebettet, ohne den Prozess zu übersteuern."
    ],
    highlightTitle: "AI-Assistenz für konsistente Integrity-Entscheidungen",
    highlightText:
      "Integrity Check profitiert von Olex als eingebetteter Prüfunterstützung für Tempo, Konsistenz und Governance.",
    microLabel: "Risk-aware integrity AI"
  }
};

export function getOlexSignal(moduleId: ModuleId): OlexSignal | null {
  return OLEX_SIGNAL_BY_MODULE[moduleId] ?? null;
}

export function hasOlexSignal(moduleId: ModuleId): boolean {
  return getOlexSignal(moduleId) !== null;
}
