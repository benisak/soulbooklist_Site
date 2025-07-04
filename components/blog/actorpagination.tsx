// Movies Prject
/* eslint-disable react/jsx-no-bind */

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

export default function ActorPagination({
  pageIndex,
  isFirstPage,
  isLastPage
}) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams?.toString());

  // Define functions for navigating to the next and previous pages
  // These functions update the page query parameter in the URL
  const handleNextPage = () => {
    params.set("page", (pageIndex + 1).toString());
    const query = params.toString();

    router.push(`/actors?${query}`);
  };

  const handlePrevPage = () => {
    params.set("page", (pageIndex - 1).toString());
    const query = params.toString();

    router.push(`/actors?${query}`);
  };

  return (
    <div className="mt-10 flex items-center justify-center">
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="ActorPagination">
        <button
          disabled={isFirstPage}
          onClick={handlePrevPage}
          className="relative inline-flex items-center gap-1 rounded-l-md border border-[#f5c518] bg-black px-3 py-2 pr-4 text-sm font-medium text-[#f5c518] hover:border-black hover:text-black hover:bg-[#f5c518] focus:z-20 disabled:pointer-events-none disabled:opacity-40 ">
          <ChevronLeftIcon className="h-3 w-3" aria-hidden="true" />
          <span>Previous</span>
        </button>
        <button
          onClick={handleNextPage}
          disabled={isLastPage}
          className="relative inline-flex items-center gap-1 rounded-r-md border border-[#f5c518] bg-black px-3 py-2 pl-4 text-sm font-medium text-[#f5c518] hover:border-black hover:text-black hover:bg-[#f5c518] focus:z-20 disabled:pointer-events-none disabled:opacity-40">
          <span>Next</span>
          <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
}
