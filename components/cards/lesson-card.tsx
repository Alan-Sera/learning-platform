import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface LessonCardProps { title: string; description: string; module: string; actionLabel: string; href?: string; className?: string; }

export function LessonCard({ title, description, module, actionLabel, href, className }: LessonCardProps) {
  return <Card className={cn("flex min-h-44 flex-col", className)}><Badge variant="lesson" /><h3 className="mt-2 text-body font-semibold">{title}</h3><p className="mt-1 text-small leading-5 text-neutral-500">{description}</p><div className="mt-auto flex items-center justify-between gap-2 pt-4 text-small"><span className="text-neutral-500">{module}</span>{href ? <a href={href} className="inline-flex items-center gap-1 text-primary-500">{actionLabel}<ExternalLink size={14} aria-hidden="true" /></a> : <span className="inline-flex items-center gap-1 text-primary-500">{actionLabel}<ExternalLink size={14} aria-hidden="true" /></span>}</div></Card>;
}
