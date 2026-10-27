"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationProps { currentPage: number; totalPages: number; onPageChange: (page: number) => void; className?: string; }

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const last = Math.max(1, Math.floor(totalPages));
  const current = Math.min(Math.max(1, Math.floor(currentPage)), last);
  const visible = Array.from(new Set([1, 2, 3, current - 1, current, current + 1, last].filter(page => page >= 1 && page <= last))).sort((a, b) => a - b);
  return <nav aria-label="Pagination" className={cn("flex items-center gap-1", className)}><button type="button" aria-label="Previous page" disabled={current === 1} onClick={() => onPageChange(current - 1)} className="flex size-9 items-center justify-center rounded-xs disabled:cursor-not-allowed disabled:text-neutral-300"><ChevronLeft size={18} aria-hidden="true" /></button>{visible.map((page, index) => <span key={page} className="contents">{index > 0 && page - visible[index - 1] > 1 && <span aria-hidden="true" className="px-1 text-neutral-500">…</span>}<button type="button" aria-label={`Page ${page}`} aria-current={page === current ? "page" : undefined} onClick={() => onPageChange(page)} className={cn("flex size-9 items-center justify-center rounded-xs border text-small", page === current ? "border-primary-500 text-primary-500" : "border-transparent text-neutral-700 hover:border-neutral-200")}>{page}</button></span>)}<button type="button" aria-label="Next page" disabled={current === last} onClick={() => onPageChange(current + 1)} className="flex size-9 items-center justify-center rounded-xs disabled:cursor-not-allowed disabled:text-neutral-300"><ChevronRight size={18} aria-hidden="true" /></button></nav>;
}
