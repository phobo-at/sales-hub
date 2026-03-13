import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AiAssistHighlight } from "@/components/ai-assist-highlight";
import { CtaSection } from "@/components/cta-section";
import { DetailHero } from "@/components/detail-hero";
import { OlexBadge } from "@/components/olex-badge";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { SectionBlock } from "@/components/section-block";
import { getAllModuleContent, getUseCaseContent } from "@/lib/content-loader";
import { USE_CASE_SLUGS, parseUseCaseSlug, type UseCaseSlug } from "@/lib/domain";
import { getOlexSignal } from "@/lib/olex";

interface UseCasePageProps {
  params: { slug: string };
}

export async function generateStaticParams(): Promise<Array<{ slug: UseCaseSlug }>> {
  return USE_CASE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: UseCasePageProps): Promise<Metadata> {
  const slug = parseUseCaseSlug(params.slug);
  if (!slug) return {};
  const content = await getUseCaseContent(slug);
  if (!content) return {};
  return {
    title: `${content.title} | .LOUPE Sales Hub`,
    description: content.summary,
    openGraph: {
      title: content.title,
      description: content.summary,
      type: "website"
    }
  };
}

export default async function UseCasePage({ params }: UseCasePageProps): Promise<JSX.Element> {
  const slug = parseUseCaseSlug(params.slug);
  if (!slug) notFound();

  const [useCase, modules] = await Promise.all([getUseCaseContent(slug), getAllModuleContent()]);
  if (!useCase) notFound();

  const moduleMap = new Map(modules.map((module) => [module.slug, module.title]));
  const olexSignal = useCase.modules.map((moduleId) => getOlexSignal(moduleId)).find(Boolean) ?? null;

  return (
    <>
      <DetailHero
        eyebrow="Anwendungsszenario"
        title={useCase.title}
        subtitle={useCase.subtitle}
        description={useCase.summary}
        problem={useCase.problem}
        breadcrumbs={[
          { label: "Übersicht", href: "/" },
          { label: "Szenarien" },
          { label: useCase.title }
        ]}
        meta={[
          { label: "Beteiligte Module", value: `${useCase.modules.length} Module` },
          { label: "Ergebnisse", value: `${useCase.outcomes.length} Resultate` },
          {
            label: "Screenshots",
            value: useCase.screenshots.length > 0 ? `${useCase.screenshots.length} verfügbar` : "–"
          }
        ]}
        actions={
          <>
            {useCase.screenshots.length > 0 ? (
              <Link className="cta-button" href="#screenshots">
                Screenshots ansehen
              </Link>
            ) : null}
            <Link className="button-secondary" href="/kontakt">
              Demo anfragen
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
              <span className="eyebrow">Kernwirkung</span>
              <p>{useCase.outcomes[0]}</p>
            </article>
          )
        }
      />

      <SectionBlock
        title="Ergebnisse und Ablauf"
        eyebrow="Wie es wirkt"
        description="Klare Resultate, nachvollziehbarer Ablauf – so unterstützt .LOUPE dieses Szenario von Anfang bis Ende."
      >
        <div className="story-layout">
          <article className="surface-card surface-card--soft">
            <h3>Was Sie gewinnen</h3>
            <ul className="list">
              {useCase.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </article>

          <article className="surface-card">
            <h3>Ablauf in der Praxis</h3>
            <ol className="list">
              {useCase.storySteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        </div>
      </SectionBlock>

      <ScreenshotGallery screenshotIds={useCase.screenshots} title="Produktscreenshots" />

      <CtaSection
        title="Demo für dieses Szenario"
        text="Wir zeigen den End-to-End-Ablauf mit Rollenbild und Einführungsfahrplan."
        label={useCase.ctaLabel ?? "Demo anfragen"}
      />
    </>
  );
}
