import React from "react";
import { OlexBadge } from "@/components/olex-badge";

interface AiAssistHighlightProps {
  title: string;
  text: string;
  eyebrow?: string;
}

export function AiAssistHighlight({
  title,
  text,
  eyebrow = "KI-Assistenz"
}: AiAssistHighlightProps): JSX.Element {
  return (
    <article className="ai-highlight surface-card surface-card--floating">
      <div className="ai-highlight__eyebrow">
        <span>{eyebrow}</span>
        <OlexBadge tone="soft" />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
