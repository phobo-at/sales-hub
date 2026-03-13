import React from "react";
import { hasScreenshotAsset } from "@/lib/screenshot-helpers";
import { OlexBadge } from "@/components/olex-badge";
import type { ScreenshotContractItem } from "@/content/screenshot-contract";
import { isOlexScreenshotSlot } from "@/lib/olex";

interface SalesScreenshotProps {
  screenshot: ScreenshotContractItem;
}

function statusBadgeClass(status: ScreenshotContractItem["status"]): string {
  return `badge badge--status-${status}`;
}

function purposeLabel(purpose: ScreenshotContractItem["purpose"]): string {
  if (purpose === "hero") {
    return "Hero-Ansicht";
  }

  if (purpose === "differentiator") {
    return "Differenzierungsmerkmal";
  }

  return "Nachweis";
}

function statusLabel(status: ScreenshotContractItem["status"]): string {
  if (status === "available") {
    return "Verfügbar";
  }

  if (status === "missing") {
    return "Fehlt";
  }

  if (status === "planned") {
    return "Geplant";
  }

  return "Erforderlich";
}

export async function SalesScreenshot({ screenshot }: SalesScreenshotProps): Promise<JSX.Element> {
  const imagePath = typeof screenshot.assetPath === "string" ? screenshot.assetPath : null;
  const hasAsset = await hasScreenshotAsset(imagePath);
  const displayStatus = hasAsset ? "available" : screenshot.status;
  const displayStatusLabel = statusLabel(displayStatus);
  const isOlexSurface = isOlexScreenshotSlot(screenshot.id);

  return (
    <article className={`screenshot-card screenshot-card--${screenshot.purpose}`}>
      <div className="screenshot-card__title-row">
        <div>
          <h3>{screenshot.title}</h3>
          <p className="screenshot-card__copy">{screenshot.caption}</p>
        </div>
        {isOlexSurface ? <OlexBadge tone="soft" /> : null}
      </div>

      <div className="screenshot-card__media surface-card surface-card--soft">
        {hasAsset && imagePath ? (
          // Intentionally using `img`: only render when file exists to avoid broken paths.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="screenshot-card__image"
            src={imagePath}
            alt={screenshot.caption}
            loading="lazy"
          />
        ) : (
          <div
            className="screenshot-card__placeholder"
            role="img"
            aria-label={`${screenshot.title}: Platzhalter aktiv, Status ${displayStatusLabel}`}
          >
            <strong>Platzhalter aktiv</strong>
            <span className="screenshot-card__slot-id">Slot: {screenshot.id}</span>
            <span>Status: {displayStatusLabel}</span>
            <span>{screenshot.sourceNote}</span>
          </div>
        )}
      </div>

      <div className="screenshot-card__meta">
        <span className="badge">{purposeLabel(screenshot.purpose)}</span>
        <span className={statusBadgeClass(displayStatus)}>Status: {displayStatusLabel}</span>
        {!hasAsset ? (
          <span className="badge badge--status-required">Asset ausstehend</span>
        ) : null}
      </div>

      <p className="screenshot-card__source-note">{screenshot.sourceNote}</p>
    </article>
  );
}
