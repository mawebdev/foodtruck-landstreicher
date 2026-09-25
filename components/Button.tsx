import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "outline-light" | "ghost";

const base =
  "group/btn relative inline-flex min-h-12 items-center justify-center gap-3 rounded-xs px-6 py-3 text-[0.95rem] font-bold tracking-tight transition-[background-color,color,border-color,transform] duration-300 ease-out-soft active:translate-y-px";

const variants: Record<Variant, string> = {
  primary: "bg-red text-cream hover:bg-red-dark hover:-translate-y-0.5",
  outline: "border border-ink/80 text-ink hover:bg-ink hover:text-cream",
  "outline-light": "border border-cream/50 text-cream hover:border-cream hover:bg-cream hover:text-ink",
  ghost: "px-0 text-current underline-offset-4 hover:text-red",
};

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 12"
      className={`h-3 w-6 shrink-0 transition-transform duration-300 ease-out-soft group-hover/btn:translate-x-1 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M0 6h22M17 1l5 5-5 5" />
    </svg>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({ href, children, variant = "primary", arrow = true, className = "", ...rest }: ButtonLinkProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </Link>
  );
}

export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}
