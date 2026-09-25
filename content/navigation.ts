export type NavChild = { readonly label: string; readonly href: string; /** im Desktop-Dropdown weglassen (z. B. „Übersicht" – der Elternpunkt zeigt schon dorthin) */ readonly hideInDropdown?: boolean };
export type NavItem = {
  readonly label: string;
  readonly href: string;
  /** Zusätzliche Pfade, auf denen der Punkt als aktiv markiert wird */
  readonly match?: readonly string[];
  /** Unterpunkte für das Desktop-Dropdown und das mobile Menü */
  readonly children?: readonly NavChild[];
};

export const mainNav: readonly NavItem[] = [
  { label: "Speisekarte", href: "/speisekarte" },
  { label: "Catering", href: "/foodtruck-catering" },
  {
    label: "Events",
    href: "/events",
    match: ["/events", "/foodtruck-hochzeit", "/foodtruck-firmenfeier"],
    children: [
      { label: "Übersicht", href: "/events", hideInDropdown: true },
      { label: "Hochzeit", href: "/foodtruck-hochzeit" },
      { label: "Firmenfeier", href: "/foodtruck-firmenfeier" },
    ],
  },
  {
    label: "Der Landstreicher",
    href: "/ueber-uns",
    match: ["/ueber-uns", "/galerie"],
    children: [
      { label: "Über uns", href: "/ueber-uns" },
      { label: "Galerie", href: "/galerie" },
    ],
  },
  {
    label: "Einsatzgebiete",
    href: "/einsatzgebiete",
    match: ["/einsatzgebiete", "/foodtruck-bamberg", "/foodtruck-coburg", "/foodtruck-bayreuth", "/foodtruck-nuernberg"],
  },
];

/** Unterpunkte für „Events“ im Footer (Header liest sie aus mainNav) */
export const eventNav: readonly NavChild[] = [
  { label: "Übersicht", href: "/events" },
  { label: "Hochzeit", href: "/foodtruck-hochzeit" },
  { label: "Firmenfeier", href: "/foodtruck-firmenfeier" },
];

export const footerNav: readonly NavChild[] = [
  { label: "Speisekarte", href: "/speisekarte" },
  { label: "Catering", href: "/foodtruck-catering" },
  { label: "Events", href: "/events" },
  { label: "Hochzeit", href: "/foodtruck-hochzeit" },
  { label: "Firmenfeier", href: "/foodtruck-firmenfeier" },
  { label: "Einsatzgebiete", href: "/einsatzgebiete" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Galerie", href: "/galerie" },
  { label: "Foodtruck buchen", href: "/foodtruck-buchen" },
];

export const legalNav: readonly NavChild[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];