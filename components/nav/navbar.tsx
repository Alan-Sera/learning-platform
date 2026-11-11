import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import styles from "./navbar.module.css";

export interface NavbarItem { label: string; href?: string; active?: boolean; }
export interface NavbarProps { items: NavbarItem[]; className?: string; variant?: "default" | "home"; actions?: ReactNode; logoHref?: string; }

export function Navbar({ items, className, variant = "default", actions, logoHref }: NavbarProps) {
  const home = variant === "home";
  const logo = <Logo className={home ? styles.logo : "mr-auto"} />;
  return <nav aria-label="Main navigation" className={cn("flex flex-wrap items-center gap-x-8 gap-y-3", home && styles.home, className)}>
    {logoHref ? <a href={logoHref} aria-label="Vertex home" className={home ? styles.brand : "mr-auto"}>{logo}</a> : logo}
    {items.map(item => item.href ? <a key={item.label} href={item.href} aria-current={item.active ? "page" : undefined} className={cn("text-body font-medium", home ? styles.item : item.active ? "text-primary-500" : "text-neutral-900")}>{item.label}</a> : <span key={item.label} className={cn("text-body font-medium", home ? styles.item : item.active ? "text-primary-500" : "text-neutral-900")}>{item.label}</span>)}
    {actions && <div className={home ? styles.actions : "ml-auto flex items-center gap-4"}>{actions}</div>}
  </nav>;
}
