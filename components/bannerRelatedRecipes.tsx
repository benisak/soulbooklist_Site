"use client"; // Add this line at the very top

import { useState, useEffect } from "react";
import RelatedPost from "@/components/relatedrecipeposts";

export default function BannerRelatedRecipes(props) {
  const { relatedRecipes } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 6; // Fixed to always show 5 on desktop

  useEffect(() => {
    // Function to update itemsPerPage based on window width
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) { // Mobile breakpoint
        // You can add mobile-specific logic here if needed
      }
    };

    // Set initial items per page
    updateItemsPerPage();

    // Add event listener for window resize
    window.addEventListener("resize", updateItemsPerPage);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);


  return (
    <div className="text-[#1F1F1F] text-xl font-bold">

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between mt-6">
        <div className="text-[#1F1F1F] text-xl font-bold">
        <div className={`grid gap-6 grid-cols-2`}>
          {relatedRecipes.slice(currentIndex, currentIndex + itemsPerPage).map(post => (
            <RelatedPost
              pathPrefix={"blog"}
              key={post._id}
              post={post}
              aspect="square"
              minimal={false}
              preloadImage={true}
              fontSize="medium"
              fontWeight="normal"
            />
          ))}
        </div>
        </div>

      </div>

      {/* Mobile Layout */}
<div className="md:hidden mt-6 mb-6 mobile-layout">
  <div className={`flex overflow-x-auto space-x-4`}>
    {relatedRecipes.slice(0, 10).map(post => (
      <RelatedPost
        pathPrefix={"blog"}
        key={post._id}
        post={post}
        aspect="square"
        minimal={false}
        preloadImage={true}
        fontSize="medium"
        fontWeight="normal"
      />
    ))}
  </div>
  
  {/* Horizontal Scroll Bar with additional padding */}
  <div style={{ width: '100%', height: '100%', background: '#D9D9D9', borderRadius: '20px', marginTop: '20px' }} />
      </div>

    </div>
  );
}
