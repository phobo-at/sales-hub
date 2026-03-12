import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/cta-section";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { SectionBlock } from "@/components/section-block";
import { USE_CASE_SLUGS, type UseCaseSlug } from "@/lib/domain";
import { getUseCaseContent } from "@/lib/content-loader";

interface UseCasePageProps {
  params: { slug: string };
}

export async function generateStaticParams(): Promise<Array<{ slug: UseCaseSlug }>> {
  return USE_CASE_SLUGS.map((slug) => ({ slug }));
}

export default async function UseCasePage({ params }: UseCasePageProps): Promise<JSX.Element> {
  const slug = params.slug as UseCaseSlug;
  const useCase = await getUseCaseContent(slug);

  if (!useCase) {
    notFound();
  }

  return (
    <>
      <section className="hero">
        <h1>{useCase.title}</h1>
        <h2>{useCase.subtitle}</h2>
        <p>{useCase.summary}</p>
        <p>
          <strong>Problem:</strong> {useCase.problem}
        </p>
      </section>

      <SectionBlock title="Beteiligte Module">
        <div className="tag-list">
          {useCase.modules.map((moduleId) => (
            <span className="tag" key={moduleId}>
              {moduleId}
            </span>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title="Outcomes">
        <ul className="list">
          {useCase.outcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock title="Ablauf in Schritten">
        <ol className="list">
          {useCase.storySteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </SectionBlock>

      <ScreenshotGallery screenshotIds={useCase.screenshots} title="Relevante Screenshots" />

      <SectionBlock title="Print-Ansicht">
        <p>
          <Link href={`/print/use-cases/${useCase.slug}`} className="link-inline">
            Zur Print-Version
          </Link>
        </p>
      </SectionBlock>

      <CtaSection
        title="Demo fuer diesen Use Case"
        text="Wir zeigen den End-to-End-Ablauf mit Rollenbild und Einfuehrungsfahrplan."
        label={useCase.ctaLabel ?? "Use-Case-Demo anfragen"}
      />
    </>
  );
}
