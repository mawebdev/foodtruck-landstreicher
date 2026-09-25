import Link from "next/link";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export function Breadcrumbs({ items, className = "" }: { items: { name: string; path: string }[]; className?: string }) {
  return (
    <>
      <nav aria-label="Brotkrumen" className={className}>
        <ol className="label flex flex-wrap items-center gap-2 opacity-70">
          <li>
            <Link href="/" className="link-underline">
              Start
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={item.path} className="flex items-center gap-2">
              <span aria-hidden className="text-red">/</span>
              {i === items.length - 1 ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link href={item.path} className="link-underline">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(items)} />
    </>
  );
}
