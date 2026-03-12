import {
  getAllModuleContent,
  getAllUseCaseContent,
  getHomeContent,
  validateContent
} from "@/lib/content-loader";

describe("content validation", () => {
  it("validates full content set", async () => {
    await expect(validateContent()).resolves.toBeUndefined();
  });

  it("keeps task room screenshot-free", async () => {
    const modules = await getAllModuleContent();
    const taskRoom = modules.find((item) => item.slug === "task-room");

    expect(taskRoom).toBeDefined();
    expect(taskRoom?.screenshots).toHaveLength(0);
  });

  it("keeps all use cases on relevant screenshot slots", async () => {
    const useCases = await getAllUseCaseContent();
    expect(useCases).toHaveLength(2);

    for (const useCase of useCases) {
      expect(useCase.screenshots.length).toBeGreaterThan(0);
    }
  });

  it("loads home content", async () => {
    const home = await getHomeContent();
    expect(home.title).toContain(".LOUPE");
  });
});
