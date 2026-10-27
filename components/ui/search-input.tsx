import type { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> { shortcut?: string; }

export function SearchInput({ className, shortcut = "⌘ K", ...props }: SearchInputProps) {
  return <div className="relative w-full"><Search aria-hidden="true" size={18} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-neutral-700" />
    <input type="search" className={cn("h-11 w-full rounded-md border border-neutral-200 bg-white pr-14 pl-11 text-body text-neutral-900 placeholder:text-neutral-500 focus:border-primary-400 focus:outline-2 focus:outline-primary-500 focus:outline-offset-2", className)} {...props} />
    <span aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 rounded-xs border border-neutral-200 px-1.5 text-small text-neutral-700">{shortcut}</span>
  </div>;
}
