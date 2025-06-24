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
      <div className="archive-link flex w-full justify-center px-0 pr-4 sm:px-[30px] pb-[24px]">
                <Link
                  href="/archive"
                  className="bg-white border border-[#40749C] hover:border-[#40749C] text-[#40749C] hover:bg-[#40749C] hover:text-white transition-colors duration-300 ease-in-out relative inline-flex w-full max-w-[100%] items-center justify-center gap-1 rounded-md px-4 py-3 text-center text-sm font-medium focus:z-20 disabled:pointer-events-none disabled:opacity-40 md:w-auto"
                  style={{
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "normal",
                  }}
                >
                  <span>See all content</span>
                </Link>
              </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      {/* ========================= DESKTOP ========================= */}
      <div className="hidden md:flex flex-col w-full max-w-[1200px] px-4 py-6 rounded-2xl gap-6 bg-white">
        <div className="w-full flex justify-start items-center gap-4">
          <div className="w-12 h-12" aria-hidden="true"></div>
          <h2 className="text-black text-2xl font-bold font-roboto-serif leading-9">
            Related content
          </h2>
        </div>

        <div className="w-full flex justify-between items-stretch">
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
              <path
                d="M20 24L12 16L20 8"
                stroke="#1F1F1F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex-1 flex justify-start items-stretch gap-8">
            {relatedRecipes
              .slice(currentIndex, currentIndex + itemsPerPage)
              .map((post) => (
                <div
                  key={post._id}
                  className="w-[calc((100%-64px)/3)] h-full"
                  style={{ flexShrink: 0 }}
                >
                  <RelatedPost pathPrefix="blog" post={post} />
                </div>
              ))}
          </div>

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
              <path
                d="M12 8L20 16L12 24"
                stroke="#1F1F1F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="w-full flex justify-center items-center">
          <Link
            href="/archive"
            className="inline-flex justify-center items-center px-4 py-3 border border-[#40749C] rounded-lg text-[#40749C] text-base font-semibold"
          >
            See all content
          </Link>
        </div>
      </div>

      {/* ========================= MOBILE ========================= */}
      <div className="md:hidden w-full pb-6 flex flex-col gap-6">
        <h2 className="text-black text-xl font-bold font-roboto-serif">
          Related content
        </h2>

        <div className="flex overflow-x-auto no-scrollbar gap-4 pr-0 snap-x snap-mandatory scroll-smooth">
          {relatedRecipes.map((post) => (
            <RelatedPost
              pathPrefix="blog"
              key={post._id}
              post={post}
              isMobile={true}
            />
          ))}
        </div>

      <div className="archive-link flex w-full justify-center px-0 pr-4 sm:px-[30px] pb-[24px] pt-[24px]">
                <Link
                  href="/archive"
                  className="bg-white border border-[#40749C] hover:border-[#40749C] text-[#40749C] hover:bg-[#40749C] hover:text-white transition-colors duration-300 ease-in-out relative inline-flex w-full max-w-[100%] items-center justify-center gap-1 rounded-md px-4 py-3 text-center text-sm font-medium focus:z-20 disabled:pointer-events-none disabled:opacity-40 md:w-auto"
                  style={{
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "normal",
                  }}
                >
                  <span>See all content</span>
                </Link>
              </div>
            
      </div>
    </div>
  );
}
