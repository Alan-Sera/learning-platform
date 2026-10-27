import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLElement> { as?: "article" | "div"; }

export function Card({ as: Element = "article", className, ...props }: CardProps) {
  return <Element className={cn("rounded-lg border border-neutral-200 bg-white p-5 shadow-sm", className)} {...props} />;
}
