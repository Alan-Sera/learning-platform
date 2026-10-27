import { BarChart3, Clock3, Folder } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface CourseCardProps { title: string; description: string; level: string; duration: string; modules: string; href?: string; className?: string; }

export function CourseCard({ title, description, level, duration, modules, href, className }: CourseCardProps) {
  const content = <><div className="flex items-start gap-3"><span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-xs bg-black font-sans text-[28px] text-white">N</span><div><h3 className="text-body font-semibold">{title}</h3><p className="mt-1 text-small leading-5 text-neutral-500">{description}</p></div></div><div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-5 text-small text-neutral-500"><span className="inline-flex items-center gap-1"><BarChart3 size={14} aria-hidden="true" />{level}</span><span className="inline-flex items-center gap-1"><Clock3 size={14} aria-hidden="true" />{duration}</span><span className="inline-flex items-center gap-1"><Folder size={14} aria-hidden="true" />{modules}</span></div></>;
  return <Card className={cn("flex min-h-44 flex-col", className)}>{href ? <a href={href} className="flex h-full flex-col rounded-md focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2">{content}</a> : content}</Card>;
}
