import type { ScreenshotModuleId, ScreenshotSlotId } from "@/content/screenshot-contract";

export const SCREENSHOT_VIEWPORTS = {
  productStandard: { width: 1440, height: 900 },
  heroWide: { width: 1600, height: 900 },
  detail: { width: 1280, height: 960 }
} as const;

export type ScreenshotViewportName = keyof typeof SCREENSHOT_VIEWPORTS;

export interface ScreenshotManifestItem {
  id: ScreenshotSlotId;
  module: ScreenshotModuleId;
  route: string;
  viewport: ScreenshotViewportName;
  waitFor: string;
  output: string;
  requiresAuth?: boolean;
  tags?: readonly string[];
}

export const SCREENSHOT_MANIFEST: readonly ScreenshotManifestItem[] = [
  {
    id: "whistleblowing-inbox",
    module: "whistleblowing",
    route: "/marketing/whistleblowing/inbox",
    viewport: "heroWide",
    waitFor: '[data-testid="screen-ready"]',
    output: "/assets/screenshots/whistleblowing-inbox.png",
    tags: ["pilot", "whistleblowing", "hero"]
  },
  {
    id: "whistleblowing-case-detail-ai",
    module: "whistleblowing",
    route: "/marketing/whistleblowing/case-detail-ai",
    viewport: "detail",
    waitFor: '[data-testid="screen-ready"]',
    output: "/assets/screenshots/whistleblowing-case-detail-ai.png",
    tags: ["pilot", "whistleblowing", "proof"]
  },
  {
    id: "whistleblowing-summary-ai",
    module: "whistleblowing",
    route: "/marketing/whistleblowing/summary-ai",
    viewport: "productStandard",
    waitFor: '[data-testid="screen-ready"]',
    output: "/assets/screenshots/whistleblowing-summary-ai.png",
    tags: ["pilot", "whistleblowing", "differentiator"]
  }
] as const;

export const SCREENSHOT_MANIFEST_BY_ID: Partial<Record<ScreenshotSlotId, ScreenshotManifestItem>> =
  Object.fromEntries(SCREENSHOT_MANIFEST.map((item) => [item.id, item])) as Partial<
    Record<ScreenshotSlotId, ScreenshotManifestItem>
  >;
