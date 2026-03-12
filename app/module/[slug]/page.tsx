import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/cta-section";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { SectionBlock } from "@/components/section-block";
import { MODULE_IDS, type ModuleId } from "@/lib/domain";
import { getModuleContent } from "@/lib/content-loader";

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

  return (
    <>
      <section className="hero">
        <h1>{moduleContent.title}</h1>
        <h2>{moduleContent.subtitle}</h2>
        <p>{moduleContent.shortDescription}</p>
        <p>
          <strong>Problem:</strong> {moduleContent.problem}
        </p>
      </section>

      <SectionBlock title="Zielgruppen">
        <div className="tag-list">
          {moduleContent.targetGroups.map((item) => (
            <span className="tag" key={item}>
              {item}
            </span>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title="Nutzen">
        <ul className="list">
          {moduleContent.benefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock title="So funktioniert es in der Story">
        <ol className="list">
          {moduleContent.storySteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </SectionBlock>

      <SectionBlock title="Feature- und Benefit-Block">
        <div className="grid grid--cards">
          {moduleContent.features.map((feature) => (
            <article className="card" key={feature}>
              <h3>{feature}</h3>
              <p>
                Das Feature unterstuetzt die Umsetzung des Prozesses mit klarer Verantwortung und
                nachvollziehbarer Dokumentation.
              </p>
            </article>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title="Proof Points">
        <ul className="list">
          {moduleContent.proofPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </SectionBlock>

      {moduleContent.slug === "task-room" ? (
        <SectionBlock title="Task Room Teaser (v1 ohne Screenshot)">
          <p>
            Task Room strukturiert Massnahmen und Aufgaben ueber Modulgrenzen hinweg. In v1 wird
            bewusst kein Screenshot angezeigt.
          </p>
        </SectionBlock>
      ) : (
        <ScreenshotGallery screenshotIds={moduleContent.screenshots} title="Freigegebene Screenshots" />
      )}

      <SectionBlock title="Print-Ansicht">
        <p>
          Diese Seite kann direkt gedruckt werden oder ueber die dedizierte Print-Route exportiert
          werden.
        </p>
        <p>
          <Link href={`/print/module/${moduleContent.slug}`} className="link-inline">
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
