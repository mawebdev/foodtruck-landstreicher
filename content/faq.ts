/**
 * FAQ-Inhalte. Regel: Der erste Satz beantwortet die Frage direkt.
 * Alles, was nicht belegt ist, steht als TODO im Code – nicht im Text.
 */

export type Faq = { q: string; a: string[] };

export const generalFaq: Faq[] = [
  {
    q: "Wie kann ich den Foodtruck buchen?",
    a: [
      "Am einfachsten über unsere Buchungsanfrage. Wir brauchen zunächst Datum, Veranstaltungsort und die ungefähre Gästezahl. Danach bekommt ihr eine Rückmeldung zu Verfügbarkeit und Kosten, und wir besprechen gemeinsam Menü und Ablauf.",
      "Verbindlich wird es erst, wenn alle Fragen geklärt sind und ihr den Termin bestätigt.",
    ],
  },
  {
    q: "Für welche Veranstaltungen kann ich den Landstreicher buchen?",
    a: [
      "Für Hochzeiten, Firmenfeiern, Geburtstage, Vereinsfeste, Stadt- und Straßenfeste, Märkte und Festivals. Auch Polterabende, Jubiläen, Gartenpartys oder Eröffnungen sind möglich.",
    ],
  },
  {
    q: "Welche Speisen bietet der Landstreicher an?",
    a: [
      "Burger mit 180 g Rindfleisch in vielen Varianten, BBQ aus dem US-Smoker wie Texas Brisket, Pulled Pork oder Spareribs, dazu hausgemachte, handgeschnittene Pommes, Bowls und Desserts wie Kaiserschmarrn. Die komplette Auswahl steht auf unserer Speisekarte.",
    ],
  },
  {
    q: "Gibt es vegetarische Optionen?",
    a: [
      "Ja. Es gibt einen vegetarischen Burger mit 150 g Patty auf Weizenprotein-Basis, getrockneten Tomaten, Heumilchkäse und Rauke. Bowls lassen sich vegetarisch zusammenstellen, und auch Pommes, Süßkartoffel-Pommes und die Desserts sind fleischlos.",
      // TODO: Betreiber fragen, welche Gerichte vegan möglich sind – dann hier ergänzen.
    ],
  },
  {
    q: "Kann das Menü individuell zusammengestellt werden?",
    a: [
      "Ja, das ist sogar der Normalfall. Menüs und Preise stellen wir individuell passend zu eurem Event zusammen – von Burgern über BBQ bis zu Vorspeisen und Dessert. Aus unserer Speisekarte könnt ihr genau die Gerichte kombinieren, die zu euch und euren Gästen passen.",
    ],
  },
  {
    q: "Wie viele Personen könnt ihr versorgen?",
    a: [
      "Bis zu 600 Portionen Burger und Pommes pro Stunde sind drin. Wie viele Gäste sich daraus ergeben, hängt vom Menü und vom zeitlichen Ablauf ab. Schreibt uns in der Anfrage die geplante Gästezahl – wir sagen euch ehrlich, was in welchem Zeitraum machbar ist.",
    ],
  },
  {
    q: "Braucht der Foodtruck Strom oder Wasser vor Ort?",
    a: [
      "Für die Dunstabzugshaube genügt eine normale Steckdose – alles andere ist an Bord. Mehr braucht es vor Ort nicht.",
      "An Platz braucht der Truck rund 7,5 × 2,5 m auf einem festen, befahrbaren Untergrund. Das macht uns auf Wiesen, Höfen oder Parkplätzen flexibel.",
    ],
  },
  {
    q: "Gibt es einen Mindestumsatz?",
    a: [
      "Pauschal lässt sich der nicht sagen: Der Mindestumsatz hängt vom Einsatzort und vom Aufwand ab. Schickt uns eure Anfrage – im Angebot steht er euch verbindlich genannt.",
    ],
  },
  {
    q: "In welchen Regionen seid ihr unterwegs?",
    a: [
      "Unser Truck startet in Burgkunstadt im Landkreis Lichtenfels und ist in Franken, der Oberpfalz und Teilen Thüringens unterwegs – regelmäßig zum Beispiel in Bamberg, Coburg, Kronach, Bayreuth und Nürnberg.",
    ],
  },
  {
    q: "Wie früh sollte ich anfragen?",
    a: [
      "So früh wie möglich, besonders für Samstage in der Hochzeits- und Sommerfestsaison. Aber auch kurzfristige Anfragen lohnen sich: Mit drei Trucks sind wir flexibel – fragt einfach an, auch wenn es knapp scheint.",
    ],
  },
];

export const weddingFaq: Faq[] = [
  {
    q: "Wie kann ich den Landstreicher für meine Hochzeit buchen?",
    a: [
      "Am einfachsten über unsere Buchungsanfrage. Dort brauchen wir zunächst Datum, Veranstaltungsort und die ungefähr geplante Gästezahl. Danach besprechen wir gemeinsam, welches Menü zu eurer Hochzeit passt und wie der Ablauf vor Ort aussehen kann.",
    ],
  },
  {
    q: "Was passiert mit vegetarischen Gästen?",
    a: [
      "Die bekommen etwas Richtiges und nicht nur Beilagen: den Veggie-Burger mit Weizenprotein-Patty, Heumilchkäse, getrockneten Tomaten und Rauke. Sagt uns vorab ungefähr, wie viele Gäste vegetarisch essen, dann planen wir entsprechend.",
    ],
  },
  {
    q: "Brauchen wir am Veranstaltungsort Strom oder Wasser?",
    a: [
      "Eine normale Steckdose für die Dunstabzugshaube genügt – alles andere ist an Bord. Das ist bei Scheunen, Gutshöfen oder Gärten oft ein echter Vorteil.",
    ],
  },
  {
    q: "Können wir das Essen auch als Buffet bekommen?",
    a: [
      "Ja, viele Gerichte lassen sich auch als Buffet umsetzen. Was besser zu eurem Ablauf passt, besprechen wir gemeinsam.",
      // TODO: Betreiber bestätigen, dass Buffet-Catering weiterhin angeboten wird (stand auf der alten Speisekarten-Seite).
    ],
  },
  {
    q: "Was passiert bei schlechtem Wetter?",
    a: [
      "Gekocht wird im Truck, das Wetter spielt dafür keine Rolle. Für die Gäste braucht es nur einen überdachten Bereich in der Nähe der Ausgabe.",
      // TODO: Betreiber bestätigen, ob es darüber hinaus Regelungen gibt (z. B. Pavillon, Umzug in die Halle).
    ],
  },
];

export const companyFaq: Faq[] = [
  {
    q: "Könnt ihr auch auf dem Firmengelände stehen?",
    a: [
      "Ja. Weil der Truck mit einer normalen Steckdose auskommt, reicht in der Regel ein fester, befahrbarer Platz – Parkplatz, Hof oder Wiese. Der Truck misst rund 7,5 × 2,5 m.",
    ],
  },
  {
    q: "Wie läuft die Essensausgabe bei vielen Gästen?",
    a: [
      "Zügig: Bis zu 600 Portionen Burger und Pommes pro Stunde sind drin. Bei größeren Gruppen stimmen wir zusätzlich Menü und Ablauf ab – etwa mit einer kleineren Auswahl an Burgern oder BBQ, das sich schnell portionieren lässt. Genaues klären wir, sobald wir Gästezahl und Zeitfenster kennen.",
    ],
  },
  {
    q: "Bekommen wir ein Angebot mit Rechnung für die Firma?",
    a: [
      "Ja. Nach eurer Anfrage erhaltet ihr ein individuelles Angebot mit allen Kosten.",
      // TODO: Betreiber bestätigen (Rechnung auf Firma, Zahlungsbedingungen).
    ],
  },
  {
    q: "Gibt es einen Mindestumsatz?",
    a: [
      "Pauschal lässt sich der nicht sagen: Der Mindestumsatz hängt vom Einsatzort und vom Aufwand ab. In eurem Angebot steht er verbindlich – zusammengesetzt aus Speisen und Getränken.",
    ],
  },
];
