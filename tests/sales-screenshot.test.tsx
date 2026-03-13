import fs from "node:fs/promises";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { SalesScreenshot } from "@/components/SalesScreenshot";
import type { ScreenshotContractItem } from "@/content/screenshot-contract";

describe("SalesScreenshot", () => {
  it("renders a placeholder when assetPath is null", async () => {
    const screenshot: ScreenshotContractItem = {
      id: "whistleblowing-inbox",
      module: "whistleblowing",
      title: "Whistleblowing Inbox",
      purpose: "hero",
      caption: "Placeholder test null assetPath",
      status: "missing",
      assetPath: null,
      sourceNote: "Test"
    };

    const element = await SalesScreenshot({ screenshot });
    const html = renderToStaticMarkup(element);

    expect(html).toContain("Platzhalter aktiv");
    expect(html).not.toContain("<img");
  });

  it("renders a placeholder when the asset is missing", async () => {
    const screenshot: ScreenshotContractItem = {
      id: "whistleblowing-inbox",
      module: "whistleblowing",
      title: "Whistleblowing Inbox",
      purpose: "hero",
      caption: "Placeholder test",
      status: "missing",
      assetPath: "/assets/screenshots/not-existing-test-image.png",
      sourceNote: "Test"
    };

    const element = await SalesScreenshot({ screenshot });
    const html = renderToStaticMarkup(element);

    expect(html).toContain("Platzhalter aktiv");
    expect(html).toContain("Slot: whistleblowing-inbox");
    expect(html).not.toContain("<img");
  });

  it("renders an image when the asset exists", async () => {
    const relativeAssetPath = "/assets/screenshots/test-render-existing.png";
    const absoluteAssetPath = path.join(
      process.cwd(),
      "public",
      relativeAssetPath.replace(/^\//, "")
    );

    await fs.mkdir(path.dirname(absoluteAssetPath), { recursive: true });
    await fs.writeFile(absoluteAssetPath, "test");

    const screenshot: ScreenshotContractItem = {
      id: "whistleblowing-inbox",
      module: "whistleblowing",
      title: "Whistleblowing Inbox",
      purpose: "hero",
      caption: "Image test",
      status: "available",
      assetPath: relativeAssetPath,
      sourceNote: "Test"
    };

    try {
      const element = await SalesScreenshot({ screenshot });
      const html = renderToStaticMarkup(element);

      expect(html).toContain("<img");
      expect(html).toContain(relativeAssetPath);
      expect(html).not.toContain("Platzhalter aktiv");
    } finally {
      await fs.rm(absoluteAssetPath, { force: true });
    }
  });

  it("renders the Olex badge for KI-relevante screenshot surfaces", async () => {
    const screenshot: ScreenshotContractItem = {
      id: "policy-navigator-olex-qa",
      module: "policy-navigator",
      title: "Policy Navigator .LOUPE Olex Q&A",
      purpose: "differentiator",
      caption: ".LOUPE Olex beantwortet Richtlinienfragen im Kontext.",
      status: "missing",
      assetPath: null,
      sourceNote: "Test"
    };

    const element = await SalesScreenshot({ screenshot });
    const html = renderToStaticMarkup(element);

    expect(html).toContain(".LOUPE Olex");
    expect(html).toContain("Differenzierungsmerkmal");
  });

  it("does not render the Olex badge for non-mapped screenshot slots", async () => {
    const screenshot: ScreenshotContractItem = {
      id: "risk-overview-visualization",
      module: "risk",
      title: "Risk Overview mit KI-Hinweisen",
      purpose: "hero",
      caption: "Auch bei KI-Wording darf ohne Mapping kein Badge erscheinen.",
      status: "missing",
      assetPath: null,
      sourceNote: "Test"
    };

    const element = await SalesScreenshot({ screenshot });
    const html = renderToStaticMarkup(element);

    expect(html).not.toContain(".LOUPE Olex");
  });
});
