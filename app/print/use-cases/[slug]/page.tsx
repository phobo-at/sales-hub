import { notFound } from "next/navigation";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { getUseCaseContent } from "@/lib/content-loader";
import { USE_CASE_SLUGS, parseUseCaseSlug, type UseCaseSlug } from "@/lib/domain";

interface PrintUseCasePageProps {
  params: { slug: string };
}

export async function generateStaticParams(): Promise<Array<{ slug: UseCaseSlug }>> {
  return USE_CASE_SLUGS.map((slug) => ({ slug }));
}

export default async function PrintUseCasePage({ params }: PrintUseCasePageProps): Promise<JSX.Element> {
  const slug = parseUseCaseSlug(params.slug);
  if (!slug) notFound();

  const useCase = await getUseCaseContent(slug);
  if (!useCase) notFound();

  return (
    <article>
      <section className="hero">
        <h1>Print: {useCase.title}</h1>
        <p>{useCase.summary}</p>
      </section>

      <section className="section">
        <h2>Ablauf</h2>
        <ol className="list">
          {useCase.storySteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <ScreenshotGallery screenshotIds={useCase.screenshots} title="Screenshots / Placeholder" />
    </article>
  );
}
