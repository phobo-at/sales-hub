type WhistleblowingMarketingScreenVariant = "inbox" | "case-detail-ai" | "summary-ai";

interface WhistleblowingMarketingScreenProps {
  variant: WhistleblowingMarketingScreenVariant;
}

const INBOX_ROWS = [
  {
    caseId: "WB-2026-0147",
    title: "Verdacht auf Umgehung der Freigabekette",
    priority: "Hoch",
    status: "In Triage",
    owner: "Compliance Office"
  },
  {
    caseId: "WB-2026-0142",
    title: "Hinweis auf Interessenkonflikt im Einkauf",
    priority: "Mittel",
    status: "Review laeuft",
    owner: "Legal"
  },
  {
    caseId: "WB-2026-0139",
    title: "Unvollstaendige Dokumentation externer Zahlungen",
    priority: "Mittel",
    status: "Nachweise angefordert",
    owner: "Finance Control"
  },
  {
    caseId: "WB-2026-0131",
    title: "Hinweis abgeschlossen, Monitoring aktiv",
    priority: "Niedrig",
    status: "Abgeschlossen",
    owner: "Internal Audit"
  }
];

const CASE_TIMELINE = [
  "Hinweis ueber gesicherten Kanal eingegangen (08:12).",
  "Erstklassifizierung durch Triage-Team abgeschlossen (09:05).",
  "Beteiligte Geschaeftseinheit informiert, Datenraum geoeffnet (09:42).",
  "KI-Einordnung und Risiko-Hinweise bereitgestellt (10:03)."
];

const SUMMARY_BULLETS = [
  "Der Hinweis bezieht sich auf wiederholte Umgehungen des Vier-Augen-Prinzips in drei Freigabevorgaengen.",
  "Dokumentierte Entscheidungen weichen in zwei Faellen von den hinterlegten Beschaffungsrichtlinien ab.",
  "Risikofaktor: Erhoehte Reputations- und Kontrollrisiken bei externen Partnerbeziehungen.",
  "Empfohlene naechste Schritte: Sofortige Stichprobenpruefung, Rollenabgleich und Management-Briefing."
];

function renderVariantBody(variant: WhistleblowingMarketingScreenVariant): JSX.Element {
  if (variant === "inbox") {
    return (
      <div className="wb-screen">
        <div className="wb-screen__kpis">
          <article className="wb-kpi">
            <span>Offene Hinweise</span>
            <strong>27</strong>
          </article>
          <article className="wb-kpi">
            <span>Hochprioritaet</span>
            <strong>6</strong>
          </article>
          <article className="wb-kpi">
            <span>SLA im Ziel</span>
            <strong>94%</strong>
          </article>
        </div>

        <section className="wb-panel">
          <h2>Inbox Uebersicht</h2>
          <table className="wb-table">
            <thead>
              <tr>
                <th>Case</th>
                <th>Hinweis</th>
                <th>Prioritaet</th>
                <th>Status</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {INBOX_ROWS.map((row) => (
                <tr key={row.caseId}>
                  <td>{row.caseId}</td>
                  <td>{row.title}</td>
                  <td>{row.priority}</td>
                  <td>{row.status}</td>
                  <td>{row.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    );
  }

  if (variant === "case-detail-ai") {
    return (
      <div className="wb-screen wb-screen--detail">
        <section className="wb-panel">
          <h2>Case WB-2026-0147</h2>
          <p>Verdacht auf Umgehung der Freigabekette in mehreren Beschaffungsvorgaengen.</p>
          <ol className="wb-list">
            {CASE_TIMELINE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <div className="wb-tags">
            <span>Owner: Compliance Office</span>
            <span>Status: In Bearbeitung</span>
            <span>Naechster Review: Heute 15:30</span>
          </div>
        </section>

        <aside className="wb-panel wb-panel--ai">
          <h2>KI-Einordnung</h2>
          <p>
            Muster entspricht bekannten Konstellationen mit erhoehter Kontrollluecke in der
            Genehmigungskette.
          </p>
          <div className="wb-score">
            <span>Risikoscore</span>
            <strong>82 / 100</strong>
          </div>
          <ul className="wb-list">
            <li>Cluster: Freigabeumgehung</li>
            <li>Betroffene Richtlinien: Procurement Policy, Delegation Matrix</li>
            <li>Empfehlung: Eskalation an Legal + Einkaufsleitung</li>
          </ul>
        </aside>
      </div>
    );
  }

  return (
    <div className="wb-screen">
      <section className="wb-panel">
        <h2>KI-Zusammenfassung fuer das Fallteam</h2>
        <p>
          Die Zusammenfassung strukturiert Eingangshinweis, Verifikation und empfohlene
          Folgeschritte in einer belastbaren Entscheidungsgrundlage.
        </p>
        <ul className="wb-list">
          {SUMMARY_BULLETS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="wb-panel wb-panel--summary">
        <h2>Arbeitsstand</h2>
        <div className="wb-summary-grid">
          <article>
            <span>Bearbeitungsstatus</span>
            <strong>Aktiv</strong>
          </article>
          <article>
            <span>Dokumentationsgrad</span>
            <strong>Vollstaendig</strong>
          </article>
          <article>
            <span>Empfohlene Prioritaet</span>
            <strong>Hoch</strong>
          </article>
        </div>
      </section>
    </div>
  );
}

export function WhistleblowingMarketingScreen({
  variant
}: WhistleblowingMarketingScreenProps): JSX.Element {
  return (
    <section className="marketing-shot">
      <div className="marketing-shot__frame" data-testid="screen-ready">
        <header className="marketing-shot__header">
          <div>
            <strong>.LOUPE Whistleblowing</strong>
            <span> Sales Capture View</span>
          </div>
          <div>Demo-Datenstand: 12.03.2026</div>
        </header>
        <div className="marketing-shot__canvas" data-testid="screen-canvas">
          {renderVariantBody(variant)}
        </div>
      </div>
    </section>
  );
}
