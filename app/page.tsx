import Link from "next/link";
import { CtaSection } from "@/components/cta-section";
import { ModuleCard } from "@/components/module-card";
import { OlexBadge } from "@/components/olex-badge";
import { SectionBlock } from "@/components/section-block";
import { getAllModuleContent, getAllUseCaseContent, getHomeContent } from "@/lib/content-loader";
import { hasOlexSignal } from "@/lib/olex";

export default async function HomePage(): Promise<JSX.Element> {
  const [home, modules, useCases] = await Promise.all([
    getHomeContent(),
    getAllModuleContent(),
    getAllUseCaseContent()
  ]);

  const moduleLabelById = new Map(modules.map((module) => [module.slug, module.title]));

  return (
    <>
      <section className="hero home-hero">
        <div className="home-hero__content">
          <span className="eyebrow">Enterprise Compliance Platform</span>
          <h1>{home.title}</h1>
          <p className="hero__subtitle">{home.subtitle}</p>
          <p className="hero__lead">{home.intro}</p>

          <div className="hero__actions">
            <Link className="cta-button" href="/kontakt">
              Demo anfragen
            </Link>
            <Link className="button-secondary" href="/#modules">
              Module entdecken
            </Link>
          </div>
        </div>

        <div className="home-hero__side">
          <article className="surface-card surface-card--floating home-hero__value-card">
            <span className="eyebrow">Was .LOUPE leistet</span>
            <h3>Compliance-Governance, die wirklich greift</h3>
            <ul className="home-hero__value-list">
              {home.whyLoupe.map((point) => (
                <li key={point} className="home-hero__value-item">
                  <span className="home-hero__value-check" aria-hidden="true" />
                  <p>{point}</p>
                </li>
              ))}
            </ul>
            <div className="home-hero__platform-signal">
              <OlexBadge tone="soft" />
              <span>KI-gestützt durch .LOUPE Olex</span>
            </div>
          </article>
        </div>
      </section>

      <SectionBlock
        title="Die .LOUPE Module"
        id="modules"
        eyebrow={`${modules.length} Plattformmodule`}
        description="Sieben spezialisierte Module für vollständige Compliance-Governance – einzeln stark, gemeinsam unschlagbar."
      >
        <div className="grid grid--cards">
          {modules.map((module, index) => (
            <ModuleCard key={module.slug} module={module} index={index} />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        title="Use Cases"
        id="use-cases"
        eyebrow="Modulübergreifende Szenarien"
        description="End-to-End-Szenarien, die zeigen, wie .LOUPE-Module zusammenwirken – ideal für fokussierte Demo-Gespräche."
      >
        <div className="grid grid--cards">
          {useCases.map((useCase) => (
            <article className="card use-case-card" key={useCase.slug}>
              <div className="use-case-card__header">
                <span className="eyebrow">Use Case</span>
                {useCase.modules.some((moduleId) => hasOlexSignal(moduleId)) ? (
                  <OlexBadge tone="soft" />
                ) : null}
              </div>
              <h3>{useCase.title}</h3>
              <p className="use-case-card__summary">{useCase.summary}</p>
              <div className="tag-list">
                {useCase.modules.map((moduleId) => (
                  <span key={moduleId} className="tag tag--neutral">
                    {moduleLabelById.get(moduleId) ?? moduleId}
                  </span>
                ))}
              </div>
              <div className="use-case-card__footer">
                <p>{useCase.outcomes[0]}</p>
                <Link href={`/use-cases/${useCase.slug}`} className="link-inline">
                  Use Case ansehen
                </Link>
              </div>
            </article>
          ))}
        </div>
      </SectionBlock>

      <CtaSection title={home.ctaTitle} text={home.ctaText} label={home.ctaLabel} />
    </>
  );
}
