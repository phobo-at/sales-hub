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
    title: "AI-gestuetzte Fallaufbereitung fuer schnellere Erstbewertung",
    description:
      ".LOUPE Olex verdichtet Eingangshinweise, markiert Risikomuster und macht aus unstrukturierten Fakten eine belastbare Arbeitsgrundlage fuer Compliance und Legal.",
    bullets: [
      "Priorisiert relevante Sachverhalte fuer die Triage ohne separaten Chatbot-Kontextwechsel.",
      "Fuehrt Fallteam, Status und naechste Schritte in einer nachvollziehbaren Sicht zusammen.",
      "Haelt AI-Unterstuetzung ruhig im Prozess und nicht als aufdringliches Overlay."
    ],
    highlightTitle: "AI-Layer fuer sensible Untersuchungsablaeufe",
    highlightText:
      "Besonders bei Whistleblowing wird Olex als eingebettete Assistenz sichtbar: klar, kontextbezogen und revisionsfaehig.",
    microLabel: "Structured AI assistance"
  },
  "policy-navigator": {
    badgeLabel: ".LOUPE Olex for Policy Guidance",
    title: "Kontextbezogene Richtlinienhilfe direkt im Policy Navigator",
    description:
      ".LOUPE Olex liefert verstaendliche Antworten aus dem Richtlinienkontext und entlastet Compliance-Teams, ohne die Verbindlichkeit der freigegebenen Policy-Basis aufzuweichen.",
    bullets: [
      "Beantwortet Rueckfragen aus dem Policy-Kontext statt mit generischen Suchtreffern.",
      "Verkuerzt die Strecke zwischen Richtlinienbereitstellung, Verstaendnis und Lesebestaetigung.",
      "Staerkt die Plattform als glaubwuerdige AI-Erweiterung fuer regulierte Prozesse."
    ],
    highlightTitle: "AI-Hilfe mit Policy-Kontext statt generischer Suche",
    highlightText:
      "Auf Policy-Seiten zeigt Olex seinen Wert in Klarheit, Orientierung und schnellerem Verstaendnis komplexer Inhalte.",
    microLabel: "Context-aware policy AI"
  }
};

export function getOlexSignal(moduleId: ModuleId): OlexSignal | null {
  return OLEX_SIGNAL_BY_MODULE[moduleId] ?? null;
}

export function hasOlexSignal(moduleId: ModuleId): boolean {
  return getOlexSignal(moduleId) !== null;
}
