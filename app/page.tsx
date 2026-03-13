import Link from "next/link";
import { AiAssistHighlight } from "@/components/ai-assist-highlight";
import { CtaSection } from "@/components/cta-section";
import { ModuleCard } from "@/components/module-card";
import { OlexBadge } from "@/components/olex-badge";
import { SectionBlock } from "@/components/section-block";
import { SCREENSHOT_SLOT_IDS } from "@/content/screenshot-contract";
import { getAllModuleContent, getAllUseCaseContent, getHomeContent } from "@/lib/content-loader";
import { hasOlexSignal } from "@/lib/olex";

export default async function HomePage(): Promise<JSX.Element> {
  const [home, modules, useCases] = await Promise.all([
    getHomeContent(),
    getAllModuleContent(),
    getAllUseCaseContent()
  ]);

  const heroMetrics = [
    { label: "Module stories", value: String(modules.length) },
    { label: "Use cases", value: String(useCases.length) },
    { label: "Screenshot slots", value: String(SCREENSHOT_SLOT_IDS.length) }
  ];

  const olexEnabledModules = modules.filter((module) => hasOlexSignal(module.slug));

  return (
    <>
      <section className="hero home-hero">
        <div className="home-hero__content">
          <span className="eyebrow">Enterprise compliance platform</span>
          <h1>{home.title}</h1>
          <p className="hero__subtitle">{home.subtitle}</p>
          <p className="hero__lead">{home.intro}</p>

          <div className="hero__actions">
            <Link className="cta-button" href="/#modules">
              Module entdecken
            </Link>
            <Link className="button-secondary" href="/#use-cases">
              Use Cases ansehen
            </Link>
          </div>

          <div className="hero__badges">
            <OlexBadge />
            <span className="tag tag--neutral">Sales-ready hub</span>
            <span className="tag tag--neutral">Print- und screenshot-stabil</span>
          </div>

          <div className="home-hero__metrics">
            {heroMetrics.map((metric) => (
              <article key={metric.label} className="home-hero__metric surface-card surface-card--soft">
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </article>
            ))}
          </div>
        </div>

        <div className="home-hero__side">
          <AiAssistHighlight
            eyebrow="Platform AI layer"
            title=".LOUPE Olex als ruhige AI-Erweiterung der Plattform"
            text="Im Hub wird Olex nicht als Widget inszeniert, sondern als eingebettete Assistenz fuer Richtlinienkontext, Fallaufbereitung und glaubwuerdige Sales-Differenzierung."
          />

          <article className="surface-card home-hero__panel">
            <span className="eyebrow">Why teams send this hub</span>
            <h3>Weniger Folien, mehr Orientierung und belastbare Produktnahe</h3>
            <ul className="list list--tight">
              {home.whyLoupe.slice(0, 3).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>

          <article className="surface-card surface-card--soft home-hero__panel">
            <span className="eyebrow">Olex in the flow</span>
            <h3>AI sichtbar an den richtigen Stellen</h3>
            <div className="home-hero__signal-list">
              {olexEnabledModules.map((module) => (
                <div key={module.slug} className="home-hero__signal-row">
                  <strong>{module.title}</strong>
                  <span>{module.features.find((feature) => /ki|olex/i.test(feature)) ?? module.benefits[0]}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <SectionBlock
        title="Modulueberblick"
        id="modules"
        eyebrow="Platform modules"
        description="Sieben modulare Einstiege, gestaltet fuer ruhige Orientierung, klare Nutzenkommunikation und belastbare Demo-Gespraeche."
      >
        <div className="grid grid--cards">
          {modules.map((module) => (
            <ModuleCard key={module.slug} module={module} />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        title="Why .LOUPE"
        eyebrow="Sales narrative"
        description="Die Plattform wirkt im Hub nicht wie ein Admin-Tool, sondern wie ein praesentierbares Enterprise-Produkt."
        variant="soft"
      >
        <div className="grid grid--cards">
          {home.whyLoupe.map((point) => (
            <article key={point} className="card insight-card">
              <span className="eyebrow">Why it matters</span>
              <p>{point}</p>
            </article>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        title="Use Cases"
        id="use-cases"
        eyebrow="Cross-module stories"
        description="Fokussierte End-to-End-Erzaehlungen, die konkrete Buyer-Fragen schneller beantworten als reine Feature-Listen."
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
              <div className="tag-list" aria-label="Beteiligte Module">
                {useCase.modules.map((moduleId) => (
                  <span key={moduleId} className="tag tag--neutral">
                    {moduleId}
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
