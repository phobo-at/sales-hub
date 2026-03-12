import Link from "next/link";

export default function NotFound(): JSX.Element {
  return (
    <section className="section">
      <h1>Seite nicht gefunden</h1>
      <p>Die angeforderte Seite existiert nicht im Demo- und Sales-Hub.</p>
      <p>
        <Link href="/" className="link-inline">
          Zur Startseite
        </Link>
      </p>
    </section>
  );
}
