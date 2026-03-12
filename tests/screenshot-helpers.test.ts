import { SCREENSHOT_CONTRACT } from "@/content/screenshot-contract";
import { MODULE_IDS } from "@/lib/domain";
import {
  getDifferentiatorScreenshot,
  getHeroScreenshot,
  getProofScreenshots,
  getScreenshotsByModule
} from "@/lib/screenshot-helpers";

describe("screenshot helpers", () => {
  it("returns screenshots by module and keeps task-room empty", () => {
    for (const moduleId of MODULE_IDS) {
      const actual = getScreenshotsByModule(moduleId);

      if (moduleId === "task-room") {
        expect(actual).toEqual([]);
        continue;
      }

      const expectedIds = SCREENSHOT_CONTRACT.filter((item) => item.module === moduleId).map(
        (item) => item.id
      );
      expect(actual.map((item) => item.id)).toEqual(expectedIds);
    }
  });

  it("returns exactly one hero screenshot for each module with screenshots", () => {
    for (const moduleId of MODULE_IDS) {
      const hero = getHeroScreenshot(moduleId);

      if (moduleId === "task-room") {
        expect(hero).toBeNull();
        continue;
      }

      expect(hero).not.toBeNull();
      expect(hero?.purpose).toBe("hero");
      expect(hero?.module).toBe(moduleId);
    }
  });

  it("returns only proof screenshots", () => {
    for (const moduleId of MODULE_IDS) {
      const proofs = getProofScreenshots(moduleId);
      expect(proofs.every((item) => item.purpose === "proof")).toBe(true);

      if (moduleId === "task-room") {
        expect(proofs).toEqual([]);
      }
    }
  });

  it("returns differentiator screenshot or null", () => {
    for (const moduleId of MODULE_IDS) {
      const differentiator = getDifferentiatorScreenshot(moduleId);

      if (moduleId === "task-room") {
        expect(differentiator).toBeNull();
        continue;
      }

      if (differentiator) {
        expect(differentiator.purpose).toBe("differentiator");
        expect(differentiator.module).toBe(moduleId);
      }
    }

    expect(getDifferentiatorScreenshot("whistleblowing")?.id).toBe("whistleblowing-summary-ai");
    expect(getDifferentiatorScreenshot("policy-navigator")?.id).toBe("policy-navigator-olex-qa");
    expect(getDifferentiatorScreenshot("risk")).toBeNull();
  });
});
