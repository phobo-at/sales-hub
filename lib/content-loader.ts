import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import {
  SCREENSHOT_CONTRACT,
  SCREENSHOT_SLOT_IDS,
  type ScreenshotSlotId
} from "@/content/screenshot-contract";
import { MODULE_IDS, USE_CASE_SLUGS, type ModuleId, type UseCaseSlug } from "@/lib/domain";
import type { HomeContent, ModuleContent, UseCaseContent } from "@/lib/types";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const MODULE_DIR = path.join(CONTENT_ROOT, "modules");
const USE_CASE_DIR = path.join(CONTENT_ROOT, "use-cases");
const HOME_FILE = path.join(CONTENT_ROOT, "site", "home.md");

const screenshotSlotEnum = z.enum(SCREENSHOT_SLOT_IDS);
const moduleIdEnum = z.enum(MODULE_IDS);
const useCaseEnum = z.enum(USE_CASE_SLUGS);

const homeSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  intro: z.string().min(1),
  ctaTitle: z.string().min(1),
  ctaText: z.string().min(1),
  ctaLabel: z.string().min(1),
  whyLoupe: z.array(z.string().min(1)).min(3)
});

const moduleSchema = z.object({
  slug: moduleIdEnum,
  title: z.string().min(1),
  subtitle: z.string().min(1),
  shortDescription: z.string().min(1),
  problem: z.string().min(1),
  benefits: z.array(z.string().min(1)).min(2),
  storySteps: z.array(z.string().min(1)).min(3).max(5),
  features: z.array(z.string().min(1)).min(3),
  proofPoints: z.array(z.string().min(1)).min(2),
  targetGroups: z.array(z.string().min(1)).min(1),
  screenshots: z.array(screenshotSlotEnum).default([]),
  ctaLabel: z.string().min(1).optional()
});

const useCaseSchema = z.object({
  slug: useCaseEnum,
  title: z.string().min(1),
  subtitle: z.string().min(1),
  summary: z.string().min(1),
  problem: z.string().min(1),
  outcomes: z.array(z.string().min(1)).min(2),
  storySteps: z.array(z.string().min(1)).min(3).max(5),
  modules: z.array(moduleIdEnum).min(1),
  screenshots: z.array(screenshotSlotEnum).default([]),
  ctaLabel: z.string().min(1).optional()
});

const expectedSlotsByModule = SCREENSHOT_CONTRACT.reduce(
  (acc, item) => {
    acc[item.module] = [...(acc[item.module] ?? []), item.id];
    return acc;
  },
  {} as Record<Exclude<ModuleId, "task-room">, ScreenshotSlotId[]>
);

function parseMarkdownFile<T>(raw: string, schema: z.ZodSchema<T>, filePath: string): T {
  const parsed = matter(raw);
  const result = schema.safeParse(parsed.data);

  if (!result.success) {
    const reason = result.error.issues
      .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
      .join("; ");
    throw new Error(`Ungueltiges Frontmatter in ${filePath}: ${reason}`);
  }

  return result.data;
}

async function readFileUtf8(filePath: string): Promise<string> {
  return fs.readFile(filePath, "utf8");
}

function assertTaskRoomHasNoScreenshots(moduleContent: ModuleContent): void {
  if (moduleContent.slug === "task-room" && moduleContent.screenshots.length > 0) {
    throw new Error("Task Room darf in v1 keine Screenshots enthalten.");
  }
}

function assertModuleScreenshotsMatchContract(moduleContent: ModuleContent): void {
  if (moduleContent.slug === "task-room") {
    return;
  }

  const expected = new Set(expectedSlotsByModule[moduleContent.slug]);
  const actual = new Set(moduleContent.screenshots);

  for (const id of actual) {
    if (!expected.has(id)) {
      throw new Error(
        `Modul ${moduleContent.slug} referenziert unzulaessigen Screenshot-Slot ${id}.`
      );
    }
  }

  if (actual.size !== expected.size) {
    throw new Error(
      `Modul ${moduleContent.slug} muss exakt ${expected.size} freigegebene Screenshot-Slots referenzieren.`
    );
  }
}

function assertUseCaseScreenshotsAreRelevant(useCase: UseCaseContent): void {
  for (const slotId of useCase.screenshots) {
    const contractItem = SCREENSHOT_CONTRACT.find((item) => item.id === slotId);
    if (!contractItem) {
      throw new Error(`Use Case ${useCase.slug} referenziert unbekannten Screenshot ${slotId}.`);
    }

    if (!useCase.modules.includes(contractItem.module)) {
      throw new Error(
        `Use Case ${useCase.slug} nutzt Screenshot ${slotId} aus Modul ${contractItem.module}, das nicht in modules enthalten ist.`
      );
    }
  }
}

export async function getHomeContent(): Promise<HomeContent> {
  const raw = await readFileUtf8(HOME_FILE);
  return parseMarkdownFile(raw, homeSchema, HOME_FILE);
}

export async function getAllModuleContent(): Promise<ModuleContent[]> {
  const entries = await fs.readdir(MODULE_DIR);
  const markdownFiles = entries.filter((entry) => entry.endsWith(".md"));
  const modules = await Promise.all(
    markdownFiles.map(async (entry) => {
      const filePath = path.join(MODULE_DIR, entry);
      const raw = await readFileUtf8(filePath);
      return parseMarkdownFile(raw, moduleSchema, filePath);
    })
  );

  const sorted = modules.sort(
    (a, b) => MODULE_IDS.indexOf(a.slug) - MODULE_IDS.indexOf(b.slug)
  ) as ModuleContent[];

  sorted.forEach(assertTaskRoomHasNoScreenshots);
  sorted.forEach(assertModuleScreenshotsMatchContract);
  return sorted;
}

export async function getModuleContent(slug: ModuleId): Promise<ModuleContent | null> {
  const modules = await getAllModuleContent();
  return modules.find((item) => item.slug === slug) ?? null;
}

export async function getAllUseCaseContent(): Promise<UseCaseContent[]> {
  const entries = await fs.readdir(USE_CASE_DIR);
  const markdownFiles = entries.filter((entry) => entry.endsWith(".md"));
  const useCases = await Promise.all(
    markdownFiles.map(async (entry) => {
      const filePath = path.join(USE_CASE_DIR, entry);
      const raw = await readFileUtf8(filePath);
      return parseMarkdownFile(raw, useCaseSchema, filePath);
    })
  );

  const sorted = useCases.sort(
    (a, b) => USE_CASE_SLUGS.indexOf(a.slug) - USE_CASE_SLUGS.indexOf(b.slug)
  ) as UseCaseContent[];

  sorted.forEach(assertUseCaseScreenshotsAreRelevant);
  return sorted;
}

export async function getUseCaseContent(slug: UseCaseSlug): Promise<UseCaseContent | null> {
  const useCases = await getAllUseCaseContent();
  return useCases.find((item) => item.slug === slug) ?? null;
}

export async function validateContent(): Promise<void> {
  const modules = await getAllModuleContent();
  const useCases = await getAllUseCaseContent();

  const moduleSlugs = new Set(modules.map((item) => item.slug));
  const useCaseSlugs = new Set(useCases.map((item) => item.slug));

  if (moduleSlugs.size !== MODULE_IDS.length) {
    throw new Error(`Es muessen genau ${MODULE_IDS.length} Module gepflegt sein.`);
  }

  if (useCaseSlugs.size !== USE_CASE_SLUGS.length) {
    throw new Error(`Es muessen genau ${USE_CASE_SLUGS.length} Use Cases gepflegt sein.`);
  }

  await getHomeContent();
}
