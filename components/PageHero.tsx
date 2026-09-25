import Image from "next/image";
import type { ReactNode } from "react";
import type { SiteImage } from "@/content/images";
import { Breadcrumbs } from "./Breadcrumbs";
import { Label } from "./Label";
import { StaggerLines } from "./StaggerLines";

type Props = {
  breadcrumbs: { name: string; path: string }[];
  label: string;
  /** SEO-H1, klein über der Display-Zeile */
  h1: string;
  display: ReactNode[];
  lead: ReactNode;
  image?: SiteImage;
  imagePosition?: string;
  note?: string;
  children?: ReactNode;
};

/**
 * Hero für Unterseiten: dunkel, links große Display-Zeilen,
 * rechts ein angeschnittenes Foto mit rotem Versatz.
 */
export function PageHero({ breadcrumbs, label, h1, display, lead, image, imagePosition = "center", note, children }: Props) {
  return (
    <section className="on-dark grain grain-light relative overflow-hidden bg-ink pb-16 pt-8 text-cream md:pb-24 md:pt-12">
      <div className="container-site">
        <Breadcrumbs items={breadcrumbs} className="mb-12 md:mb-16" />
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className={image ? "lg:col-span-7" : "lg:col-span-10"}>
            <Label className="fade-in mb-6 text-cream/70">{label}</Label>
            <h1>
              <span className="label fade-in mb-5 block text-cream/60">{h1}</span>
              <StaggerLines lines={display} className="font-display block text-[clamp(3rem,10vw,8.5rem)] uppercase" />
            </h1>
            <div className="fade-in mt-8 max-w-xl text-lg leading-relaxed text-cream/80 [animation-delay:400ms]">{lead}</div>
            {children && <div className="fade-in mt-10 [animation-delay:500ms]">{children}</div>}
          </div>
          {image && (
            <div className={`relative ${note ? "mt-14 lg:mt-16" : "lg:mt-10"} lg:col-span-5`}>
              <div aria-hidden className="absolute -bottom-3 -right-3 h-full w-full rounded-xs bg-red md:-bottom-4 md:-right-4" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-xs sm:aspect-[4/3] lg:aspect-[4/5]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  preload
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: imagePosition }}
                />
              </div>
              {note && <p className="hand absolute -top-8 left-4 rotate-[-6deg] text-3xl text-cream md:-left-10">{note}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
