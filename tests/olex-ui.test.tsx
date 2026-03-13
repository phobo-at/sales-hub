import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ModuleOlexSection } from "@/components/module-olex-section";
import { OlexBadge } from "@/components/olex-badge";

describe("Olex UI primitives", () => {
  it("renders the shared Olex badge copy", () => {
    const html = renderToStaticMarkup(<OlexBadge />);

    expect(html).toContain(".LOUPE Olex");
  });

  it("renders Whistleblowing Olex content from the internal config", () => {
    const html = renderToStaticMarkup(<ModuleOlexSection moduleId="whistleblowing" />);

    expect(html).toContain("AI-gestützte Fallaufbereitung für schnellere Erstbewertung");
    expect(html).toContain(".LOUPE Olex");
  });

  it("renders Integrity Check Olex content from the internal config", () => {
    const html = renderToStaticMarkup(<ModuleOlexSection moduleId="integrity-check" />);

    expect(html).toContain("AI-gestützte Integritätsprüfung mit klarer Entscheidungslogik");
    expect(html).toContain("Risk-aware integrity AI");
  });

  it("renders nothing for modules without Olex integration", () => {
    const html = renderToStaticMarkup(<ModuleOlexSection moduleId="risk" />);

    expect(html).toBe("");
  });
});
