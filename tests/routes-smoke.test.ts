import { generateStaticParams as moduleParams } from "@/app/module/[slug]/page";
import { generateStaticParams as printModuleParams } from "@/app/print/module/[slug]/page";
import { generateStaticParams as useCaseParams } from "@/app/use-cases/[slug]/page";
import { generateStaticParams as printUseCaseParams } from "@/app/print/use-cases/[slug]/page";
import { MODULE_IDS, USE_CASE_SLUGS } from "@/lib/domain";

describe("route static params", () => {
  it("covers all module routes", async () => {
    const [params, printParams] = await Promise.all([moduleParams(), printModuleParams()]);

    expect(params.map((item) => item.slug)).toEqual(MODULE_IDS);
    expect(printParams.map((item) => item.slug)).toEqual(MODULE_IDS);
  });

  it("covers all use-case routes", async () => {
    const [params, printParams] = await Promise.all([useCaseParams(), printUseCaseParams()]);

    expect(params.map((item) => item.slug)).toEqual(USE_CASE_SLUGS);
    expect(printParams.map((item) => item.slug)).toEqual(USE_CASE_SLUGS);
  });
});
