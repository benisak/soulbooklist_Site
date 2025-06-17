// Movies Prject
"use client"; 

import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// Define the Ingredient interface
interface AmazonProductMovie {
  url: string;
  rent_price?: number;
  buy_price?: number;
}

interface IngredientListProps {
  amazon_product_movie: AmazonProductMovie;
  director: string;
  writers: string[];
  main_cast: string[];
  budget: number;
  rating: number;
  duration: number;
  box_office: number;
  title: string;
  plot_summary: string;
  mainimage_url: string;
}

const MovieDetails: React.FC<IngredientListProps> = ({ amazon_product_movie, director, writers, main_cast, budget, box_office, title, plot_summary, mainimage_url, rating, duration }) => {
  // State to track if overlay is visible
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  // Helper to render stars
  const renderStars = (rating: number) => {
    const stars: JSX.Element[] = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="star-icon text-[#FF9900]" />);
      } else if (i - 0.5 === rating) {
        stars.push(<FaStarHalfAlt key={i} className="star-icon text-[#FF9900]" />);
      } else {
        stars.push(<FaRegStar key={i} className="star-icon text-[#FF9900]" />);
      }
    }
    return stars;
  };

  useEffect(() => {
    const mobileMenu = document.getElementById("mobile-menu");
    const menuButton = document.getElementById("mobile-menu-button");
    const closeButton = document.getElementById("close-menu");
    const overlay = document.getElementById("overlay");
    const ingredientList = document.getElementById("ingredient-list");
  
    if (menuButton && mobileMenu && closeButton && overlay && ingredientList) {
      const openMenu = () => {
        setIsOverlayVisible(true);
        mobileMenu.classList.remove("hidden");
        overlay.classList.remove("hidden");
        menuButton.classList.add("hidden");
        ingredientList.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      };
  
      const closeMenuWithoutLink = () => {
        mobileMenu.classList.add("hidden");
        overlay.classList.add("hidden");
        menuButton.classList.remove("hidden");
        ingredientList.classList.add("hidden");
        document.body.style.overflow = "auto";
        setIsOverlayVisible(false);
      };
  
      const closeMenuWithLink = () => {
        closeMenuWithoutLink();
      };
  
      // Single handler for close button clicks
      const handleCloseButtonClick = (event) => {
        const target = event.target;
        
        // If user clicked "Buy Now" link (or inside it)
        if (
          (target.tagName === "A" && target.textContent.includes("Buy Now")) ||
          (target.closest("a") && target.closest("a").textContent.includes("Buy Now"))
        ) {
          closeMenuWithLink();
          return;
        }
        
        // If user clicked on the SVG or within it
        if (target.tagName === "svg" || target.closest("svg")) {
          closeMenuWithoutLink();
          return;
        }
      };
  
      menuButton.addEventListener("click", openMenu);
      closeButton.addEventListener("click", handleCloseButtonClick);
  
      // Cleanup
      return () => {
        menuButton.removeEventListener("click", openMenu);
        closeButton.removeEventListener("click", handleCloseButtonClick);
      };
    }
  }, [amazon_product_movie]);
  

  return (
    <div className="mx-auto max-w-3xl p-0 ">
      <h4 className="mb-4 text-xl font-bold text-[#F5C518] sm:block">
        Directors
      </h4>

      <div className="mb-4 md:mb-6"
        style={{
          color: 'var(--Black-00, #F6F6F6)',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: '24px',
        }}
      >
        <p>
          <span style={{ fontWeight: '700' }}>Direction: </span> {director} 
        </p>
        <p>
          <span style={{ fontWeight: '700' }}>Script: </span> {Array.isArray(writers) ? writers.join(', ') : 'N/A'}
        </p>
        <p>
          <span style={{ fontWeight: '700' }}>Main cast: </span> {Array.isArray(main_cast) ? main_cast.join(', ') : 'N/A'}
        </p>
      </div>

      <h4 className="mb-4 text-xl font-bold text-[#F5C518] sm:block">
      Ticket office
      </h4>

      <div className="mb-4 md:mb-6"
        style={{
          color: 'var(--Black-00, #F6F6F6)',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: '24px',
        }}
      >
        <p>
          <span style={{ fontWeight: '700' }}>Budget: </span> ${budget} million
        </p>
        <p>
          <span style={{ fontWeight: '700' }}>Box office: </span> ${box_office} million
        </p>
      </div>
      
      {/* Desktop Wishlist Button */}
      <a
        href={amazon_product_movie.url || "#"}
        target="_blank"
        rel="noopener noreferrer"  
        className="bg-[#2F88FF] border border-[#2F88FF] text-white hidden flex-[1_0_0] items-center justify-center gap-2 rounded-lg p-4 text-base font-semibold sm:flex">
        Get it on Amazon Prime
      </a>
      
            {/* Overlay */}
      <div
        id="overlay"
        className="fixed inset-0 z-40 hidden bg-black bg-opacity-50 sm:hidden"></div>

      {/* Mobile Menu Drop of Ingredients */}
      <div
        id="mobile-menu"
        className="fixed inset-x-0 bottom-0 z-50 hidden flex-col overflow-y-auto border-t border-gray-200 bg-white sm:hidden"
        style={{
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          maxHeight: "90vh", // Allow the container to grow up to 90% of the viewport height
        }}
      >
      {/* Header */}
      <div className="relative flex items-center justify-center pt-6">
        <h2 className="font-inter text-[15px] font-bold text-black">
          🛒 Amazon Movie
        </h2>
        <button
            type="button"
            id="close-menu"
            className="absolute right-4 inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
            style={{
              width: "auto",
              height: "auto",
              padding: "0.5rem",
            }}
          >
            <a
              href={amazon_product_movie.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xsn"
            >
              Buy Now
            </a>
            <svg
              className="svg_right close_button h-6 w-6 cursor-pointer fill-current ml-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
              ></path>
            </svg>
          </button>
        </div>

      {/* Ingredient List Wrapper */}
      <ul className="flex mt-0 p-4 space-x-3 overflow-x-auto"> {/* Flex container for horizontal layout */}
          <li key={1} className="flex-shrink-0 w-[40%]"> {/* Adjust width for two full and partial third */}
            {/* Centered Image */}
            <div className="flex justify-center mb-2">
              <a
                href={amazon_product_movie.url}
                target="_blank"
                rel="noopener noreferrer">
                <img
                  src={mainimage_url}
                  alt={"main image"}
                  className="h-[120px] w-[120px] rounded-lg object-cover" // Increased image size
                />
              </a>
            </div>

            {/* Left-Aligned Content */}
            <div className="text-left">
              <a
                href={amazon_product_movie.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-green-600">
                <h3 className="text-sm font-normal leading-tight text-[#007185]">
                  {title}
                </h3>
              </a>
              <div className="flex h-[24px]"> {/* Star rating */}
                {renderStars(rating)}
              </div>
              <p className="text-xs font-normal text-[#565959]">
                {rating?.toLocaleString("en-US")} opinions
              </p>
              <p className="text-base font-normal leading-6 text-[#B12704]">
                US${amazon_product_movie.rent_price?.toFixed(2)}
              </p>
              {amazon_product_movie.buy_price && (
                <span className="inline-block rounded bg-green-200 px-2 text-xs font-bold text-green-700">
                  {amazon_product_movie.buy_price}% OFF
                </span>
              )}
            </div>
          </li>
      </ul>

      <p className="relative flex items-center justify-center mb-4 ads_disclosure" style={{ fontSize: "0.63rem" }}>
        [Ad] As an Amazon Associate I earn from qualifying purchases*
      </p>
    </div>

    </div>
  );
};

export default MovieDetails;
