import { CirclePlay } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface LessonVideoCardProps { title: string; description: string; lesson: string; duration: string; actionLabel: string; href?: string; className?: string; }

export function LessonVideoCard({ title, description, lesson, duration, actionLabel, href, className }: LessonVideoCardProps) {
  return <Card className={cn("flex min-h-44 flex-col", className)}><Badge variant="video" /><h3 className="mt-2 text-body font-semibold">{title}</h3><p className="mt-1 text-small leading-5 text-neutral-500">{description}</p><div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4 text-small"><span className="text-neutral-500">{lesson} <span aria-hidden="true">·</span> {duration}</span>{href ? <a href={href} className="inline-flex items-center gap-1 text-primary-500"><CirclePlay size={15} aria-hidden="true" />{actionLabel}</a> : <span className="inline-flex items-center gap-1 text-primary-500"><CirclePlay size={15} aria-hidden="true" />{actionLabel}</span>}</div></Card>;
}
