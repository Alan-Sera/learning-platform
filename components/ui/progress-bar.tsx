import { cn } from "@/lib/utils";

export interface ProgressBarProps { value: number; max?: number; label?: string; className?: string; }

export function ProgressBar({ value, max = 100, label, className }: ProgressBarProps) {
  const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
  const safeValue = Number.isFinite(value) ? Math.min(Math.max(value, 0), safeMax) : 0;
  const percent = Math.round(safeValue / safeMax * 100);
  return <div className={cn("flex w-full items-center gap-4", className)}>
    <div role="progressbar" aria-label={label ?? "Progress"} aria-valuemin={0} aria-valuemax={safeMax} aria-valuenow={safeValue} className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-neutral-100">
      <div className="h-full rounded-full bg-primary-500" style={{ width: `${percent}%` }} />
    </div>
    <span className="shrink-0 text-small text-neutral-700">{percent}% complete</span>
  </div>;
}
