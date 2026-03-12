export default function KontaktPage(): JSX.Element {
  return (
    <section className="section">
      <h1>Kontakt und Demo-Anfrage</h1>
      <p>
        Bitte hinterlege in der Umgebung `LOUPE_CTA_URL`, um auf den produktiven Kontaktkanal
        zu verlinken. Diese Fallback-Seite stellt sicher, dass der Hub ohne harte externe
        Abhaengigkeit lauffaehig bleibt.
      </p>
    </section>
  );
}
