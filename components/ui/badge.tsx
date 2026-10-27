import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "video" | "lesson" | "popular";
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> { variant: BadgeVariant; }

export function Badge({ variant, className, children, ...props }: BadgeProps) {
  return <span className={cn("inline-flex w-fit rounded-[6px] px-[6px] py-[2px] text-[12px] leading-4 font-semibold tracking-[0.06em] uppercase", variant === "lesson" ? "bg-lesson-bg text-lesson-text" : "bg-primary-100 text-primary-500", className)} {...props}>{children ?? variant}</span>;
}
