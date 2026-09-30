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
  { name: "Kronach", region: "Franken", lat: 50.241, lon: 11.328, slug: "foodtruck-kronach" },
  { name: "Kulmbach", region: "Franken", lat: 50.101, lon: 11.453, slug: "foodtruck-kulmbach" },
  { name: "Bayreuth", region: "Franken", lat: 49.948, lon: 11.578, slug: "foodtruck-bayreuth" },
  { name: "Nürnberg", region: "Franken", lat: 49.452, lon: 11.077, slug: "foodtruck-nuernberg" },
  { name: "Erlangen", region: "Franken", lat: 49.59, lon: 11.004 },
  { name: "Fürth", region: "Franken", lat: 49.477, lon: 10.989 },
  { name: "Würzburg", region: "Franken", lat: 49.792, lon: 9.953, slug: "foodtruck-wuerzburg" },
  { name: "Schweinfurt", region: "Franken", lat: 50.049, lon: 10.221, slug: "foodtruck-schweinfurt" },
  { name: "Hof", region: "Franken", lat: 50.313, lon: 11.912, slug: "foodtruck-hof" },
  { name: "Kitzingen", region: "Franken", lat: 49.737, lon: 10.16, slug: "foodtruck-kitzingen" },
  { name: "Rothenburg ob der Tauber", region: "Franken", lat: 49.377, lon: 10.179 },
  { name: "Regensburg", region: "Oberpfalz", lat: 49.013, lon: 12.102 },
  { name: "Weiden i. d. OPf.", region: "Oberpfalz", lat: 49.677, lon: 12.156 },
  { name: "Amberg", region: "Oberpfalz", lat: 49.445, lon: 11.858 },
  { name: "Neumarkt i. d. OPf.", region: "Oberpfalz", lat: 49.28, lon: 11.46 },
  { name: "Lauscha", region: "Thüringen", lat: 50.476, lon: 11.16, slug: "foodtruck-lauscha" },
  { name: "Sonneberg", region: "Thüringen", lat: 50.359, lon: 11.174, slug: "foodtruck-sonneberg" },
  { name: "Saalfeld", region: "Thüringen", lat: 50.648, lon: 11.366 },
  { name: "Suhl", region: "Thüringen", lat: 50.609, lon: 10.694, slug: "foodtruck-suhl" },
  { name: "Meiningen", region: "Thüringen", lat: 50.568, lon: 10.415, slug: "foodtruck-meiningen" },
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
   Jede Seite braucht eigenständigen, ortsbezogenen Inhalt (Anfahrt,
   Gelände, typische Anlässe), sonst wären es Doorway Pages.
   Sep. 2026 auf Wunsch des Betreibers erweitert um Kronach, Kulmbach, Hof,
   Sonneberg, Lauscha, Suhl, Meiningen, Schweinfurt, Würzburg und Kitzingen.
   TODO: Betreiber gegenlesen lassen – v. a. die ortsbezogenen Aussagen.
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
        "Wegen der kurzen Anfahrt lassen sich in Coburg auch Termine gut umsetzen, die kurzfristiger zustande kommen – sofern der Tag noch frei ist. Und grundsätzlich gilt: Mit zwei Trucks und einem Offset-Smoker sind wir flexibel, eine kurzfristige Anfrage lohnt sich also immer.",
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
          "Auch kurzfristig lohnt sich die Anfrage: Mit zwei Trucks und einem Offset-Smoker sind wir flexibel. Entscheidend ist, ob euer Termin noch frei ist – die kurze Anfahrt macht Coburg da besonders einfach.",
        ],
      },
    ],
  },
  {
    slug: "foodtruck-bayreuth",
    city: "Bayreuth",
    metaTitle: "Foodtruck in Bayreuth mieten | Der Landstreicher",
    metaDescription:
      "Foodtruck-Catering in Bayreuth und Umgebung: frische Burger, Pulled Pork und American BBQ aus dem Offset-Smoker, frisch vor Ort serviert. Für Hochzeiten, Firmenfeiern und private Feste.",
    h1: "Foodtruck in Bayreuth für Hochzeiten, Firmenfeiern & Feste",
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
          "Ja. Brisket, Pulled Pork, Pulled Beef, Beef Cheeks und mehr kommen aus dem Offset-Smoker. Weil das viele Stunden dauert, planen wir BBQ-Menüs mit Vorlauf.",
        ],
      },
    ],
  },
  {
    slug: "foodtruck-nuernberg",
    city: "Nürnberg",
    metaTitle: "Foodtruck in Nürnberg mieten | Der Landstreicher",
    metaDescription:
      "Foodtruck-Catering in Nürnberg, Erlangen und Fürth: Burger, BBQ aus dem Smoker und hausgemachte Pommes für Firmenfeiern, Hochzeiten und Events. Alles an Bord – eine normale Steckdose genügt.",
    h1: "Foodtruck in Nürnberg für Hochzeiten, Firmenfeiern & Events",
    lead: "Nürnberg, Erlangen, Fürth: Die Metropolregion ist für uns kein Nahbereich, aber ein Ziel, das wir regelmäßig anfahren. Mit der richtigen Planung steht der Truck pünktlich da, wo ihr feiert.",
    image: "burgerDurchreiche",
    imageSecondary: "truckFront",
    intro: {
      heading: "Einsatz im Großraum Nürnberg",
      paragraphs: [
        "Wir kommen aus Lichtenfels, also aus dem Norden. Für Termine in Nürnberg, Erlangen oder Fürth rechnen wir die Anfahrt deshalb von Anfang an mit ein – im Zeitplan und im Angebot.",
        "Dafür bekommt ihr einen Truck, der alles Nötige mitbringt – eine normale Steckdose genügt. Gerade auf Firmengeländen, in Innenhöfen oder bei Events ohne feste Infrastruktur ist das ein Vorteil.",
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
  {
    slug: "foodtruck-kronach",
    city: "Kronach",
    metaTitle: "Foodtruck in Kronach mieten | Der Landstreicher",
    metaDescription:
      "Foodtruck-Catering in Kronach und im Frankenwald: frische Burger und echtes American BBQ aus dem Offset-Smoker für Hochzeiten, Firmenfeiern und Vereinsfeste. Aus dem Nachbarlandkreis Lichtenfels.",
    h1: "Foodtruck in Kronach für Hochzeiten, Firmenfeiern & Vereinsfeste",
    lead: "Kronach und der Frankenwald liegen direkt nebenan. Wir kommen mit dem Truck zu euch – ob in die Stadt oder hoch in die Dörfer.",
    image: "truckSeite",
    imageSecondary: "offsetSmoker",
    intro: {
      heading: "Frankenwald ist Nachbarschaft",
      paragraphs: [
        "Der Landkreis Kronach grenzt an unseren Heimatlandkreis Lichtenfels. Die Anfahrt ist kurz, der Truck steht rechtzeitig und ist in Ruhe aufgebaut, bevor eure Gäste kommen.",
        "Im Frankenwald wird oft auf dem Land gefeiert: im Hof, auf der Wiese, im Vereinsheim. Genau dafür ist ein Truck gemacht, der alles an Bord hat und mit einer normalen Steckdose auskommt.",
      ],
    },
    occasions: [
      {
        title: "Vereinsfest & Kirchweih",
        text: "Wir übernehmen die Küche, damit eure Mitglieder beim eigenen Fest mitfeiern können, statt den ganzen Tag hinterm Grill zu stehen.",
      },
      {
        title: "Hochzeit auf dem Land",
        text: "Scheune, Hof oder Gasthaus ohne große Küche: Wir stellen den Truck daneben und kochen frisch, bis der letzte Tanz ansteht.",
      },
      {
        title: "Firmenfeier",
        text: "Sommerfest auf dem Firmengelände oder Feier für die Belegschaft: Burger von der Plancha-Platte und BBQ aus dem Offset-Smoker, direkt vor Ort.",
      },
    ],
    practical: {
      heading: "Praktisch für Kronach",
      paragraphs: [
        "Im Frankenwald geht es oft bergauf und über schmale Straßen. Sagt uns in der Anfrage kurz, wie die Zufahrt zu eurer Location aussieht – der Truck braucht rund 7,5 × 2,5 m festen Stellplatz.",
        "Wegen der kurzen Anfahrt lohnt sich in Kronach auch eine kurzfristige Anfrage. Mit zwei Trucks und einem Offset-Smoker sind wir flexibel, entscheidend ist nur, ob euer Termin noch frei ist.",
      ],
    },
    nearby: ["Küps", "Mitwitz", "Stockheim", "Wallenfels", "Ludwigsstadt", "Lichtenfels"],
    faq: [
      {
        q: "Kommt ihr auch in die Orte im Frankenwald?",
        a: ["Ja. Der ganze Landkreis Kronach gehört für uns zum Nahbereich – auch die Orte weiter oben im Frankenwald."],
      },
      {
        q: "Was, wenn die Zufahrt eng ist?",
        a: [
          "Dann klären wir das vorab. Beschreibt uns die Zufahrt oder schickt ein Foto vom Stellplatz – wir sagen euch ehrlich, ob der Truck dort hinkommt.",
        ],
      },
    ],
  },
  {
    slug: "foodtruck-kulmbach",
    city: "Kulmbach",
    metaTitle: "Foodtruck in Kulmbach mieten | Der Landstreicher",
    metaDescription:
      "Foodtruck-Catering in Kulmbach und Umgebung: frische Burger und echtes American BBQ aus dem Offset-Smoker für Hochzeiten, Firmenfeiern und private Feste in Oberfranken.",
    h1: "Foodtruck in Kulmbach für Hochzeiten, Firmenfeiern & Feste",
    lead: "Kulmbach liegt auf halbem Weg zwischen Lichtenfels und Bayreuth. Für uns ein kurzer Weg – für euch Burger und BBQ, frisch vor Ort.",
    image: "truckFront",
    imageSecondary: "smokerBrisket",
    intro: {
      heading: "Kurzer Weg über den Main",
      paragraphs: [
        "Von Lichtenfels nach Kulmbach ist es nicht weit. Der Truck ist schnell da und in Ruhe aufgebaut – auch wenn eure Feier bis spät in den Abend geht.",
        "In Kulmbach isst man gern deftig. Brisket, Pulled Pork, Pulled Beef und Beef Cheeks aus dem Offset-Smoker passen da genauso gut wie ein frischer Burger von der Plancha-Platte.",
      ],
    },
    occasions: [
      {
        title: "Hochzeit",
        text: "Ob Feier in der Stadt oder auf einem Hof im Umland: Wir stellen uns dorthin, wo eure Gäste feiern, und kochen frisch.",
      },
      {
        title: "Firmen- & Sommerfest",
        text: "Der Truck steht auf eurem Gelände, eure Leute holen sich ihr Essen direkt am Fenster. Ihr stellt nur den Stellplatz.",
      },
      {
        title: "Geburtstag & Gartenparty",
        text: "Für private Feiern stellen wir die Karte passend zur Gästezahl zusammen – mit vegetarischer Alternative.",
      },
    ],
    practical: {
      heading: "Praktisch für Kulmbach",
      paragraphs: [
        "Soll BBQ aus dem Offset-Smoker auf die Karte, braucht das Vorlauf: Brisket gart bis zu 14 Stunden. Sagt uns deshalb möglichst früh, was ihr euch vorstellt.",
        "Für den Truck braucht es einen festen, ebenen Stellplatz von rund 7,5 × 2,5 m. Für die Dunstabzugshaube genügt eine normale Steckdose.",
      ],
    },
    nearby: ["Thurnau", "Mainleus", "Stadtsteinach", "Neudrossenfeld", "Bayreuth"],
    faq: [
      {
        q: "Wie weit im Voraus sollten wir in Kulmbach anfragen?",
        a: [
          "Für Samstage im Sommer möglichst früh. Kurzfristig lohnt es sich aber auch: Mit zwei Trucks und einem Offset-Smoker sind wir flexibel.",
        ],
      },
      {
        q: "Gibt es auch BBQ für die ganze Gesellschaft?",
        a: [
          "Ja. Brisket, Pulled Pork und Pulled Beef lassen sich gut für viele Gäste portionieren. Wir planen das Menü mit euch zusammen.",
        ],
      },
    ],
  },
  {
    slug: "foodtruck-hof",
    city: "Hof",
    metaTitle: "Foodtruck in Hof mieten | Der Landstreicher",
    metaDescription:
      "Foodtruck-Catering in Hof und im Hofer Land: frische Burger und echtes American BBQ aus dem Offset-Smoker für Hochzeiten, Firmenfeiern und Events. Alles an Bord – eine normale Steckdose genügt.",
    h1: "Foodtruck in Hof für Hochzeiten, Firmenfeiern & Events",
    lead: "Hof und das Hofer Land liegen im Nordosten Oberfrankens. Der Weg ist etwas länger – mit guter Planung steht der Truck trotzdem pünktlich bei euch.",
    image: "eventTafel",
    imageSecondary: "kochDreiBurger",
    intro: {
      heading: "Einmal quer durch Oberfranken",
      paragraphs: [
        "Von Lichtenfels aus fahren wir über Kulmbach und Münchberg ins Hofer Land. Die Anfahrt rechnen wir von Anfang an mit ein – im Zeitplan und im Angebot.",
        "Vor Ort bringt der Truck alles Nötige mit. Von euch brauchen wir nur eine normale Steckdose für die Dunstabzugshaube.",
      ],
    },
    occasions: [
      {
        title: "Firmenfeier",
        text: "Sommerfest, Jubiläum oder Feier für die Belegschaft: Wir stellen uns aufs Gelände und kochen, wo eure Leute zusammenkommen.",
      },
      {
        title: "Hochzeit",
        text: "Keine Profiküche in der Location? Kein Problem. Der Truck bringt seine eigene mit.",
      },
      {
        title: "Events & Feste",
        text: "Bei größeren Veranstaltungen schaffen wir bis zu 320 Portionen pro Stunde – damit die Schlange kurz bleibt.",
      },
    ],
    practical: {
      heading: "Planung für Hof",
      paragraphs: [
        "Wegen der längeren Anfahrt lohnt sich hier eine frühe Anfrage. Dann können wir den Tag gut planen, und ihr habt früh Klarheit über die Kosten inklusive Anfahrt.",
      ],
    },
    nearby: ["Rehau", "Schwarzenbach an der Saale", "Naila", "Münchberg", "Selb"],
    faq: [
      {
        q: "Kostet die Anfahrt nach Hof extra?",
        a: ["Die Anfahrt ist im Angebot enthalten und wird dort transparent ausgewiesen."],
      },
      {
        q: "Kommt ihr auch nach Selb, Rehau oder Naila?",
        a: ["Ja, das ganze Hofer Land gehört zu unseren Einsatzgebieten. Fragt einfach mit eurem Ort an."],
      },
    ],
  },
  {
    slug: "foodtruck-sonneberg",
    city: "Sonneberg",
    metaTitle: "Foodtruck in Sonneberg mieten | Der Landstreicher",
    metaDescription:
      "Foodtruck-Catering in Sonneberg und Südthüringen: frische Burger und echtes American BBQ aus dem Offset-Smoker für Hochzeiten, Firmenfeiern und Vereinsfeste. Direkt über die Grenze von Coburg.",
    h1: "Foodtruck in Sonneberg für Hochzeiten, Firmenfeiern & Feste",
    lead: "Sonneberg liegt gleich hinter Coburg, direkt an der Landesgrenze. Für uns ist Südthüringen damit fast Nahbereich.",
    image: "burgerDurchreiche",
    imageSecondary: "teamPommes",
    intro: {
      heading: "Über die Grenze ist es nicht weit",
      paragraphs: [
        "Von Lichtenfels geht es über Coburg und Neustadt nach Sonneberg. Die Anfahrt ist überschaubar – der Truck ist rechtzeitig da und aufgebaut, bevor eure Gäste kommen.",
        "Ob in der Stadt oder in den Orten am Rand des Thüringer Waldes: Wir brauchen einen festen Stellplatz, den Rest bringen wir mit.",
      ],
    },
    occasions: [
      {
        title: "Vereinsfest",
        text: "Wir übernehmen das Essen, damit der Verein beim eigenen Fest feiern kann, statt am Grill zu stehen.",
      },
      {
        title: "Firmenfeier",
        text: "Sommerfest oder Weihnachtsfeier im Hof: Der Truck stellt sich aufs Gelände und kocht frisch für eure Leute.",
      },
      {
        title: "Hochzeit & Geburtstag",
        text: "Für private Feiern stellen wir das Menü passend zur Gästezahl zusammen – von Burgern bis BBQ aus dem Offset-Smoker.",
      },
    ],
    practical: {
      heading: "Praktisch für Sonneberg",
      paragraphs: [
        "Wegen der kurzen Anfahrt sind in Sonneberg auch kurzfristige Termine gut machbar – sofern der Tag noch frei ist. Mit zwei Trucks und einem Offset-Smoker sind wir flexibel.",
      ],
    },
    nearby: ["Neustadt bei Coburg", "Steinach", "Lauscha", "Schalkau", "Coburg"],
    faq: [
      {
        q: "Fahrt ihr auch weiter nach Thüringen hinein?",
        a: ["Ja. Lauscha, Suhl, Meiningen, Saalfeld und Ilmenau gehören ebenfalls zu unseren Einsatzgebieten."],
      },
      {
        q: "Wie kurzfristig können wir anfragen?",
        a: ["Auch kurzfristig lohnt sich die Anfrage. Entscheidend ist, ob euer Termin noch frei ist."],
      },
    ],
  },
  {
    slug: "foodtruck-lauscha",
    city: "Lauscha",
    metaTitle: "Foodtruck in Lauscha mieten | Der Landstreicher",
    metaDescription:
      "Foodtruck-Catering in Lauscha und am Rennsteig: frische Burger und echtes American BBQ aus dem Offset-Smoker für Hochzeiten, Vereinsfeste und Feiern im Thüringer Wald.",
    h1: "Foodtruck in Lauscha für Hochzeiten, Vereinsfeste & Feiern",
    lead: "Lauscha liegt oben im Thüringer Wald. Wir kommen mit dem Truck den Berg hinauf – und bringen frische Burger und BBQ mit.",
    image: "feierAnstossen",
    imageSecondary: "offsetSmoker",
    intro: {
      heading: "Hoch in den Thüringer Wald",
      paragraphs: [
        "Von Lichtenfels geht es über Coburg und Sonneberg hinauf nach Lauscha. Die Anfahrt planen wir von Anfang an mit ein, damit der Truck pünktlich steht.",
        "Gerade in kleineren Orten gibt es selten eine Küche, die ein ganzes Fest versorgt. Der Truck bringt seine eigene mit – für die Dunstabzugshaube genügt eine normale Steckdose.",
      ],
    },
    occasions: [
      {
        title: "Vereinsfest",
        text: "Wir übernehmen die Küche, damit alle Mitglieder mitfeiern können.",
      },
      {
        title: "Hochzeit",
        text: "Ob im Gasthaus, auf der Wiese oder im Hof: Wir stellen uns dorthin, wo gefeiert wird.",
      },
      {
        title: "Geburtstag & Familienfeier",
        text: "Für private Feiern stellen wir die Karte passend zur Gästezahl zusammen – mit vegetarischer Alternative.",
      },
    ],
    practical: {
      heading: "Was ihr für Lauscha wissen solltet",
      paragraphs: [
        "Lauscha liegt im Tal, viele Straßen sind steil und schmal. Beschreibt uns in der Anfrage kurz, wie die Zufahrt zu eurer Location aussieht – der Truck braucht rund 7,5 × 2,5 m festen Stellplatz.",
        "Im Winter hängt die Anfahrt vom Wetter ab. Für Termine in der kalten Jahreszeit sprechen wir die Planung deshalb genauer mit euch ab.",
      ],
    },
    nearby: ["Steinach", "Neuhaus am Rennweg", "Ernstthal", "Sonneberg"],
    faq: [
      {
        q: "Kommt der Truck die Straßen in Lauscha hoch?",
        a: [
          "In den meisten Fällen ja. Wichtig ist ein fester Stellplatz mit Zufahrt. Schickt uns am besten ein Foto oder eine kurze Beschreibung – dann sagen wir euch ehrlich, ob es passt.",
        ],
      },
      {
        q: "Kommt ihr auch nach Neuhaus am Rennweg oder Steinach?",
        a: ["Ja, fragt einfach mit eurem Ort an. Die Anfahrt steht transparent im Angebot."],
      },
    ],
  },
  {
    slug: "foodtruck-suhl",
    city: "Suhl",
    metaTitle: "Foodtruck in Suhl mieten | Der Landstreicher",
    metaDescription:
      "Foodtruck-Catering in Suhl, Zella-Mehlis und Umgebung: frische Burger und echtes American BBQ aus dem Offset-Smoker für Hochzeiten, Firmenfeiern und Events in Südthüringen.",
    h1: "Foodtruck in Suhl für Hochzeiten, Firmenfeiern & Events",
    lead: "Suhl liegt am Südhang des Thüringer Waldes. Wir kommen mit dem Truck aus Franken zu euch – und bringen Burger und BBQ mit.",
    image: "partyWunderkerzen",
    imageSecondary: "burgerHero",
    intro: {
      heading: "Einsatz in Südthüringen",
      paragraphs: [
        "Von Lichtenfels geht es über Coburg nach Norden bis Suhl. Die Anfahrt ist länger, deshalb rechnen wir sie von Anfang an mit ein – im Zeitplan und im Angebot.",
        "Vor Ort bringt der Truck alles Nötige mit. Ihr stellt nur den Stellplatz und eine normale Steckdose.",
      ],
    },
    occasions: [
      {
        title: "Firmenfeier",
        text: "Auf dem Firmengelände, im Hof oder vor der Halle: Eure Leute holen sich ihr Essen frisch am Truck, statt am Buffet zu warten.",
      },
      {
        title: "Hochzeit",
        text: "Keine Küche in der Location? Wir bringen unsere mit und kochen, bis der letzte Tanz ansteht.",
      },
      {
        title: "Events & Feste",
        text: "Mit bis zu 320 Portionen pro Stunde versorgen wir auch größere Runden zügig.",
      },
    ],
    practical: {
      heading: "Planung für Suhl",
      paragraphs: [
        "Durch die längere Anfahrt lohnt sich eine frühe Anfrage. Dann können wir den Tag gut planen, und ihr habt früh Klarheit über die Kosten inklusive Anfahrt.",
        "Soll BBQ aus dem Offset-Smoker auf die Karte, sagt uns das möglichst früh – Brisket gart bis zu 14 Stunden.",
      ],
    },
    nearby: ["Zella-Mehlis", "Schleusingen", "Oberhof", "Hildburghausen", "Meiningen"],
    faq: [
      {
        q: "Kommt ihr auch nach Zella-Mehlis oder Oberhof?",
        a: ["Ja, fragt einfach mit eurem Ort an. Die Anfahrt steht transparent im Angebot."],
      },
      {
        q: "Kostet die Anfahrt nach Suhl extra?",
        a: ["Die Anfahrt ist im Angebot enthalten und wird dort transparent ausgewiesen."],
      },
    ],
  },
  {
    slug: "foodtruck-meiningen",
    city: "Meiningen",
    metaTitle: "Foodtruck in Meiningen mieten | Der Landstreicher",
    metaDescription:
      "Foodtruck-Catering in Meiningen und im Werratal: frische Burger und echtes American BBQ aus dem Offset-Smoker für Hochzeiten, Firmenfeiern und Feste in Südthüringen.",
    h1: "Foodtruck in Meiningen für Hochzeiten, Firmenfeiern & Feste",
    lead: "Meiningen liegt im Werratal zwischen Thüringer Wald und Rhön. Wir kommen mit dem Truck zu euch – mit Burgern von der Plancha-Platte und BBQ aus dem Offset-Smoker.",
    image: "hochzeitspaar",
    imageSecondary: "kochZweiBurger",
    intro: {
      heading: "Von Franken ins Werratal",
      paragraphs: [
        "Meiningen gehört zu den weiteren Zielen in Thüringen. Die Anfahrt planen wir von Anfang an ein, damit der Truck pünktlich steht und in Ruhe aufgebaut ist.",
        "Rund um Meiningen wird gern draußen gefeiert – im Hof, im Garten oder auf dem Land. Der Truck braucht dafür nur einen festen Stellplatz und eine normale Steckdose.",
      ],
    },
    occasions: [
      {
        title: "Hochzeit",
        text: "Ob Feier in der Stadt oder auf einem Hof im Umland: Wir kochen dort, wo gefeiert wird.",
      },
      {
        title: "Firmenfeier",
        text: "Sommerfest oder Jubiläum auf dem Firmengelände: Wir bringen den Truck und kümmern uns ums Essen.",
      },
      {
        title: "Geburtstag & Familienfeier",
        text: "Für private Feiern stellen wir die Karte passend zur Gästezahl zusammen – mit vegetarischer Alternative.",
      },
    ],
    practical: {
      heading: "Planung für Meiningen",
      paragraphs: [
        "Wegen der längeren Anfahrt lohnt sich eine frühe Anfrage – besonders für Samstage im Sommer. Die Anfahrt steht transparent im Angebot.",
      ],
    },
    nearby: ["Schmalkalden", "Hildburghausen", "Wasungen", "Themar", "Suhl"],
    faq: [
      {
        q: "Fahrt ihr auch in die Rhön oder nach Schmalkalden?",
        a: ["Fragt einfach mit eurem Ort an. Wir sagen euch ehrlich, ob sich die Anfahrt machen lässt – und was sie kostet."],
      },
      {
        q: "Wie früh sollten wir anfragen?",
        a: ["Für Termine im Sommer möglichst früh. Kurzfristige Anfragen lohnen sich trotzdem – mit zwei Trucks und einem Offset-Smoker sind wir flexibel."],
      },
    ],
  },
  {
    slug: "foodtruck-schweinfurt",
    city: "Schweinfurt",
    metaTitle: "Foodtruck in Schweinfurt mieten | Der Landstreicher",
    metaDescription:
      "Foodtruck-Catering in Schweinfurt und Umgebung: frische Burger und echtes American BBQ aus dem Offset-Smoker für Firmenfeiern, Hochzeiten und Events in Unterfranken.",
    h1: "Foodtruck in Schweinfurt für Firmenfeiern, Hochzeiten & Events",
    lead: "Schweinfurt liegt am Main in Unterfranken. Wir fahren den Fluss entlang zu euch – mit frischen Burgern und echtem American BBQ.",
    image: "platteAction",
    imageSecondary: "truckSeite",
    intro: {
      heading: "Den Main entlang nach Unterfranken",
      paragraphs: [
        "Von Lichtenfels folgen wir dem Main über Bamberg und Haßfurt nach Schweinfurt. Die Anfahrt rechnen wir von Anfang an mit ein – im Zeitplan und im Angebot.",
        "Schweinfurt ist ein Industriestandort mit vielen Betrieben. Für Firmenfeiern auf dem Gelände ist der Truck ideal: Er bringt alles Nötige mit, ihr stellt nur den Stellplatz und eine normale Steckdose.",
      ],
    },
    occasions: [
      {
        title: "Firmenfeier & Sommerfest",
        text: "Auch für große Belegschaften: Mit bis zu 320 Portionen pro Stunde bleibt die Schlange kurz.",
      },
      {
        title: "Hochzeit",
        text: "Keine Profiküche in der Location? Der Truck bringt seine eigene mit und kocht frisch für eure Gäste.",
      },
      {
        title: "Events & Feste",
        text: "Bei Veranstaltungen stehen wir mit Burgern, BBQ und Pommes mitten im Geschehen.",
      },
    ],
    practical: {
      heading: "Planung für Schweinfurt",
      paragraphs: [
        "Wegen der längeren Anfahrt lohnt sich eine frühe Anfrage. Dann können wir den Tag gut planen, und ihr habt früh Klarheit über die Kosten inklusive Anfahrt.",
        "Bei Firmengeländen klären wir vorab Zufahrt und Stellplatz. Der Truck braucht rund 7,5 × 2,5 m festen Untergrund.",
      ],
    },
    nearby: ["Haßfurt", "Gerolzhofen", "Werneck", "Bad Kissingen", "Kitzingen"],
    faq: [
      {
        q: "Schafft ihr auch große Firmenfeiern?",
        a: [
          "Ja. Bis zu 320 Portionen pro Stunde sind drin. Bei großen Gruppen stimmen wir Menü und Ablauf so ab, dass es zügig geht.",
        ],
      },
      {
        q: "Kostet die Anfahrt nach Schweinfurt extra?",
        a: ["Die Anfahrt ist im Angebot enthalten und wird dort transparent ausgewiesen."],
      },
    ],
  },
  {
    slug: "foodtruck-wuerzburg",
    city: "Würzburg",
    metaTitle: "Foodtruck in Würzburg mieten | Der Landstreicher",
    metaDescription:
      "Foodtruck-Catering in Würzburg und Mainfranken: frische Burger und echtes American BBQ aus dem Offset-Smoker für Hochzeiten, Firmenfeiern und Events. Alles an Bord – eine normale Steckdose genügt.",
    h1: "Foodtruck in Würzburg für Hochzeiten, Firmenfeiern & Events",
    lead: "Würzburg ist eines unserer weitesten Ziele in Franken. Mit der richtigen Planung steht der Truck trotzdem pünktlich da, wo ihr feiert.",
    image: "eventTafel",
    imageSecondary: "smoker",
    intro: {
      heading: "Einsatz in Mainfranken",
      paragraphs: [
        "Wir kommen aus Oberfranken und fahren den Main hinunter bis Würzburg. Die Anfahrt rechnen wir von Anfang an mit ein – im Zeitplan und im Angebot.",
        "Rund um Würzburg wird viel zwischen Weinbergen, auf Weingütern und in Höfen gefeiert. Oft gibt es dort keine Küche für ein ganzes Fest – der Truck bringt seine eigene mit.",
      ],
    },
    occasions: [
      {
        title: "Hochzeit auf dem Weingut",
        text: "Ob Weingut, Hof oder Scheune: Wir stellen den Truck daneben und kochen frisch für eure Gäste.",
      },
      {
        title: "Firmenfeier",
        text: "Auf dem Firmengelände oder im Innenhof: Eure Leute holen sich ihr Essen direkt am Truck.",
      },
      {
        title: "Events",
        text: "Bei größeren Veranstaltungen schaffen wir bis zu 320 Portionen pro Stunde.",
      },
    ],
    practical: {
      heading: "Was bei Würzburg anders ist",
      paragraphs: [
        "Durch die lange Anfahrt ist eine frühe Anfrage hier doppelt sinnvoll. Wir können den Tag besser planen, und ihr habt früh Klarheit über die Kosten inklusive Anfahrt.",
        "Für die Innenstadt gilt: Klärt vorab, ob Zufahrt und Stellplatz für einen Foodtruck möglich sind. Auf öffentlichem Grund braucht es in der Regel eine Genehmigung.",
      ],
    },
    nearby: ["Kitzingen", "Veitshöchheim", "Ochsenfurt", "Karlstadt", "Marktheidenfeld"],
    faq: [
      {
        q: "Kommt ihr wirklich bis Würzburg?",
        a: ["Ja. Würzburg gehört zu unseren Einsatzgebieten. Wegen der längeren Anfahrt planen wir solche Termine mit etwas mehr Vorlauf."],
      },
      {
        q: "Kostet die Anfahrt nach Würzburg extra?",
        a: ["Die Anfahrt ist im Angebot enthalten und wird dort transparent ausgewiesen."],
      },
    ],
  },
  {
    slug: "foodtruck-kitzingen",
    city: "Kitzingen",
    metaTitle: "Foodtruck in Kitzingen mieten | Der Landstreicher",
    metaDescription:
      "Foodtruck-Catering in Kitzingen und im Kitzinger Land: frische Burger und echtes American BBQ aus dem Offset-Smoker für Hochzeiten, Firmenfeiern und Weinfeste.",
    h1: "Foodtruck in Kitzingen für Hochzeiten, Firmenfeiern & Feste",
    lead: "Kitzingen liegt am Main mitten im Weinland. Wir kommen mit dem Truck zu euch – und bringen frische Burger und BBQ mit.",
    image: "feierAnstossen",
    imageSecondary: "burgerDurchreiche",
    intro: {
      heading: "Mitten im fränkischen Weinland",
      paragraphs: [
        "Von Lichtenfels geht es den Main entlang ins Kitzinger Land. Die Anfahrt ist länger, deshalb planen wir sie von Anfang an mit ein – im Zeitplan und im Angebot.",
        "Zwischen Weinbergen, Winzerhöfen und Dorfplätzen wird hier viel draußen gefeiert. Der Truck braucht dafür nur einen festen Stellplatz und eine normale Steckdose.",
      ],
    },
    occasions: [
      {
        title: "Weinfest & Dorffest",
        text: "Zum Wein gehört was Deftiges: Burger von der Plancha-Platte und BBQ aus dem Offset-Smoker, frisch vor Ort.",
      },
      {
        title: "Hochzeit",
        text: "Ob Winzerhof oder Scheune: Wir stellen uns dorthin, wo gefeiert wird, und kochen frisch.",
      },
      {
        title: "Firmenfeier",
        text: "Sommerfest auf dem Gelände oder Feier für die Belegschaft: Wir bringen den Truck und kümmern uns ums Essen.",
      },
    ],
    practical: {
      heading: "Planung für Kitzingen",
      paragraphs: [
        "Wegen der längeren Anfahrt lohnt sich eine frühe Anfrage – besonders in der Weinfest-Saison. Die Anfahrt steht transparent im Angebot.",
      ],
    },
    nearby: ["Dettelbach", "Volkach", "Iphofen", "Marktbreit", "Würzburg"],
    faq: [
      {
        q: "Kommt ihr auch zu Weinfesten?",
        a: [
          "Ja. Bei Festen stehen wir als Streetfood-Stand mitten im Geschehen. Auf öffentlichen Flächen braucht es in der Regel eine Genehmigung – das klärt meist der Veranstalter.",
        ],
      },
      {
        q: "Kostet die Anfahrt nach Kitzingen extra?",
        a: ["Die Anfahrt ist im Angebot enthalten und wird dort transparent ausgewiesen."],
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
