import type { ScreenshotSlotId } from "@/content/screenshot-contract";
import type { ModuleId, UseCaseSlug } from "@/lib/domain";

export interface HomeContent {
  title: string;
  subtitle: string;
  intro: string;
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
  whyLoupe: string[];
}

export interface ModuleContent {
  slug: ModuleId;
  title: string;
  subtitle: string;
  shortDescription: string;
  problem: string;
  benefits: string[];
  storySteps: string[];
  features: string[];
  proofPoints: string[];
  targetGroups: string[];
  screenshots: ScreenshotSlotId[];
  ctaLabel?: string;
}

export interface UseCaseContent {
  slug: UseCaseSlug;
  title: string;
  subtitle: string;
  summary: string;
  problem: string;
  outcomes: string[];
  storySteps: string[];
  modules: ModuleId[];
  screenshots: ScreenshotSlotId[];
  ctaLabel?: string;
}
