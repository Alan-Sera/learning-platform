import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...props }: SelectProps) {
  return <div className="relative w-full"><select className={cn("h-11 w-full appearance-none rounded-md border border-neutral-200 bg-white px-4 pr-10 text-body text-neutral-900 focus:border-primary-400 focus:outline-2 focus:outline-primary-500 focus:outline-offset-2", className)} {...props}>{children}</select><ChevronDown aria-hidden="true" size={18} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-neutral-900" /></div>;
}
