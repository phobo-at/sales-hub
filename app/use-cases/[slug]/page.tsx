import Link from "next/link";
import { notFound } from "next/navigation";
import { AiAssistHighlight } from "@/components/ai-assist-highlight";
import { CtaSection } from "@/components/cta-section";
import { DetailHero } from "@/components/detail-hero";
import { OlexBadge } from "@/components/olex-badge";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { SectionBlock } from "@/components/section-block";
import { USE_CASE_SLUGS, type UseCaseSlug } from "@/lib/domain";
import { getAllModuleContent, getUseCaseContent } from "@/lib/content-loader";
import { getOlexSignal } from "@/lib/olex";

interface UseCasePageProps {
  params: { slug: string };
}

export async function generateStaticParams(): Promise<Array<{ slug: UseCaseSlug }>> {
  return USE_CASE_SLUGS.map((slug) => ({ slug }));
}

export default async function UseCasePage({ params }: UseCasePageProps): Promise<JSX.Element> {
  const slug = params.slug as UseCaseSlug;
  const [useCase, modules] = await Promise.all([getUseCaseContent(slug), getAllModuleContent()]);

  if (!useCase) {
    notFound();
  }

  const moduleMap = new Map(modules.map((module) => [module.slug, module.title]));
  const olexSignal = useCase.modules.map((moduleId) => getOlexSignal(moduleId)).find(Boolean) ?? null;

  return (
    <>
      <DetailHero
        eyebrow="Use Case story"
        title={useCase.title}
        subtitle={useCase.subtitle}
        description={useCase.summary}
        problem={useCase.problem}
        breadcrumbs={[
          { label: "Start", href: "/" },
          { label: "Use Cases" },
          { label: useCase.title }
        ]}
        meta={[
          { label: "Beteiligte Module", value: `${useCase.modules.length} Module` },
          { label: "Outcomes", value: `${useCase.outcomes.length} Resultate` },
          { label: "Screenshots", value: `${useCase.screenshots.length} relevante Slots` }
        ]}
        actions={
          <>
            <Link className="cta-button" href="#screenshots">
              Screenshots ansehen
            </Link>
            <Link className="button-secondary" href={`/print/use-cases/${useCase.slug}`}>
              Print-Version
            </Link>
          </>
        }
        badges={
          <>
            {olexSignal ? <OlexBadge /> : null}
            {useCase.modules.map((moduleId) => (
              <span className="tag tag--neutral" key={moduleId}>
                {moduleMap.get(moduleId) ?? moduleId}
              </span>
            ))}
          </>
        }
        aside={
          olexSignal ? (
            <AiAssistHighlight
              eyebrow={olexSignal.microLabel}
              title={olexSignal.highlightTitle}
              text={olexSignal.highlightText}
            />
          ) : (
            <article className="surface-card surface-card--soft detail-note">
              <span className="eyebrow">Outcome focus</span>
              <p>{useCase.outcomes[0]}</p>
            </article>
          )
        }
      />

      <SectionBlock
        title="Beteiligte Module"
        eyebrow="Platform coverage"
        description="Der Use Case verbindet konkrete Plattform-Bausteine zu einer durchgängigen Enterprise-Story."
        variant="soft"
      >
        <div className="tag-list">
          {useCase.modules.map((moduleId) => (
            <span className="tag tag--neutral" key={moduleId}>
              {moduleMap.get(moduleId) ?? moduleId}
            </span>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        title="Outcomes und Ablauf"
        eyebrow="Journey"
        description="Die Wirkung wird mit klaren Resultaten und einem nachvollziehbaren Schritt-für-Schritt-Ablauf beschrieben."
      >
        <div className="story-layout">
          <article className="surface-card surface-card--soft">
            <h3>Outcomes</h3>
            <ul className="list">
              {useCase.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </article>

          <article className="surface-card">
            <h3>Ablauf in Schritten</h3>
            <ol className="list">
              {useCase.storySteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        </div>
      </SectionBlock>

      <ScreenshotGallery screenshotIds={useCase.screenshots} title="Relevante Screenshots" />

      <SectionBlock
        title="Print-Ansicht"
        eyebrow="Sales enablement"
        description="Der Use Case lässt sich direkt in eine druckbare oder PDF-fähige Fassung überführen."
        variant="soft"
      >
        <p className="section__actions">
          <Link href={`/print/use-cases/${useCase.slug}`} className="button-secondary">
            Zur Print-Version
          </Link>
        </p>
      </SectionBlock>

      <CtaSection
        title="Demo für diesen Use Case"
        text="Wir zeigen den End-to-End-Ablauf mit Rollenbild und Einführungsfahrplan."
        label={useCase.ctaLabel ?? "Use-Case-Demo anfragen"}
      />
    </>
  );
}
