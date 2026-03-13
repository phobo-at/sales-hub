import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AiAssistHighlight } from "@/components/ai-assist-highlight";
import { CtaSection } from "@/components/cta-section";
import { DetailHero } from "@/components/detail-hero";
import { ModuleOlexSection } from "@/components/module-olex-section";
import { OlexBadge } from "@/components/olex-badge";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { SectionBlock } from "@/components/section-block";
import { getModuleContent } from "@/lib/content-loader";
import { MODULE_IDS, parseModuleId, type ModuleId } from "@/lib/domain";
import { getOlexSignal } from "@/lib/olex";

interface ModulePageProps {
  params: { slug: string };
}

export async function generateStaticParams(): Promise<Array<{ slug: ModuleId }>> {
  return MODULE_IDS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ModulePageProps): Promise<Metadata> {
  const slug = parseModuleId(params.slug);
  if (!slug) return {};
  const content = await getModuleContent(slug);
  if (!content) return {};
  return {
    title: `${content.title} | .LOUPE Sales Hub`,
    description: content.shortDescription,
    openGraph: {
      title: content.title,
      description: content.shortDescription,
      type: "website"
    }
  };
}

export default async function ModulePage({ params }: ModulePageProps): Promise<JSX.Element> {
  const slug = parseModuleId(params.slug);
  if (!slug) notFound();

  const moduleContent = await getModuleContent(slug);
  if (!moduleContent) notFound();

  const olexSignal = getOlexSignal(moduleContent.slug);

  return (
    <>
      <DetailHero
        eyebrow="Produktmodul"
        title={moduleContent.title}
        subtitle={moduleContent.subtitle}
        description={moduleContent.shortDescription}
        problem={moduleContent.problem}
        breadcrumbs={[
          { label: "Übersicht", href: "/" },
          { label: "Module" },
          { label: moduleContent.title }
        ]}
        meta={[
          { label: "Zielgruppen", value: moduleContent.targetGroups.join(", ") },
          { label: "Ablaufschritte", value: `${moduleContent.storySteps.length} Schritte` },
          {
            label: "Screenshots",
            value:
              moduleContent.slug === "task-room"
                ? "Coming soon"
                : `${moduleContent.screenshots.length} verfügbar`
          }
        ]}
        actions={
          <>
            {moduleContent.slug !== "task-room" ? (
              <Link className="cta-button" href="#screenshots">
                Screenshots ansehen
              </Link>
            ) : null}
            <Link className="button-secondary" href={`/print/module/${moduleContent.slug}`}>
              Print-Version
            </Link>
          </>
        }
        badges={
          <>
            {olexSignal ? <OlexBadge label={olexSignal.badgeLabel} /> : null}
            {moduleContent.targetGroups.map((item) => (
              <span className="tag tag--neutral" key={item}>
                {item}
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
              <span className="eyebrow">Vertriebsperspektive</span>
              <p>{moduleContent.proofPoints[0]}</p>
            </article>
          )
        }
      />

      <SectionBlock
        title="Nutzen und Ablauf"
        eyebrow="Wie es funktioniert"
        description={moduleContent.subtitle}
        variant="soft"
      >
        <div className="story-layout">
          <article className="surface-card surface-card--soft">
            <h3>Was Sie gewinnen</h3>
            <ul className="list">
              {moduleContent.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </article>

          <article className="surface-card">
            <h3>So läuft es in der Praxis</h3>
            <ol className="list">
              {moduleContent.storySteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        </div>
      </SectionBlock>

      {olexSignal ? (
        <SectionBlock
          title=".LOUPE Olex in diesem Modul"
          eyebrow="KI-Differenzierung"
          description="Kontextsensitive KI-Unterstützung direkt im Compliance-Prozess – ohne Medienbrüche."
          variant="accent"
        >
          <ModuleOlexSection moduleId={moduleContent.slug} />
        </SectionBlock>
      ) : null}

      <SectionBlock
        title="Funktionen im Detail"
        eyebrow="Produktfunktionen"
        description="Konkrete Produktfähigkeiten und ihr direkter Nutzen für Ihr Compliance-Team."
      >
        <div className="grid grid--cards">
          {moduleContent.features.map((feature, index) => (
            <article className="card feature-card" key={feature}>
              <div className="feature-card__header">
                <span className="eyebrow">Funktion {index + 1}</span>
                {/ki|olex/i.test(feature) ? <OlexBadge tone="soft" /> : null}
              </div>
              <h3>{feature}</h3>
              {moduleContent.benefits[index] ? <p>{moduleContent.benefits[index]}</p> : null}
            </article>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        title="Enterprise-Fit"
        eyebrow="Nachweise"
        description="Warum .LOUPE in anspruchsvollen Enterprise-Umgebungen wirkt."
      >
        <div className="grid grid--cards">
          {moduleContent.proofPoints.map((point) => (
            <article key={point} className="surface-card surface-card--soft proof-point">
              <span className="eyebrow">Nachweis</span>
              <p>{point}</p>
            </article>
          ))}
        </div>
      </SectionBlock>

      {moduleContent.slug === "task-room" ? (
        <SectionBlock
          title="Task Room"
          eyebrow="Koordination über Module"
          description="Task Room strukturiert Maßnahmen und Aufgaben über Modulgrenzen hinweg – der zentrale Knotenpunkt für modulübergreifende Compliance-Aufgaben."
          variant="soft"
        />
      ) : (
        <ScreenshotGallery screenshotIds={moduleContent.screenshots} title="Produktscreenshots" />
      )}

      <CtaSection
        title="Nächster Schritt"
        text="Wir zeigen den Prozess gerne in einer zugeschnittenen Live-Demo mit Ihren Prioritäten."
        label={moduleContent.ctaLabel ?? "Demo anfragen"}
      />
    </>
  );
}
