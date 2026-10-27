import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem { label: string; href?: string; }
export interface BreadcrumbsProps { items: BreadcrumbItem[]; className?: string; }

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return <nav aria-label="Breadcrumb" className={className}><ol className="flex flex-wrap items-center gap-2 text-small text-neutral-500">{items.map((item, index) => <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">{index > 0 && <ChevronRight size={14} aria-hidden="true" />}{item.href && index < items.length - 1 ? <a href={item.href} className="hover:text-primary-500">{item.label}</a> : <span aria-current={index === items.length - 1 ? "page" : undefined} className={cn(index === items.length - 1 && "text-neutral-500")}>{item.label}</span>}</li>)}</ol></nav>;
}
