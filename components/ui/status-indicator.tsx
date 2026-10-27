import { CircleCheck, LockKeyhole } from "lucide-react";
import { cn } from "@/lib/utils";

export type StatusVariant = "in-progress" | "completed" | "now-playing" | "locked";
export interface StatusIndicatorProps { status: StatusVariant; label?: string; className?: string; }

const statusConfig = {
  "in-progress": { label: "In Progress", icon: null, className: "text-primary-500" },
  completed: { label: "Completed", icon: CircleCheck, className: "text-completed" },
  "now-playing": { label: "Now Playing", icon: null, className: "text-primary-500" },
  locked: { label: "Locked", icon: LockKeyhole, className: "text-neutral-700" },
} as const;

export function StatusIndicator({ status, label, className }: StatusIndicatorProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  return <span className={cn("inline-flex items-center gap-2 text-small text-neutral-900", className)}>{status === "now-playing" ? <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" className="text-primary-500"><circle cx="10" cy="10" r="9" fill="currentColor" /><path d="m8 5 7 5-7 5V5Z" fill="white" /></svg> : Icon ? <Icon size={18} strokeWidth={2} aria-hidden="true" className={config.className} /> : <span aria-hidden="true" className="size-[18px] rounded-full border-2 border-primary-500 border-r-transparent" />}{label ?? config.label}</span>;
}
