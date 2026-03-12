import React from "react";
import { hasScreenshotAsset } from "@/lib/screenshot-helpers";
import type { ScreenshotContractItem } from "@/content/screenshot-contract";

interface SalesScreenshotProps {
  screenshot: ScreenshotContractItem;
}

function statusBadgeClass(status: ScreenshotContractItem["status"]): string {
  return `badge badge--status-${status}`;
}

export async function SalesScreenshot({ screenshot }: SalesScreenshotProps): Promise<JSX.Element> {
  const hasAsset = await hasScreenshotAsset(screenshot.assetPath);
  const displayStatus = hasAsset ? "available" : screenshot.status;

  return (
    <article className="screenshot-card">
      <h3>{screenshot.title}</h3>

      {hasAsset ? (
        // Intentionally using `img`: only render when file exists to avoid broken paths.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="screenshot-card__image"
          src={screenshot.assetPath}
          alt={screenshot.caption}
          loading="lazy"
        />
      ) : (
        <div className="screenshot-card__placeholder" role="img" aria-label={screenshot.title}>
          <strong>Placeholder aktiv</strong>
          <span className="screenshot-card__slot-id">Slot: {screenshot.id}</span>
          <span>Status: {displayStatus}</span>
          <span>{screenshot.sourceNote}</span>
        </div>
      )}

      <p>{screenshot.caption}</p>
      <div className="screenshot-card__meta">
        <span className="badge">Purpose: {screenshot.purpose}</span>
        <span className={statusBadgeClass(displayStatus)}>Status: {displayStatus}</span>
      </div>
    </article>
  );
}
