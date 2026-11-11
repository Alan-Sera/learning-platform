"use client";

import { useEffect, useRef } from "react";
import { SearchInput } from "@/components/ui/search-input";

export function HomeSearch() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      if (event.defaultPrevented || event.isComposing || event.altKey || event.shiftKey ||
        !(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "k") return;
      const target = event.target;
      if (target instanceof HTMLElement && target !== inputRef.current &&
        (target.isContentEditable || target.closest("input, textarea, select, [contenteditable]:not([contenteditable='false'])"))) return;
      event.preventDefault();
      inputRef.current?.focus();
    }
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  return <>
    <label htmlFor="home-search" className="sr-only">Search your learning</label>
    <SearchInput id="home-search" name="learning-query" ref={inputRef} variant="hero"
      placeholder="Ask anything about your learning..." aria-keyshortcuts="Meta+K Control+K" />
  </>;
}
