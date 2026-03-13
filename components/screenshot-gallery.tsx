import { getScreenshotsByIds, hasScreenshotAssets } from "@/lib/screenshot-helpers";
import type { ScreenshotSlotId } from "@/content/screenshot-contract";
import { SalesScreenshot } from "@/components/SalesScreenshot";

interface ScreenshotGalleryProps {
  screenshotIds: ScreenshotSlotId[];
  title?: string;
}

export async function ScreenshotGallery({
  screenshotIds,
  title
}: ScreenshotGalleryProps): Promise<JSX.Element | null> {
  if (screenshotIds.length === 0) {
    return null;
  }

  const screenshots = getScreenshotsByIds(screenshotIds);
  const assetFlags = await hasScreenshotAssets(
    screenshots.map((s) => (typeof s.assetPath === "string" ? s.assetPath : null))
  );

  return (
    <section className="section section--soft section--screenshots" id="screenshots">
      <div className="section__header">
        <span className="eyebrow">Produktflächen</span>
        <h2>{title ?? "Screenshots"}</h2>
        <p>
          Freigegebene Produktansichten mit robuster Platzhalter-Darstellung für fehlende Assets.
        </p>
      </div>
      <div className="screenshot-grid">
        {screenshots.map((screenshot, index) => (
          <SalesScreenshot key={screenshot.id} screenshot={screenshot} hasAsset={assetFlags[index]} />
        ))}
      </div>
    </section>
  );
}
