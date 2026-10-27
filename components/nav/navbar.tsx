import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

export interface NavbarItem { label: string; href?: string; active?: boolean; }
export interface NavbarProps { items: NavbarItem[]; className?: string; }

export function Navbar({ items, className }: NavbarProps) {
  return <nav aria-label="Main navigation" className={cn("flex flex-wrap items-center gap-x-8 gap-y-3", className)}><Logo className="mr-auto" />{items.map(item => item.href ? <a key={item.label} href={item.href} aria-current={item.active ? "page" : undefined} className={cn("text-body font-medium", item.active ? "text-primary-500" : "text-neutral-900")}>{item.label}</a> : <span key={item.label} className={cn("text-body font-medium", item.active ? "text-primary-500" : "text-neutral-900")}>{item.label}</span>)}</nav>;
}
