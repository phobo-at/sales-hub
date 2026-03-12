import { getScreenshotsByIds } from "@/lib/screenshot-helpers";
import type { ScreenshotSlotId } from "@/content/screenshot-contract";
import { SalesScreenshot } from "@/components/SalesScreenshot";

interface ScreenshotGalleryProps {
  screenshotIds: ScreenshotSlotId[];
  title?: string;
}

export function ScreenshotGallery({ screenshotIds, title }: ScreenshotGalleryProps): JSX.Element | null {
  if (screenshotIds.length === 0) {
    return null;
  }

  const screenshots = getScreenshotsByIds(screenshotIds);

  return (
    <section className="section" id="screenshots">
      <h2>{title ?? "Screenshots"}</h2>
      <div className="screenshot-grid">
        {screenshots.map((screenshot) => (
          <SalesScreenshot key={screenshot.id} screenshot={screenshot} />
        ))}
      </div>
    </section>
  );
}
