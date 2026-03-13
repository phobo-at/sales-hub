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
    { label: "Modul-Stories", value: String(modules.length) },
    { label: "Use Cases", value: String(useCases.length) },
    { label: "Screenshot-Slots", value: String(SCREENSHOT_SLOT_IDS.length) }
  ];

  const olexEnabledModules = modules.filter((module) => hasOlexSignal(module.slug));
  const moduleLabelById = new Map(modules.map((module) => [module.slug, module.title]));

  return (
    <>
      <section className="hero home-hero">
        <div className="home-hero__content">
          <span className="eyebrow">Enterprise-Compliance-Plattform</span>
          <h1>{home.title}</h1>
          <p className="hero__subtitle">{home.subtitle}</p>
          <p className="hero__lead">{home.intro}</p>

          <div className="hero__actions">
            <Link className="cta-button" href="/#modules">
              Module entdecken
            </Link>
            <Link className="button-secondary" href="/#use-cases">
              Zu den Use Cases
            </Link>
          </div>

          <div className="hero__badges">
            <OlexBadge />
            <span className="tag tag--neutral">Vertriebsbereit</span>
            <span className="tag tag--neutral">Print- und Screenshot-stabil</span>
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
            eyebrow="Plattform-KI-Ebene"
            title=".LOUPE Olex als ruhige KI-Erweiterung der Plattform"
            text="Im Hub erscheint Olex nicht als Widget, sondern als eingebettete Assistenz für Richtlinienkontext, Fallaufbereitung und belastbare Vertriebsdifferenzierung."
          />

          <article className="surface-card home-hero__panel">
            <span className="eyebrow">Warum Teams diesen Hub teilen</span>
            <h3>Weniger Folien, mehr Orientierung und belastbare Produktnähe</h3>
            <p className="home-hero__lead-point">{home.whyLoupe[0]}</p>
            <ul className="list list--tight">
              {home.whyLoupe.slice(1, 3).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>

          <article className="surface-card surface-card--soft home-hero__panel">
            <span className="eyebrow">Olex im relevanten Kontext</span>
            <h3>KI sichtbar an den richtigen Stellen</h3>
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
        title="Modulüberblick"
        id="modules"
        eyebrow="Plattformmodule"
        description="Sieben modulare Einstiege, gestaltet für ruhige Orientierung, klare Nutzenkommunikation und belastbare Demo-Gespräche."
      >
        <div className="grid grid--cards">
          {modules.map((module) => (
            <ModuleCard key={module.slug} module={module} />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        title="Why .LOUPE"
        eyebrow="Vertriebsnarrativ"
        description="Die Plattform wirkt im Hub nicht wie ein Admin-Tool, sondern wie ein präsentierbares Enterprise-Produkt."
        variant="minimal"
      >
        <div className="why-loupe">
          <article className="surface-card surface-card--floating why-loupe__lead">
            <span className="eyebrow">Leitargument</span>
            <h3>Der Hub erklärt Nutzen zuerst und Oberfläche zweitens.</h3>
            <p>{home.whyLoupe[0]}</p>
          </article>
          <div className="why-loupe__grid">
            {home.whyLoupe.slice(1).map((point) => (
              <article key={point} className="surface-card why-loupe__item">
                <span className="eyebrow">Warum es trägt</span>
                <p>{point}</p>
              </article>
            ))}
          </div>
        </div>
      </SectionBlock>

      <SectionBlock
        title="Use Cases"
        id="use-cases"
        eyebrow="Modulübergreifende Stories"
        description="Fokussierte End-to-End-Erzählungen, die konkrete Buyer-Fragen schneller beantworten als reine Feature-Listen."
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
                    {moduleLabelById.get(moduleId) ?? moduleId}
                  </span>
                ))}
              </div>
              <div className="use-case-card__footer">
                <p>{useCase.outcomes[0]}</p>
                <Link href={`/use-cases/${useCase.slug}`} className="link-inline">
                  Use Case öffnen
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
