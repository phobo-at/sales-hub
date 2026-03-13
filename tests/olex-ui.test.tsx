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

    expect(html).toContain("AI-gestuetzte Fallaufbereitung fuer schnellere Erstbewertung");
    expect(html).toContain(".LOUPE Olex");
  });

  it("renders nothing for modules without Olex integration", () => {
    const html = renderToStaticMarkup(<ModuleOlexSection moduleId="risk" />);

    expect(html).toBe("");
  });
});
