"use client";

import React, { useState, useEffect, useRef, ReactElement } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// Define the Ingredient interface
interface Ingredient {
  title: string;
  productImageUrl: string;
  starsRating: number;
  countRatings: number;
  price: number;
  url: string;
  discount?: number; // Optional
}

interface IngredientListProps {
  ingredients: Ingredient[];
  modal_title?: string;
}

const IngredientList: React.FC<IngredientListProps> = ({ ingredients, modal_title }) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const scrollPositionRef = useRef<number>(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Helper to render stars
  const renderStars = (rating: number): ReactElement[] => {
    const stars: ReactElement[] = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <span key={i} className="star-icon text-[#FF9900]">
            <FaStar />
          </span>
        );
      } else if (i - 0.5 === rating) {
        stars.push(
          <span key={i} className="star-icon text-[#FF9900]">
            <FaStarHalfAlt />
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star-icon text-[#FF9900]">
            <FaRegStar />
          </span>
        );
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
        scrollPositionRef.current = window.scrollY; // Save current scroll position
        setIsOverlayVisible(true);
        document.body.style.position = "fixed"; // Lock background scroll
        document.body.style.top = `-${scrollPositionRef.current}px`;
        document.body.style.width = "100%";

        mobileMenu.classList.remove("hidden");
        overlay.classList.remove("hidden");
        menuButton.classList.add("hidden");
        ingredientList.classList.remove("hidden");
      };

      const closeMenuWithoutLink = () => {
        setIsOverlayVisible(false);
        document.body.style.position = ""; // Restore background scroll
        document.body.style.top = "";
        window.scrollTo(0, scrollPositionRef.current); // Restore scroll position

        mobileMenu.classList.add("hidden");
        overlay.classList.add("hidden");
        menuButton.classList.remove("hidden");
        ingredientList.classList.add("hidden");
      };

      const closeMenuWithLink = () => {
        closeMenuWithoutLink();
      };

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
  }, [ingredients]);

  return (
    <div className="mx-auto mt-6 max-w-3xl p-0 ">
      <h2 className="mb-1 hidden text-xl font-roboto-serif font-bold text-black sm:block">
        Recommended products
      </h2>
      <p className="text-black font-medium mb-3 ads_disclosure text-xs hidden md:block">
        [Ad] As an Amazon Associate I earn from qualifying purchases*
      </p>


      {/* Ingredient List Wrapper */}
      <div id="ingredient-list" className="hidden sm:block">
        <ul className="space-y-1">
          {ingredients?.map((ingredient, index) => (
            <li key={index} className="flex items-center pb-3">
              <a
                href={ingredient.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center">
                <img
                  src={ingredient.productImageUrl}
                  alt={ingredient.title}
                  className="ml-0 mr-4 h-[103px] w-[88px] object-cover"
                />
              </a>
              <div className="flex flex-1 flex-col justify-center">
                <a
                  href={ingredient.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-green-600">
                  <h3 className="mb-1 text-sm font-normal leading-tight text-[#007185] self-stretch">
                    {ingredient.title}
                  </h3>
                </a>
                <div className="flex h-[24px] w-[84px]">
                  {renderStars(ingredient.starsRating)}
                </div>
                <p className="text-xs font-normal text-[#565959]">
                  {ingredient.countRatings != null
                    ? ingredient.countRatings.toLocaleString("en-US")
                    : "0"}
                  opinions
                </p>
                <p className="text-base font-normal leading-6 text-[#B12704]">
                  US${ingredient.price.toFixed(2)}
                </p>

                {/* Adjusting the discount display */}
                {ingredient.discount && (
                  <div className="mt-1 inline-flex items-center">
                    <span className="rounded bg-green-200 px-2 py-1 text-xs font-bold text-green-700">
                      {ingredient.discount}% OFF
                    </span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop Wishlist Button */}
      <a
        href="#"
        className="bg-[#40749C] border border-[#40749C] text-white mt-4 hidden flex-[1_0_0] items-center justify-center gap-2 rounded-lg p-4 text-base font-semibold hover:bg-white hover:text-[#40749C] hover:border-[#40749C]
                        transition-colors duration-300 ease-in-out sm:flex">
        Get this wishlist
      </a>

      {/* Mobile Menu Button */}
      <div
        id="mobile-menu-button"
        className={`fixed bottom-4 left-4 right-4 z-40 sm:hidden ${isOverlayVisible ? 'pointer-events-none' : ''}`} // Disable pointer events if overlay is visible
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 24,
            display: "inline-flex"
          }}
        >
          <div
            style={{
              flex: "1 1 0",
              height: 51,
              padding: 16,
              background: "#40749C",
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              display: "flex"
            }}
          >
            <div
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "600",
              wordWrap: "break-word"
            }}
          >
            {"Get Products"}
          </div>

          </div>
        </div>
      </div>


            {/* Overlay */}
      <div
        id="overlay"
        className="fixed inset-0 z-40 hidden bg-gray-600 bg-opacity-60 sm:hidden"></div>

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
          {"🛒 Products"}
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
          href={ingredients?.length > 0 ? ingredients[0].url : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs"
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
    {ingredients?.map((ingredient, index) => (
      <li key={index} className="flex-shrink-0 w-[40%]"> {/* Adjust width for two full and partial third */}
                {/* Left-aligned Image (same as the text) */}
          <div className="mb-2">
            <a
              href={ingredient.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={ingredient.productImageUrl}
                alt={ingredient.title}
                className="h-[103px] w-[88px] object-cover"
              />
            </a>
          </div>

        {/* Left-Aligned Content */}
        <div className="text-left">
          <a
            href={ingredient.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-green-600">
            <h3 className="self-stretch text-sm font-normal leading-tight text-[#007185] line-clamp-3">
              {ingredient.title}
            </h3>
          </a>
          <div className="flex h-[24px]"> {/* Star rating */}
            {renderStars(ingredient.starsRating)}
          </div>
          <p className="text-xs font-normal text-[#565959]">
            {ingredient.countRatings.toLocaleString("en-US")} opinions
          </p>
          <p className="text-base font-normal leading-6 text-[#B12704]">
            US${ingredient.price.toFixed(2)}
          </p>
          {ingredient.discount && (
            <span className="inline-block rounded bg-green-200 px-2 text-xs font-bold text-green-700">
              {ingredient.discount}% OFF
            </span>
          )}
        </div>
      </li>
    ))}
  </ul>

  <p className="relative flex items-center justify-center mb-4 ads_disclosure" style={{ fontSize: "0.63rem" }}>
    [Ad] As an Amazon Associate I earn from qualifying purchases*
  </p>
</div>

    </div>
  );
};

export default IngredientList;
