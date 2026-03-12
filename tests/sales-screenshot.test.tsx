import fs from "node:fs/promises";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { SalesScreenshot } from "@/components/SalesScreenshot";
import type { ScreenshotContractItem } from "@/content/screenshot-contract";

describe("SalesScreenshot", () => {
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

    expect(html).toContain("Placeholder aktiv");
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
      expect(html).not.toContain("Placeholder aktiv");
    } finally {
      await fs.rm(absoluteAssetPath, { force: true });
    }
  });
});
