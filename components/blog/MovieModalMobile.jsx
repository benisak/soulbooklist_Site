import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

export default function MovieModalMobile({ post }) {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const modalRef = useRef(null);
const rentButtonRef = useRef(null);
const [modalHeight, setModalHeight] = useState("auto");
useEffect(() => {
  if (showModal) {
    // Function to calculate and set the modal height
    const calculateModalHeight = () => {
      if (rentButtonRef.current && modalRef.current) {
        // Get the position of the Rent HD button relative to the viewport
        const buttonRect = rentButtonRef.current.getBoundingClientRect();
        
        // Get the position of the modal relative to the viewport
        const modalRect = modalRef.current.getBoundingClientRect();
        
        // Calculate the distance from the top of the modal to the bottom of the Rent HD button
        // Add a small buffer (10px) to ensure the button is fully visible
        const heightNeeded = buttonRect.bottom - modalRect.top + 10;
        
        // Set the modal height
        setModalHeight(`${heightNeeded}px`);
      }
    };

    // Initial calculation
    // Use a small timeout to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      calculateModalHeight();
    }, 50);

    // Recalculate on window resize
    window.addEventListener('resize', calculateModalHeight);

    // Cleanup
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateModalHeight);
    };
  }
}, [showModal]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [showModal]);

  if (!isMobile) return null;

  const formatDurationToHours = (minutes) => {
    if (!minutes || isNaN(minutes)) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} h ${mins} min`;
  };

  const formattedDuration = post?.duration ? formatDurationToHours(post.duration) : "N/A";

  // ⭐ Calculate Star Rating (out of 5)
  const starRating = post?.rating / 2;
  const fullStars = Math.floor(starRating);
  const halfStar = starRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {/* ✅ Mobile Button */}
<div 
  id="mobile-menu-button"
  className="fixed bottom-4 left-4 right-4 z-40 sm:hidden"
>
  <div 
    className="w-full flex justify-center items-center bg-[#2F88FF] text-white text-lg font-semibold py-3 px-6 rounded-lg cursor-pointer shadow-lg"
    onClick={() => setShowModal(true)}
  >
    <span>Get it on Amazon Prime</span>
   </div>
  </div>


      {/* ✅ Full-Screen Modal */}
      <AnimatePresence>
  {showModal && (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        ref={modalRef} // Add this ref
        className="w-full bg-[#1F1F1F] rounded-t-lg shadow-lg text-white flex flex-col"
        style={{ height: modalHeight }} // Dynamic height from state
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
      >
        {/* ✅ HEADER - Fixed at top */}
        <div className="w-full bg-[#2F88FF] px-4 py-3 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center">
            <span
              style={{ color: "var(--Whyte, #FFF)" }}
              className="text-[16px] font-bold leading-normal"
            >
              Get it on Amazon Prime
            </span>
          </div>
          
          {/* Action buttons container */}
          <div className="flex items-center gap-4">
            {/* Rent Now Button */}
            <a 
              href={post?.amazon_product_movie?.url}
              onClick={(e) => {
                // Close the modal first, then follow the link
                setShowModal(false);
              }}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white text-[14px] font-semibold cursor-pointer"
            >
              Rent Now
            </a>
            
            {/* X Button */}
            <button onClick={() => setShowModal(false)} className="w-6 h-6 flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path d="M18 6.75781L6 18.7578" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6.75781L18 18.7578" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>


        {/* ✅ MODAL CONTENT - Scrollable area */}
        <div className="p-4 pt-4 overflow-y-auto flex-1">
          {/* Movie Title */}
          <h2
            style={{ color: "var(--Whyte, #FFF)" }}
            className="mb-4 text-[18px] font-bold leading-normal"
          >
            {post?.title}
          </h2>
                      
          {/* Flex container for Image + Info */}
          <div className="flex gap-4">
            {/* Left Column: Image */}
            <div>
              <img 
                src={post?.mainImage?.asset?.url} 
                alt={post?.title} 
                className="w-[156px] h-[169px] object-cover rounded-[12px]"
              />
            </div>

            {/* Right Column: Info Section */}
            <div className="flex flex-col justify-between flex-1">
              {/* Movie Summary */}
              <p className="text-[#FFFFFF] text-xs font-normal line-clamp-5 mb-2">
                {post?.plot_summary}
              </p>

              {/* Duration Row */}
              <p className="text-[var(--Whyte,#FFF)] font-inter text-[14px] font-semibold leading-normal">
                {formattedDuration}
              </p>

              {/* Stars Row */}
              <div className="mt-2 flex items-center">
                {[...Array(fullStars)].map((_, index) => (
                  <svg
                    key={`full-${index}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="19"
                    viewBox="0 0 20 19"
                    className="text-[#FAAE21]"
                  >
                    <path
                      d="M10.1053 0.408203L12.374 7.39077H19.7159L13.7762 11.7062L16.045 18.6888L10.1053 14.3733L4.16554 18.6888L6.43431 11.7062L0.494587 7.39077H7.83649L10.1053 0.408203Z"
                      fill="currentColor"
                    />
                  </svg>
                ))}

                {halfStar && (
                  <svg
                    key="half"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="19"
                    viewBox="0 0 20 19"
                    className="relative"
                  >
                    <defs>
                      <linearGradient id="halfGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="50%" stopColor="#FAAE21" />
                        <stop offset="50%" stopColor="#D1D1D1" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M10.1053 0.408203L12.374 7.39077H19.7159L13.7762 11.7062L16.045 18.6888L10.1053 14.3733L4.16554 18.6888L6.43431 11.7062L0.494587 7.39077H7.83649L10.1053 0.408203Z"
                      fill="url(#halfGradient)"
                    />
                  </svg>
                )}

                {[...Array(emptyStars)].map((_, index) => (
                  <svg
                    key={`empty-${index}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="19"
                    viewBox="0 0 20 19"
                    className="text-[#D1D1D1]"
                  >
                    <path
                      d="M10.1053 0.408203L12.374 7.39077H19.7159L13.7762 11.7062L16.045 18.6888L10.1053 14.3733L4.16554 18.6888L6.43431 11.7062L0.494587 7.39077H7.83649L10.1053 0.408203Z"
                      fill="currentColor"
                    />
                  </svg>
                ))}
              </div>

              {/* IMDb Row */}
              <div className="mt-2">
                <span className="text-[var(--Whyte,#FFF)] font-inter text-[14px] font-semibold leading-normal">
                  IMDb {post?.rating || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* ✅ First Button - Visible without scrolling */}
          <div className="mt-6 space-y-3 pb-2">
            <a 
              href={post?.amazon_product_movie?.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full h-11 px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-white flex justify-center items-center"
              id="rent-hd-button" // This ID is crucial for our height calculation
              ref={rentButtonRef} // Add this ref
            >
              <span className="text-[var(--Whyte,#FFF)] text-[14px] font-semibold leading-normal">
                Rent HD ${post?.amazon_product_movie?.rent_price || "N/A"}
              </span>
            </a>

            {/* ✅ Remaining Buttons - Require scrolling */}
            <div className="mt-3"> {/* Reduced margin to ensure proper layout */}
              <a 
                href={post?.amazon_product_movie?.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full h-11 px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-white flex justify-center items-center mb-3"
              >
                <span className="text-[var(--Whyte,#FFF)] text-[14px] font-semibold leading-normal">
                  Buy HD ${post?.amazon_product_movie?.buy_price || "N/A"}
                </span>
              </a>

              <a 
                href={post?.amazon_product_movie?.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full h-11 px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-white flex justify-center items-center"
              >
                <span className="text-[var(--Whyte,#FFF)] text-[14px] font-semibold leading-normal">
                  More purchase options
                </span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>



    </>
  );
}
