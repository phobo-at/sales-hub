import React from "react";
import { OlexBadge } from "@/components/olex-badge";

interface OlexCalloutProps {
  title: string;
  description: string;
  points?: string[];
  footnote?: string;
}

export function OlexCallout({
  title,
  description,
  points = [],
  footnote
}: OlexCalloutProps): JSX.Element {
  return (
    <section className="olex-callout surface-card surface-card--accent">
      <div className="olex-callout__header">
        <OlexBadge />
        <h3>{title}</h3>
      </div>
      <p>{description}</p>
      {points.length > 0 ? (
        <ul className="list list--tight">
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      ) : null}
      {footnote ? <p className="olex-callout__footnote">{footnote}</p> : null}
    </section>
  );
}
