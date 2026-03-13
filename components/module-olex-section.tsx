import React from "react";
import type { ModuleId } from "@/lib/domain";
import { getOlexSignal } from "@/lib/olex";
import { AiAssistHighlight } from "@/components/ai-assist-highlight";
import { OlexCallout } from "@/components/olex-callout";

interface ModuleOlexSectionProps {
  moduleId: ModuleId;
}

export function ModuleOlexSection({ moduleId }: ModuleOlexSectionProps): JSX.Element | null {
  const signal = getOlexSignal(moduleId);

  if (!signal) {
    return null;
  }

  return (
    <div className="olex-module-grid">
      <OlexCallout
        title={signal.title}
        description={signal.description}
        points={signal.bullets}
        footnote="Olex bleibt eingebettet in den regulierten Prozess und ersetzt keine freigegebenen Fachregeln."
      />
      <AiAssistHighlight
        eyebrow={signal.microLabel}
        title={signal.highlightTitle}
        text={signal.highlightText}
      />
    </div>
  );
}
