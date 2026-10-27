import { ExternalLink, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ResourceCardProps { title: string; description: string; type: string; size: string; href?: string; className?: string; }

export function ResourceCard({ title, description, type, size, href, className }: ResourceCardProps) {
  const action = <ExternalLink size={15} aria-hidden="true" />;
  return <Card className={cn("flex min-h-44 flex-col", className)}><div className="flex items-start gap-3"><FileText size={26} strokeWidth={1.7} aria-hidden="true" className="shrink-0 text-neutral-700" /><div><h3 className="text-body font-semibold">{title}</h3><p className="mt-1 text-small leading-5 text-neutral-500">{description}</p></div></div><div className="mt-auto flex items-center justify-between pt-4 text-small text-neutral-500"><span>{type} <span aria-hidden="true">·</span> {size}</span>{href ? <a href={href} aria-label={`Open ${title}`} className="text-primary-500">{action}</a> : <span className="text-primary-500">{action}</span>}</div></Card>;
}
