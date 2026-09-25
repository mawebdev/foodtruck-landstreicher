/**
 * Laufband mit Gerichten. Reines CSS, pausiert bei Hover,
 * steht still bei prefers-reduced-motion (globale Regel).
 */
export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="font-display flex items-center whitespace-nowrap px-6 text-[clamp(2rem,5vw,3.75rem)] uppercase">
          {item}
          <span aria-hidden className="ml-12 inline-block size-2.5 rotate-45 bg-red" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`group overflow-hidden py-5 ${className}`}>
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
