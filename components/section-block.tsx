interface SectionBlockProps {
  title: string;
  children?: React.ReactNode;
  id?: string;
  eyebrow?: string;
  description?: string;
  variant?: "default" | "soft" | "accent" | "minimal";
}

export function SectionBlock({
  title,
  children,
  id,
  eyebrow,
  description,
  variant = "default"
}: SectionBlockProps): JSX.Element {
  return (
    <section className={`section section--${variant}`} id={id}>
      <div className="section__header">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      <div className="section__content">{children}</div>
    </section>
  );
}
