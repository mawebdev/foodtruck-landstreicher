/**
 * Ablauf – basiert auf den vier Schritten der alten Buchungsseite
 * (Anfrage → Angebot → Bestätigung → vor Ort), erweitert um „Ihr feiert“.
 */
export const processSteps = [
  {
    no: "01",
    title: "Event anfragen",
    text: "Datum, Ort, ungefähre Gästezahl. Mehr brauchen wir am Anfang nicht.",
  },
  {
    no: "02",
    title: "Menü & Ablauf besprechen",
    text: "Ihr bekommt Rückmeldung zu Verfügbarkeit und Kosten. Dann klären wir, was auf die Karte kommt und wann gegessen wird.",
  },
  {
    no: "03",
    title: "Wir kommen mit dem Truck",
    text: "Sobald alles passt, ist der Termin fest. Am Tag selbst rollen wir an und bauen auf.",
  },
  {
    no: "04",
    title: "Frisch zubereiten & servieren",
    text: "Gekocht wird im Truck, direkt vor Ort. Kein Warmhalten, keine Wärmebehälter von gestern.",
  },
  {
    no: "05",
    title: "Ihr feiert",
    text: "Ihr seid bei euren Gästen, nicht in der Küche. Genau so war das gedacht.",
  },
] as const;
