import { useEffect, useState } from "react";

// Reusable star component based on the provided SVG
const StarIcon = ({ variant = "full" }) => {
  if (variant === "empty") {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="19" 
        viewBox="0 0 20 19" 
        fill="none"
      >
        <path 
          d="M10.1053 0.408203L12.374 7.39077H19.7159L13.7762 11.7062L16.045 18.6888L10.1053 14.3733L4.16554 18.6888L6.43431 11.7062L0.494587 7.39077H7.83649L10.1053 0.408203Z" 
          fill="#D1D1D1"
        />
      </svg>
    );
  }
  // For "full" (and half-star, if implemented as full) render the painted star
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="19" 
      viewBox="0 0 20 19" 
      fill="none"
    >
      <path 
        d="M10.1053 0.408203L12.374 7.39077H19.7159L13.7762 11.7062L16.045 18.6888L10.1053 14.3733L4.16554 18.6888L6.43431 11.7062L0.494587 7.39077H7.83649L10.1053 0.408203Z" 
        fill="#FAAE21"
      />
    </svg>
  );
};


export default function MovieModal({ 
  isOpen, 
  onClose, 
  main_image_url, 
  title, 
  plot_summary, 
  duration, 
  rating, 
  url, 
  rent_price, 
  buy_price, 
  discount_price 
}) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [showModal]);

  // Formats duration as "2 h 14 min"
  const formatDurationToHours = (minutes) => {
    if (!minutes || isNaN(minutes)) return "N/A";
    const totalMinutes = Number(minutes);
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return `${hours} h ${mins} min`;
  };

  const formattedDuration = duration ? formatDurationToHours(duration) : "N/A";

  // Converts the rating (out of 10) to a scale of 5
  const starRating = rating / 2;
  const fullStars = Math.floor(starRating);
  const halfStar = starRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 justify-center items-center z-50 bg-[#1F1F1F] bg-opacity-50 hidden md:flex">
      {/* Modal Container */}
      <div className="relative bg-[#1F1F1F] text-white w-[588px] h-[274px] rounded-lg shadow-xl overflow-hidden">
        {/* Header Bar */}
<div className="bg-[#2F88FF] flex items-center justify-between px-4 py-2 rounded-t-lg relative">
  <div className="flex items-center">
    <span className="text-white text-[16px] font-bold leading-normal">
      Get it on Amazon Prime
    </span>
  </div>

  <button 
    onClick={onClose}
    className="absolute top-2 right-4 text-white hover:opacity-80 transition-opacity"
    aria-label="Close"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="25" 
      viewBox="0 0 24 25" 
      fill="none"
    >
      <path d="M18 6.75781L6 18.7578" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6.75781L18 18.7578" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </button>
</div>

        {/* Modal Content with 24px vertical padding */}
        <div className="flex pt-6 pb-6 px-4">
          {/* Movie Image with fixed dimensions */}
          <div className="flex-shrink-0">
            <img 
              src={main_image_url} 
              alt="Movie Poster"
              className="w-[216px] h-[186px] object-cover rounded"
            />
          </div>

          {/* Movie Details */}
          <div className="ml-5 flex flex-col justify-between flex-1">
            <div>
              {/* Movie Title */}
              <h2 className="text-white font-inter text-[18px] font-bold leading-normal mb-4">
                {title}
              </h2>
               {/* Plot Summary with updated typography */}
               <p className="text-xs text-white font-normal leading-normal mt-1 line-clamp-2">
                {plot_summary}
              </p>
              <div className="flex items-center mt-4 space-x-4">
                {/* Movie Duration */}
              <span 
                className="text-white text-[14px] font-semibold leading-normal"
              >
                {formattedDuration}
              </span>

                <div className="flex items-center">
                  {[...Array(fullStars)].map((_, i) => (
                    <StarIcon key={`full-${i}`} variant="full" />
                  ))}
                  {halfStar && (
                    <StarIcon key="half" variant="full" />
                  )}
                  {[...Array(emptyStars)].map((_, i) => (
                    <StarIcon key={`empty-${i}`} variant="empty" />
                  ))}
                </div>
                <span 
                  className="text-white text-[14px] font-semibold leading-normal"
                >
                  IMDb {rating}
                </span>

              </div>
            </div>
            <div className="flex space-x-2">

          {/* Purchase Options */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-[75px] h-[44px] py-4 px-2 justify-center items-center gap-[10px] rounded-[8px] border border-white text-white text-sm font-semibold leading-normal hover:bg-gray-800"
          >
            Rent HD ${rent_price}
          </a>
          {discount_price ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-[113px] h-[44px] py-4 px-2 justify-center items-center gap-[10px] rounded-[8px] border border-white text-white text-sm font-semibold leading-normal hover:bg-gray-800"
            >
              Buy movie HD <s className="text-xs opacity-70">${buy_price}</s> ${discount_price}
            </a>
          ) : (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-[113px] h-[44px] py-4 px-2 justify-center items-center gap-[10px] rounded-[8px] border border-white text-white text-sm font-semibold leading-normal hover:bg-gray-800"
            >
              Buy movie HD ${buy_price}
            </a>
          )}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-[120px] h-[44px] py-4 px-2 justify-center items-center gap-[10px] rounded-[8px] border border-white text-white text-sm font-semibold leading-normal hover:bg-gray-800"
          >
            More purchase options
          </a>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
