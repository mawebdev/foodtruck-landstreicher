import type { ImageKey } from "./images";
import type { Faq } from "./faq";

/**
 * Einsatzgebiete – Liste von der alten Website übernommen.
 * Frankfurt und München (tauchten in alten FAQ-Texten auf) wurden bewusst
 * entfernt, weil sie der Positionierung Lichtenfels/Franken widersprechen.
 * TODO: Betreiber bestätigen, dass die Liste so stimmt und ob es einen
 *       maximalen Radius gibt (alte Seite: „150 km“, aber mal ab Nürnberg,
 *       mal ohne Bezugspunkt).
 *
 * Koordinaten = Stadtmitte (öffentliche Geodaten), nur für die Kartengrafik
 * und die Luftlinien-Angabe auf den Standortseiten.
 */

export type Region = "Franken" | "Oberpfalz" | "Thüringen";

export type ServiceArea = {
  name: string;
  region: Region;
  lat: number;
  lon: number;
  /** Nur gesetzt, wenn es eine eigene, inhaltlich eigenständige Seite gibt */
  slug?: string;
  home?: boolean;
};

export const serviceAreas: ServiceArea[] = [
  { name: "Lichtenfels", region: "Franken", lat: 50.145, lon: 11.063, home: true },
  { name: "Bamberg", region: "Franken", lat: 49.891, lon: 10.886, slug: "foodtruck-bamberg" },
  { name: "Coburg", region: "Franken", lat: 50.258, lon: 10.964, slug: "foodtruck-coburg" },
  { name: "Kronach", region: "Franken", lat: 50.241, lon: 11.328 },
  { name: "Kulmbach", region: "Franken", lat: 50.101, lon: 11.453 },
  { name: "Bayreuth", region: "Franken", lat: 49.948, lon: 11.578, slug: "foodtruck-bayreuth" },
  { name: "Nürnberg", region: "Franken", lat: 49.452, lon: 11.077, slug: "foodtruck-nuernberg" },
  { name: "Erlangen", region: "Franken", lat: 49.59, lon: 11.004 },
  { name: "Fürth", region: "Franken", lat: 49.477, lon: 10.989 },
  { name: "Würzburg", region: "Franken", lat: 49.792, lon: 9.953 },
  { name: "Schweinfurt", region: "Franken", lat: 50.049, lon: 10.221 },
  { name: "Hof", region: "Franken", lat: 50.313, lon: 11.912 },
  { name: "Kitzingen", region: "Franken", lat: 49.737, lon: 10.16 },
  { name: "Rothenburg ob der Tauber", region: "Franken", lat: 49.377, lon: 10.179 },
  { name: "Regensburg", region: "Oberpfalz", lat: 49.013, lon: 12.102 },
  { name: "Weiden i. d. OPf.", region: "Oberpfalz", lat: 49.677, lon: 12.156 },
  { name: "Amberg", region: "Oberpfalz", lat: 49.445, lon: 11.858 },
  { name: "Neumarkt i. d. OPf.", region: "Oberpfalz", lat: 49.28, lon: 11.46 },
  { name: "Lauscha", region: "Thüringen", lat: 50.476, lon: 11.16 },
  { name: "Sonneberg", region: "Thüringen", lat: 50.359, lon: 11.174 },
  { name: "Saalfeld", region: "Thüringen", lat: 50.648, lon: 11.366 },
  { name: "Suhl", region: "Thüringen", lat: 50.609, lon: 10.694 },
  { name: "Meiningen", region: "Thüringen", lat: 50.568, lon: 10.415 },
  { name: "Ilmenau", region: "Thüringen", lat: 50.684, lon: 10.919 },
];

export const regionTexts: Record<Region, string> = {
  Franken:
    "Hier sind wir zu Hause. Von Lichtenfels aus sind Bamberg, Coburg, Kronach und Kulmbach kurze Wege, Bayreuth und der Großraum Nürnberg liegen gut erreichbar in der Nähe. Auch Unterfranken mit Würzburg und Schweinfurt steht auf unserer Liste.",
  Oberpfalz:
    "Regensburg, Amberg, Weiden und Neumarkt gehören zu unseren Einsatzgebieten. Die Wege sind länger – deshalb planen wir solche Termine mit etwas mehr Vorlauf und klären die Anfahrt direkt im Angebot.",
  Thüringen:
    "Über die Landesgrenze ist es von Lichtenfels nicht weit. Sonneberg, Lauscha, Saalfeld, Suhl, Meiningen und Ilmenau fahren wir ebenfalls an.",
};

/* ------------------------------------------------------------------
   Standortseiten
   Nur Orte, bei denen sich echter, eigenständiger Inhalt schreiben lässt:
   - Bamberg & Coburg: direkte Nachbarschaft, häufigste Einsatzorte laut alter Seite
   - Bayreuth: Oberfranken, inkl. Kulmbach
   - Nürnberg: größter Markt, inkl. Erlangen/Fürth, andere Planung (Anfahrt)
   Regensburg, Würzburg etc. bekommen bewusst KEINE eigene Seite – es gibt
   keine belegbaren ortsbezogenen Inhalte, das wären Doorway Pages.
   ------------------------------------------------------------------ */

export type LocationPage = {
  slug: string;
  city: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  image: ImageKey;
  imageSecondary: ImageKey;
  /** Abschnitt „Einsatz in …“ */
  intro: { heading: string; paragraphs: string[] };
  /** typische Situationen – ortsbezogen formuliert */
  occasions: { title: string; text: string }[];
  /** Praktisches: Anfahrt, Planung */
  practical: { heading: string; paragraphs: string[] };
  nearby: string[];
  faq: Faq[];
};

export const locationPages: LocationPage[] = [
  {
    slug: "foodtruck-bamberg",
    city: "Bamberg",
    metaTitle: "Foodtruck in Bamberg mieten | Der Landstreicher",
    metaDescription:
      "Foodtruck-Catering in Bamberg und im Landkreis: Burger, BBQ aus dem Smoker und hausgemachte Pommes für Hochzeiten, Firmenfeiern und Feste. Aus dem Nachbarlandkreis Lichtenfels.",
    h1: "Foodtruck in Bamberg für Hochzeiten, Firmenfeiern & Feste",
    lead: "Bamberg liegt praktisch vor unserer Haustür. Für uns heißt das: kurze Anfahrt, entspannte Planung und mehr Zeit für das, worum es eigentlich geht – gutes Essen für eure Gäste.",
    image: "eventTafel",
    imageSecondary: "burgerHero",
    intro: {
      heading: "Von Lichtenfels nach Bamberg ist es nicht weit",
      paragraphs: [
        "Wir sind im Nachbarlandkreis zu Hause. Wenn wir in Bamberg oder im Landkreis kochen, ist der Truck schnell vor Ort und in Ruhe aufgebaut, bevor die ersten Gäste kommen.",
        "Das hilft vor allem bei Veranstaltungen, die nicht um 12 Uhr mittags anfangen: Hochzeiten, die sich bis in den Abend ziehen, oder Firmenfeiern nach Feierabend.",
      ],
    },
    occasions: [
      {
        title: "Hochzeit auf dem Land",
        text: "Rund um Bamberg wird viel in Scheunen, Höfen und Gasthöfen im Landkreis gefeiert. Dort gibt es oft keine Profiküche – und genau da passt ein Truck, der mit einer normalen Steckdose auskommt.",
      },
      {
        title: "Firmen- & Sommerfest",
        text: "Auf dem Firmenparkplatz, im Innenhof oder auf der Wiese hinterm Gebäude: Wir brauchen einen festen Stellplatz, den Rest bringen wir mit.",
      },
      {
        title: "Geburtstag & Gartenparty",
        text: "Für private Feiern stellen wir die Karte passend zur Gästezahl zusammen – vom Burger bis zum Kaiserschmarrn.",
      },
    ],
    practical: {
      heading: "Was ihr für Bamberg wissen solltet",
      paragraphs: [
        "In der Bamberger Innenstadt ist Platz knapp. Wenn eure Feier in der Altstadt stattfindet, klären wir vorab gemeinsam, wo der Truck stehen kann. Auf Flächen, die euch nicht selbst gehören, braucht es dafür in der Regel eine Erlaubnis des Eigentümers oder der Stadt.",
        "Bei Locations im Landkreis ist das meistens einfacher: Hof, Wiese oder Parkplatz – Hauptsache fest genug für den Truck. Der Platzbedarf liegt bei rund 7,5 × 2,5 m.",
      ],
    },
    nearby: ["Hallstadt", "Hirschaid", "Scheßlitz", "Memmelsdorf", "Forchheim"],
    faq: [
      {
        q: "Kommt ihr auch in den Landkreis Bamberg?",
        a: [
          "Ja. Der Landkreis Bamberg grenzt direkt an unseren Heimatlandkreis Lichtenfels – für uns ist das Nahbereich.",
        ],
      },
      {
        q: "Kann der Truck in der Bamberger Altstadt stehen?",
        a: [
          "Das hängt vom konkreten Ort ab. Auf privatem Grund mit Zufahrt ist das kein Problem. Auf öffentlichen Flächen braucht es eine Genehmigung – das klären wir gemeinsam, bevor wir zusagen.",
        ],
      },
    ],
  },
  {
    slug: "foodtruck-coburg",
    city: "Coburg",
    metaTitle: "Foodtruck in Coburg mieten | Der Landstreicher",
    metaDescription:
      "Der Landstreicher kommt mit dem Foodtruck nach Coburg und ins Coburger Land: frische Burger, BBQ aus dem Smoker und Streetfood für Hochzeiten, Firmenfeiern und Vereinsfeste.",
    h1: "Foodtruck in Coburg für Hochzeiten, Firmenfeiern & Vereinsfeste",
    lead: "Coburg ist von Lichtenfels aus die nächste größere Stadt. Wer hier feiert, hat den Landstreicher sozusagen in Rufweite.",
    image: "truckSeite",
    imageSecondary: "kochDreiBurger",
    intro: {
      heading: "Das Coburger Land ist Nahbereich",
      paragraphs: [
        "Zwischen Lichtenfels und Coburg liegen nur ein paar Kilometer. Für euch bedeutet das: unkomplizierte Planung, und der Truck ist rechtzeitig vor Ort, auch wenn der Tag lang wird.",
        "Vom Coburger Land ist es außerdem nicht weit nach Südthüringen – Sonneberg und Lauscha fahren wir ebenfalls an.",
      ],
    },
    occasions: [
      {
        title: "Vereinsfest & Jubiläum",
        text: "Im Coburger Land haben Vereine Tradition. Wir übernehmen die Küche, damit die Mitglieder beim eigenen Fest nicht die ganze Zeit hinterm Grill stehen.",
      },
      {
        title: "Firmenfeier",
        text: "Sommerfest, Weihnachtsfeier im Hof, Mitarbeiterfest: Der Truck stellt sich aufs Gelände und kocht, ohne dass ihr Strom oder Wasser bereitstellen müsst.",
      },
      {
        title: "Hochzeit",
        text: "Ob Trauung in der Stadt und Feier auf dem Land oder alles an einem Ort: Wir kommen dorthin, wo gegessen wird.",
      },
    ],
    practical: {
      heading: "Praktisch für Coburg",
      paragraphs: [
        "Wegen der kurzen Anfahrt lassen sich in Coburg auch Termine gut umsetzen, die kurzfristiger zustande kommen – sofern der Tag noch frei ist. Und grundsätzlich gilt: Mit drei Trucks sind wir flexibel, eine kurzfristige Anfrage lohnt sich also immer.",
      ],
    },
    nearby: ["Rödental", "Neustadt bei Coburg", "Bad Rodach", "Sonneberg", "Ebersdorf"],
    faq: [
      {
        q: "Fahrt ihr von Coburg aus auch nach Thüringen?",
        a: [
          "Ja. Sonneberg, Lauscha, Suhl, Meiningen, Saalfeld und Ilmenau gehören ebenfalls zu unseren Einsatzgebieten.",
        ],
      },
      {
        q: "Wie kurzfristig kann ich in Coburg anfragen?",
        a: [
          "Auch kurzfristig lohnt sich die Anfrage: Mit drei Trucks sind wir flexibel. Entscheidend ist, ob euer Termin noch frei ist – die kurze Anfahrt macht Coburg da besonders einfach.",
        ],
      },
    ],
  },
  {
    slug: "foodtruck-bayreuth",
    city: "Bayreuth",
    metaTitle: "Foodtruck in Bayreuth mieten | Der Landstreicher",
    metaDescription:
      "Foodtruck-Catering in Bayreuth, Kulmbach und Umgebung: Burger, Pulled Pork und BBQ aus dem Smoker, frisch vor Ort zubereitet. Für Hochzeiten, Firmenfeiern und private Feste.",
    h1: "Foodtruck in Bayreuth & Kulmbach für Hochzeiten, Firmenfeiern & Feste",
    lead: "Bayreuth, Kulmbach und die Fränkische Schweiz – Oberfranken ist unser Revier. Wir bringen Burger und BBQ aus dem Smoker direkt zu eurer Feier.",
    image: "truckFront",
    imageSecondary: "teamPommes",
    intro: {
      heading: "Oberfranken, einmal quer rüber",
      paragraphs: [
        "Von Lichtenfels geht es über Kulmbach nach Bayreuth. Beide Städte fahren wir regelmäßig an – und alles dazwischen auch.",
        "Gerade bei größeren Feiern spielt der Smoker seine Stärke aus: Brisket, Pulled Pork und Ribs bereiten wir über viele Stunden vor und servieren sie vor Ort.",
      ],
    },
    occasions: [
      {
        title: "BBQ für größere Runden",
        text: "Pulled Pork, Pulled Beef oder Brisket lassen sich gut für viele Gäste portionieren. Dazu Coleslaw und hausgemachte Pommes – fertig ist ein Menü, das auch bei langen Feiern trägt.",
      },
      {
        title: "Firmenfeier & Teamevent",
        text: "Ob Unternehmen in der Stadt oder Betrieb im Umland: Der Truck braucht keinen Anschluss und steht dort, wo eure Leute feiern.",
      },
      {
        title: "Hochzeit & Geburtstag",
        text: "Für private Feste stellen wir die Karte individuell zusammen – mit vegetarischer Alternative, damit niemand nur Beilagen isst.",
      },
    ],
    practical: {
      heading: "Planung für Bayreuth",
      paragraphs: [
        "Im Sommer ist in Bayreuth viel los. Wenn euer Termin in die Hauptsaison fällt, lohnt sich eine frühe Anfrage – besonders für Samstage.",
        "Wenn BBQ aus dem Smoker auf die Karte soll, braucht das Vorlauf: Brisket gart bis zu 14 Stunden. Sagt uns deshalb möglichst früh, was ihr euch vorstellt.",
      ],
    },
    nearby: ["Kulmbach", "Pegnitz", "Hollfeld", "Thurnau", "Bindlach"],
    faq: [
      {
        q: "Kommt ihr auch nach Kulmbach?",
        a: ["Ja, Kulmbach liegt zwischen Lichtenfels und Bayreuth und gehört fest zu unseren Einsatzgebieten."],
      },
      {
        q: "Können wir BBQ aus dem Smoker für die ganze Gesellschaft bekommen?",
        a: [
          "Ja. Pulled Pork, Pulled Beef, Brisket, Spareribs und mehr kommen aus dem US-Smoker. Weil das viele Stunden dauert, planen wir BBQ-Menüs mit Vorlauf.",
        ],
      },
    ],
  },
  {
    slug: "foodtruck-nuernberg",
    city: "Nürnberg",
    metaTitle: "Foodtruck in Nürnberg mieten | Der Landstreicher",
    metaDescription:
      "Foodtruck-Catering in Nürnberg, Erlangen und Fürth: Burger, BBQ aus dem Smoker und hausgemachte Pommes für Firmenfeiern, Hochzeiten und Events. Autark – eine normale Steckdose genügt.",
    h1: "Foodtruck in Nürnberg für Hochzeiten, Firmenfeiern & Events",
    lead: "Nürnberg, Erlangen, Fürth: Die Metropolregion ist für uns kein Nahbereich, aber ein Ziel, das wir regelmäßig anfahren. Mit der richtigen Planung steht der Truck pünktlich da, wo ihr feiert.",
    image: "burgerDurchreiche",
    imageSecondary: "truckFront",
    intro: {
      heading: "Einsatz im Großraum Nürnberg",
      paragraphs: [
        "Wir kommen aus Lichtenfels, also aus dem Norden. Für Termine in Nürnberg, Erlangen oder Fürth rechnen wir die Anfahrt deshalb von Anfang an mit ein – im Zeitplan und im Angebot.",
        "Dafür bekommt ihr einen Truck, der autark arbeitet – alles Nötige ist an Bord, eine normale Steckdose genügt. Gerade auf Firmengeländen, in Innenhöfen oder bei Events ohne feste Infrastruktur ist das ein Vorteil.",
      ],
    },
    occasions: [
      {
        title: "Firmenfeier & Sommerfest",
        text: "In der Metropolregion ist die Firmenfeier der häufigste Anlass für einen Foodtruck: auf dem Parkplatz, im Hof oder vor der Halle. Die Gäste holen sich ihr Essen frisch, statt am Buffet zu warten.",
      },
      {
        title: "Hochzeit im Umland",
        text: "Viele Nürnberger Paare feiern draußen im Umland – im Knoblauchsland, im Nürnberger Land oder Richtung Fränkische Schweiz. Wir kommen mit, egal ob mit oder ohne Küche vor Ort.",
      },
      {
        title: "Events & Märkte",
        text: "Bei öffentlichen Veranstaltungen stehen wir als Streetfood-Stand mit Burgern und Pommes auf die Hand.",
      },
    ],
    practical: {
      heading: "Was bei Nürnberg anders ist",
      paragraphs: [
        "Durch die längere Anfahrt ist eine frühe Anfrage hier doppelt sinnvoll: Wir können den Tag besser planen, und ihr habt früh Klarheit über die Kosten inklusive Anfahrtspauschale.",
        "Wichtig für die Innenstadt: Klärt vorab, ob Zufahrt und Stellplatz für einen Foodtruck möglich sind. Auf öffentlichem Grund braucht es in der Regel eine Genehmigung.",
      ],
      // TODO: Betreiber bestätigen, wie die Anfahrtspauschale für Nürnberg berechnet wird.
    },
    nearby: ["Erlangen", "Fürth", "Schwabach", "Lauf an der Pegnitz", "Forchheim"],
    faq: [
      {
        q: "Kommt ihr auch nach Erlangen und Fürth?",
        a: ["Ja, Erlangen und Fürth gehören genauso zu unseren Einsatzgebieten wie Nürnberg selbst."],
      },
      {
        q: "Kostet die Anfahrt nach Nürnberg extra?",
        a: [
          "Zum Angebot kommt eine Anfahrtspauschale hinzu. Wie hoch sie ist, steht transparent im individuellen Angebot.",
        ],
      },
    ],
  },
];

export function getLocationPage(slug: string) {
  const page = locationPages.find((p) => p.slug === slug);
  if (!page) throw new Error(`Unknown location page: ${slug}`);
  return page;
}

/** Luftlinie in km (Haversine), gerundet auf 5 km */
export function distanceFromHome(city: string) {
  const home = serviceAreas.find((a) => a.home)!;
  const target = serviceAreas.find((a) => a.name === city);
  if (!target) return null;
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(target.lat - home.lat);
  const dLon = toRad(target.lon - home.lon);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(home.lat)) * Math.cos(toRad(target.lat)) * Math.sin(dLon / 2) ** 2;
  const km = 2 * R * Math.asin(Math.sqrt(a));
  return Math.max(5, Math.round(km / 5) * 5);
}
