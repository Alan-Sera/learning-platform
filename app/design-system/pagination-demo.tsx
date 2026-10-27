"use client";

import { useState } from "react";
import { Pagination } from "@/components/nav/pagination";

export function PaginationDemo() {
  const [page, setPage] = useState(1);
  return <Pagination currentPage={page} totalPages={8} onPageChange={setPage} />;
}
