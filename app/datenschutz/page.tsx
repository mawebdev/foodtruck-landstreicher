import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Datenschutzerklärung",
  description: `Datenschutzerklärung von ${site.legalName} – Foodtruck & Streetfood Catering aus Lichtenfels.`,
  path: "/datenschutz",
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl uppercase">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export default function DatenschutzPage() {
  return (
    <article className="py-16 md:py-24">
      <div className="container-site max-w-3xl">
        <Breadcrumbs items={[{ name: "Datenschutz", path: "/datenschutz" }]} className="mb-12" />

        <h1 className="font-display text-[clamp(3rem,9vw,6rem)] uppercase">Datenschutz</h1>

        <div className="mt-12 space-y-12 leading-relaxed">
          <p>
            Diese Datenschutzerklärung beschreibt, welche Daten wir bei foodtruck-landstreicher.de verarbeiten,
            zu welchem Zweck und auf welcher Rechtsgrundlage. Sie ist an die Technik dieser Website angepasst:
            Diese Website setzt <strong>keine Cookies</strong>, verwendet <strong>keine Analyse- oder
            Tracking-Tools</strong> und lädt <strong>keine Ressourcen von Drittanbietern</strong> (auch keine
            Schriften von Google &ndash; die Schriftarten werden direkt von unserem Server mitgeliefert).
          </p>

          {/* Hosting: Vercel, vom Betreiber bestätigt (Sep. 2026). */}
          <Section title="1. Hosting und externe Dienste">
            <p>
              Wir hosten die Inhalte unserer Website bei Vercel. Anbieter ist die Vercel Inc., 440 N Barranca Ave
              #4133, Covina, CA 91723, USA (nachfolgend Vercel). Wenn Sie unsere Website besuchen, werden
              Server-Logfiles inklusive Ihrer IP-Adresse bei Vercel verarbeitet. Details entnehmen Sie der
              Datenschutzerklärung von Vercel:{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                className="prose-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://vercel.com/legal/privacy-policy
              </a>
              .
            </p>
            <p>
              Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein
              berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website. Die
              Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt; mit
              Vercel besteht ein Vertrag über Auftragsverarbeitung (AVV). Hierbei handelt es sich um einen
              datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass der Anbieter die
              personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der
              DSGVO verarbeitet.
            </p>
          </Section>

          <Section title="2. Verantwortliche Stelle">
            <p>Verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
            <p className="whitespace-pre-line">
              {site.legalName}
              {"\n"}
              {site.address.street}
              {"\n"}
              {site.address.postalCode} {site.address.city}
            </p>
            <p>
              Telefon:{" "}
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="prose-link">
                {site.phoneDisplay}
              </a>
              <br />
              E-Mail:{" "}
              <a href={`mailto:${site.email}`} className="prose-link">
                {site.email}
              </a>
            </p>
            <p>
              Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit
              anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen,
              E-Mail-Adressen o. Ä.) entscheidet.
            </p>
          </Section>

          <Section title="3. Speicherdauer">
            <p>
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde,
              verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt.
              Wenn Sie ein berechtigtes Löschbegehren geltend machen oder eine Einwilligung zur Datenverarbeitung
              widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für
              die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche
              Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
            </p>
          </Section>

          <Section title="4. Rechtsgrundlagen der Datenverarbeitung">
            <p>
              Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen
              Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO. Die Einwilligung ist jederzeit widerrufbar.
              Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich,
              verarbeiten wir Ihre Daten auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten
              wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind, auf
              Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres
              berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Über die jeweils im Einzelfall
              einschlägigen Rechtsgrundlagen wird in den folgenden Absätzen dieser Datenschutzerklärung informiert.
            </p>
          </Section>

          <Section title="5. Hinweis zur Datenweitergabe in die USA">
            <p>
              Für diese Website kommen Dienste von Unternehmen mit Sitz in den USA zum Einsatz: das Hosting
              (Vercel). Wenn diese Dienste aktiv sind, können
              Ihre personenbezogenen Daten in die USA übertragen und dort verarbeitet werden. Wir weisen darauf
              hin, dass in diesen Ländern kein mit der EU vergleichbares Datenschutzniveau garantiert werden
              kann. Es kann daher nicht ausgeschlossen werden, dass US-Behörden (z. B. Geheimdienste) Ihre auf
              US-Servern befindlichen Daten zu Überwachungszwecken verarbeiten, auswerten und dauerhaft
              speichern. Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der
              EU-Kommission gestützt. Wir haben auf diese Verarbeitungstätigkeiten keinen Einfluss.
            </p>
          </Section>

          <Section title="6. Ihre Rechte">
            <p>
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
              gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht auf Berichtigung
              oder Löschung dieser Daten und auf Einschränkung der Verarbeitung. Wenn Sie eine Einwilligung zur
              Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft
              widerrufen. Sie haben ferner das Recht auf Datenübertragbarkeit und ein Beschwerderecht bei der
              zuständigen Aufsichtsbehörde.
            </p>
            <p>
              <strong>Widerspruch gegen die Datenverarbeitung (Art. 21 DSGVO):</strong> Wenn die Datenverarbeitung
              auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, haben Sie jederzeit das Recht, aus
              Gründen, die sich aus Ihrer besonderen Situation ergeben, gegen die Verarbeitung Ihrer
              personenbezogenen Daten Widerspruch einzulegen. Wenn Sie Widerspruch einlegen, werden wir Ihre
              betroffenen personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende
              schutzwürdige Gründe für die Verarbeitung nachweisen. Werden Ihre personenbezogenen Daten
              verarbeitet, um Direktwerbung zu betreiben, haben Sie das Recht, jederzeit Widerspruch gegen die
              Verarbeitung zum Zweck derartiger Werbung einzulegen.
            </p>
            <p>
              <strong>Beschwerderecht bei der zuständigen Aufsichtsbehörde:</strong> Im Falle von Verstößen gegen
              die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde zu, insbesondere in
              dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen
              Verstoßes.
            </p>
            <p>
              Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden
              (Kontaktdaten siehe Abschnitt 2).
            </p>
          </Section>

          <Section title="7. SSL- bzw. TLS-Verschlüsselung">
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie
              zum Beispiel Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw.
              TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des
              Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
            </p>
          </Section>

          <Section title="8. Cookies">
            <p>
              Diese Website setzt keine Cookies – weder technisch notwendige noch Cookies zu Analyse- oder
              Marketingzwecken. Es findet keine Einwilligungsabfrage statt, weil keine Einwilligung nötig ist.
              Auch auf Ihrem Endgerät gespeicherte Wiedererkennungstechnologien (z. B. Device-Fingerprinting)
              verwenden wir nicht.
            </p>
          </Section>

          <Section title="9. Server-Log-Dateien">
            <p>
              Der Provider der Seiten erhebt und speichert automatisch Informationen in Server-Log-Dateien, die
              Ihr Browser automatisch an uns übermittelt. Dies sind:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Browsertyp und Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer-URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p>
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung
              dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein
              berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website
              – hierzu müssen die Server-Log-Files erfasst werden.
            </p>
          </Section>

          <Section title="10. Buchungsformular">
            <p>
              Wenn Sie uns über unser Buchungsformular eine Anfrage zukommen lassen, werden Ihre Angaben aus dem
              Formular (Datum, Veranstaltungsort, Anzahl der Personen, Art der Veranstaltung, ggf. weitere
              Informationen) inklusive der von Ihnen dort angegebenen Kontaktdaten (Name, E-Mail-Adresse, ggf.
              Telefonnummer) zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns
              gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p>
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre
              Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher
              Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem
              berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen
              (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
            <p>
              <strong>Versand der Anfrage-E-Mail:</strong> Die Inhalte Ihrer Anfrage werden per E-Mail über
              unseren E-Mail-Server (SMTP) an uns übermittelt und dort zugestellt.
              {/* TODO: Betreiber – E-Mail-Anbieter/Hoster nennen, falls in der DSGVO-Erklärung angegeben werden soll. */}
              Zur Absicherung des Formulars gegen automatisierte Spam-Einträge verwenden wir ein unsichtbares
              Feld, das nur von Spam-Bots ausgefüllt wird (ein sogenanntes Honeypot). Dabei werden keine Daten
              an Dritte übermittelt und es findet keine Verhaltensanalyse statt.
            </p>
            <p>
              Die von Ihnen im Formular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung
              auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung
              entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen
              – insbesondere Aufbewahrungsfristen – bleiben unberührt.
            </p>
          </Section>

          <Section title="11. Anfrage per E-Mail oder Telefon">
            <p>
              Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus
              hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens
              bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p>
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre
              Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher
              Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem
              berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen
              (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </Section>

          <Section title="12. Schriftarten">
            <p>
              Diese Seite verwendet Schriftarten, die lokal auf unserem Server liegen und über unsere eigene
              Domain ausgeliefert werden. Es findet keine Verbindung zu Schriftservern von Drittanbietern (z. B.
              Google Fonts) statt; Ihre IP-Adresse wird zu diesem Zweck nicht an Dritte übermittelt.
            </p>
          </Section>

          <Section title="13. Widerspruch gegen Werbe-E-Mails">
            <p>
              Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von
              nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen.
              Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten
              Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.
            </p>
          </Section>
        </div>
      </div>
    </article>
  );
}