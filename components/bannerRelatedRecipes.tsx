"use client";

import { useState } from "react";
import RelatedPost from "@/components/relatedrecipeposts";
import Link from "next/link";

export default function BannerRelatedRecipes({ relatedRecipes }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const handleNext = () => {
    const nextIndex = currentIndex + itemsPerPage;
    if (nextIndex < relatedRecipes.length) {
      setCurrentIndex(nextIndex);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    const prevIndex = currentIndex - itemsPerPage;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
    } else {
      const maxStart = Math.max(0, relatedRecipes.length - itemsPerPage);
      setCurrentIndex(maxStart);
    }
  };

  if (!relatedRecipes || relatedRecipes.length <= 1) {
    return (
      <div className="relative flex w-full justify-center mb-12">
        <Link href="/archive" className="inline-flex justify-center items-center px-4 py-3 border border-[#40749C] rounded-lg text-[#40749C] text-base font-semibold">
          See all content
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-col w-full max-w-[1200px] px-4 py-6 rounded-2xl gap-6 bg-white">
        
        <div className="w-full flex justify-start items-center gap-4">
          <div className="w-12 h-12" aria-hidden="true"></div>
          <h2 className="text-black text-2xl font-bold font-roboto-serif leading-9">
            Related content
          </h2>
        </div>

        {/* 1. Use `justify-between` to push the three direct children to the edges. */}
        <div className="w-full flex justify-between items-stretch">
          {/* Child 1: Prev Button */}
          <button
            onClick={handlePrev}
            disabled={relatedRecipes.length <= itemsPerPage}
            className="p-2 self-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path d="M20 24L12 16L20 8" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Child 2: The Posts Container */}
          <div className="flex-1 flex justify-start items-stretch gap-8">
            {relatedRecipes
              .slice(currentIndex, currentIndex + itemsPerPage)
              .map((post) => (
                <div
                  key={post._id}
                  className="w-[calc((100%-64px)/3)] h-full" // Width is now responsive to the container
                  style={{ flexShrink: 0 }}
                >
                  <RelatedPost
                    pathPrefix="blog"
                    post={post}
                  />
                </div>
              ))}
          </div>

          {/* Child 3: Next Button */}
          <button
            onClick={handleNext}
            disabled={relatedRecipes.length <= itemsPerPage}
            className="p-2 self-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path d="M12 8L20 16L12 24" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* CTA */}
        <div className="w-full flex justify-center items-center">
          <Link href="/archive" className="inline-flex justify-center items-center px-4 py-3 border border-[#40749C] rounded-lg text-[#40749C] text-base font-semibold">
            See all content
          </Link>
        </div>
      </div>
    </div>
  );
}
