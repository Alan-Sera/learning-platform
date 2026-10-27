import { cn } from "@/lib/utils";

export interface LogoProps { compact?: boolean; className?: string; }

export function Logo({ compact = false, className }: LogoProps) {
  return <span className={cn("inline-flex items-center gap-2.5 text-neutral-900", className)} aria-label="Vertex">
    <svg aria-hidden="true" viewBox="0 0 40 40" className="size-9 shrink-0" fill="none">
      <path d="M2 5h12l6 11 6-11h12L20 37 2 5Z" fill="currentColor" className="text-primary-500" />
      <path d="M13 5h14l-7 12-7-12Z" fill="white" />
      <path d="m20 23 6-10 4 0-10 18-10-18h4l6 10Z" fill="white" />
    </svg>
    {!compact && <span className="text-[24px] font-semibold tracking-[-0.06em]">Vertex</span>}
  </span>;
}
