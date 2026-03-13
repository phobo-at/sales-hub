import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ModuleOlexSection } from "@/components/module-olex-section";
import { OlexBadge } from "@/components/olex-badge";
import { isOlexScreenshotSlot } from "@/lib/olex";

describe("Olex UI primitives", () => {
  it("renders the shared Olex badge copy", () => {
    const html = renderToStaticMarkup(<OlexBadge />);

    expect(html).toContain(".LOUPE Olex");
  });

  it("renders Whistleblowing Olex content from the internal config", () => {
    const html = renderToStaticMarkup(<ModuleOlexSection moduleId="whistleblowing" />);

    expect(html).toContain("KI-gestützte Fallaufbereitung für schnellere Erstbewertung");
    expect(html).toContain(".LOUPE Olex");
  });

  it("renders Integrity Check Olex content from the internal config", () => {
    const html = renderToStaticMarkup(<ModuleOlexSection moduleId="integrity-check" />);

    expect(html).toContain("KI-gestützte Integritätsprüfung mit klarer Entscheidungslogik");
    expect(html).toContain("Risikosensible Integrity-KI");
  });

  it("renders nothing for modules without Olex integration", () => {
    const html = renderToStaticMarkup(<ModuleOlexSection moduleId="risk" />);

    expect(html).toBe("");
  });

  it("flags Olex screenshot slots deterministically", () => {
    expect(isOlexScreenshotSlot("policy-navigator-olex-qa")).toBe(true);
    expect(isOlexScreenshotSlot("integrity-check-questionnaire")).toBe(true);
    expect(isOlexScreenshotSlot("risk-overview-visualization")).toBe(false);
  });
});
