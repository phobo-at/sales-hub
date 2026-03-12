import Link from "next/link";
import { CtaSection } from "@/components/cta-section";
import { ModuleCard } from "@/components/module-card";
import { SectionBlock } from "@/components/section-block";
import { getAllModuleContent, getAllUseCaseContent, getHomeContent } from "@/lib/content-loader";

export default async function HomePage(): Promise<JSX.Element> {
  const [home, modules, useCases] = await Promise.all([
    getHomeContent(),
    getAllModuleContent(),
    getAllUseCaseContent()
  ]);

  return (
    <>
      <section className="hero">
        <h1>{home.title}</h1>
        <h2>{home.subtitle}</h2>
        <p>{home.intro}</p>
      </section>

      <SectionBlock title="Modulueberblick" id="modules">
        <div className="grid grid--cards">
          {modules.map((module) => (
            <ModuleCard key={module.slug} module={module} />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title="Why .LOUPE">
        <ul className="list">
          {home.whyLoupe.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock title="Use Cases">
        <div className="grid grid--cards">
          {useCases.map((useCase) => (
            <article className="card" key={useCase.slug}>
              <h3>{useCase.title}</h3>
              <p>{useCase.summary}</p>
              <p>
                <Link href={`/use-cases/${useCase.slug}`} className="link-inline">
                  Use Case ansehen
                </Link>
              </p>
            </article>
          ))}
        </div>
      </SectionBlock>

      <CtaSection title={home.ctaTitle} text={home.ctaText} label={home.ctaLabel} />
    </>
  );
}
