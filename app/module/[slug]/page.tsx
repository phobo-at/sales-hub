import Link from "next/link";
import { notFound } from "next/navigation";
import { AiAssistHighlight } from "@/components/ai-assist-highlight";
import { CtaSection } from "@/components/cta-section";
import { DetailHero } from "@/components/detail-hero";
import { ModuleOlexSection } from "@/components/module-olex-section";
import { OlexBadge } from "@/components/olex-badge";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { SectionBlock } from "@/components/section-block";
import { MODULE_IDS, type ModuleId } from "@/lib/domain";
import { getModuleContent } from "@/lib/content-loader";
import { getOlexSignal } from "@/lib/olex";

interface ModulePageProps {
  params: { slug: string };
}

export async function generateStaticParams(): Promise<Array<{ slug: ModuleId }>> {
  return MODULE_IDS.map((slug) => ({ slug }));
}

export default async function ModulePage({ params }: ModulePageProps): Promise<JSX.Element> {
  const slug = params.slug as ModuleId;
  const moduleContent = await getModuleContent(slug);

  if (!moduleContent) {
    notFound();
  }

  const olexSignal = getOlexSignal(moduleContent.slug);

  return (
    <>
      <DetailHero
        eyebrow="Module story"
        title={moduleContent.title}
        subtitle={moduleContent.subtitle}
        description={moduleContent.shortDescription}
        problem={moduleContent.problem}
        breadcrumbs={[
          { label: "Start", href: "/" },
          { label: "Module" },
          { label: moduleContent.title }
        ]}
        meta={[
          { label: "Zielgruppen", value: `${moduleContent.targetGroups.length} Teams` },
          { label: "Story steps", value: `${moduleContent.storySteps.length} Schritte` },
          {
            label: "Screenshots",
            value:
              moduleContent.slug === "task-room"
                ? "v1 ohne Screenshot"
                : `${moduleContent.screenshots.length} freigegebene Slots`
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
              <span className="eyebrow">Sales lens</span>
              <p>{moduleContent.proofPoints[0]}</p>
            </article>
          )
        }
      />

      <SectionBlock
        title="Outcome und Story"
        eyebrow="Modulstory"
        description="Der Nutzen wird als klare Buyer-Erzaehlung gefasst und nicht nur als Feature-Liste praesentiert."
        variant="soft"
      >
        <div className="story-layout">
          <article className="surface-card surface-card--soft">
            <h3>Nutzen</h3>
            <ul className="list">
              {moduleContent.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </article>

          <article className="surface-card">
            <h3>So funktioniert es in der Story</h3>
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
          eyebrow="AI differentiation"
          description="Die AI-Ebene wird im Produktkontext sichtbar und bleibt ruhig eingebettet in den Compliance-Prozess."
          variant="accent"
        >
          <ModuleOlexSection moduleId={moduleContent.slug} />
        </SectionBlock>
      ) : null}

      <SectionBlock
        title="Feature- und Benefit-Block"
        eyebrow="Produktmechanik"
        description="Jede Karte verbindet eine konkrete Produktflaeche mit dem relevanten Nutzen fuer Demo- und Kaufgespraeche."
      >
        <div className="grid grid--cards">
          {moduleContent.features.map((feature, index) => (
            <article className="card feature-card" key={feature}>
              <div className="feature-card__header">
                <span className="eyebrow">Feature {index + 1}</span>
                {/ki|olex/i.test(feature) ? <OlexBadge tone="soft" /> : null}
              </div>
              <h3>{feature}</h3>
              <p>{moduleContent.benefits[index % moduleContent.benefits.length]}</p>
            </article>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        title="Proof Points"
        eyebrow="Enterprise fit"
        description="Die Seite bleibt auf Outcome, Governance und Vertrauen fokussiert."
      >
        <div className="grid grid--cards">
          {moduleContent.proofPoints.map((point) => (
            <article key={point} className="surface-card surface-card--soft proof-point">
              <span className="eyebrow">Proof</span>
              <p>{point}</p>
            </article>
          ))}
        </div>
      </SectionBlock>

      {moduleContent.slug === "task-room" ? (
        <SectionBlock
          title="Task Room Teaser (v1 ohne Screenshot)"
          eyebrow="v1 boundary"
          description="Task Room bleibt bewusst screenshot-frei und wird im Hub als koordinierende Anschlussfaehigkeit gezeigt."
          variant="soft"
        >
          <p>
            Task Room strukturiert Massnahmen und Aufgaben ueber Modulgrenzen hinweg. In v1 wird
            bewusst kein Screenshot angezeigt.
          </p>
        </SectionBlock>
      ) : (
        <ScreenshotGallery screenshotIds={moduleContent.screenshots} title="Freigegebene Screenshots" />
      )}

      <SectionBlock
        title="Print-Ansicht"
        eyebrow="Sales enablement"
        description="Alle zentralen Argumente bleiben auch in der Print-/PDF-Route sauber lesbar."
        variant="soft"
      >
        <p>
          Diese Seite kann direkt gedruckt werden oder ueber die dedizierte Print-Route exportiert
          werden.
        </p>
        <p className="section__actions">
          <Link href={`/print/module/${moduleContent.slug}`} className="button-secondary">
            Zur Print-Version
          </Link>
        </p>
      </SectionBlock>

      <CtaSection
        title="Naechster Schritt"
        text="Wir zeigen den Prozess gerne in einer zugeschnittenen Live-Demo mit Ihren Prioritaeten."
        label={moduleContent.ctaLabel ?? "Demo anfragen"}
      />
    </>
  );
}
