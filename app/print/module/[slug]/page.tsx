import { notFound } from "next/navigation";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { MODULE_IDS, type ModuleId } from "@/lib/domain";
import { getModuleContent } from "@/lib/content-loader";

interface PrintModulePageProps {
  params: { slug: string };
}

export async function generateStaticParams(): Promise<Array<{ slug: ModuleId }>> {
  return MODULE_IDS.map((slug) => ({ slug }));
}

export default async function PrintModulePage({ params }: PrintModulePageProps): Promise<JSX.Element> {
  const slug = params.slug as ModuleId;
  const moduleContent = await getModuleContent(slug);

  if (!moduleContent) {
    notFound();
  }

  return (
    <article>
      <section className="hero">
        <h1>Print: {moduleContent.title}</h1>
        <p>{moduleContent.shortDescription}</p>
      </section>

      <section className="section">
        <h2>Story</h2>
        <ol className="list">
          {moduleContent.storySteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      {moduleContent.slug === "task-room" ? (
        <section className="section">
          <h2>Task Room (v1)</h2>
          <p>Textlicher Teaser ohne Screenshot.</p>
        </section>
      ) : (
        <ScreenshotGallery screenshotIds={moduleContent.screenshots} title="Screenshots / Placeholder" />
      )}
    </article>
  );
}
