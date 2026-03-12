interface SectionBlockProps {
  title: string;
  children: React.ReactNode;
  id?: string;
}

export function SectionBlock({ title, children, id }: SectionBlockProps): JSX.Element {
  return (
    <section className="section" id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
