import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat_Brush, Manrope } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCTA } from "@/components/MobileCTA";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { site } from "@/lib/site";
import "./globals.css";

// Schriften werden von next/font selbst gehostet – keine Requests an Google (DSGVO).
const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  axes: ["wdth", "opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

const hand = Caveat_Brush({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-caveat",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Foodtruck „Der Landstreicher“ | Streetfood & Catering",
    template: "%s | Der Landstreicher",
  },
  description:
    "Der Landstreicher bringt frische Burger, BBQ und Streetfood direkt zu eurem Event. Foodtruck-Catering für Hochzeiten, Firmenfeiern und Veranstaltungen in Franken, der Oberpfalz und Thüringen.",
  applicationName: site.name,
  authors: [{ name: site.name }],
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior="smooth": Next.js 16 übernimmt das Umschalten von
    // scroll-behavior bei Routenwechseln nur noch, wenn dieses Attribut gesetzt ist.
    // Dadurch scrollen Seitenwechsel sofort nach oben, Anker-Klicks bleiben smooth.
    <html
      lang="de"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} ${hand.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#inhalt"
          className="sr-only z-[100] rounded-xs bg-red px-4 py-3 font-bold text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Zum Inhalt springen
        </a>
        <MotionProvider>
          <Header />
          <main id="inhalt" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileCTA />
        </MotionProvider>
      </body>
    </html>
  );
}
