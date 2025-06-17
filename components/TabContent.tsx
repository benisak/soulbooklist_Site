"use client";
import { useRef, useState, useEffect } from "react";
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import BannerRelatedRecipes from "@/components/bannerRelatedRecipes";
import { ImageAsset, MovieActor, Post } from "@/shared/entities";

interface TabContentProps {
  synopsis_body?: any;
  argument_body?: any;
  cast: MovieActor[];
  multimedia: ImageAsset[];
  relatedRecipes: Post[];
}

export default function TabContent({
  synopsis_body,
  argument_body,
  cast,
  multimedia,
  relatedRecipes,
}: TabContentProps) {
  const synopsisRef = useRef<HTMLDivElement>(null);
  const argumentRef = useRef<HTMLDivElement>(null);
  const castRef = useRef<HTMLDivElement>(null);
  const multimediaRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: "synopsis", label: "Synopsis" },
    { id: "argument", label: "Argument" },
    { id: "cast", label: "Cast" },
    { id: "multimedia", label: "Multimedia" },
    { id: "more", label: "More of this style" },
  ];

  const typographyStyle = {
    fontSize: "var(--Label-Large-Size, 14px)",
    fontStyle: "normal",
    fontWeight: 500,
  };

  const headerTitleStyle = {
    color: "var(--Whyte, #FFF)",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "150%",
  };

  const scrollToSection = (id: string) => {
    isManualScroll.current = true;
    setActiveTab(id);
    const container = document.querySelector(".custom-scrollbar-container") as HTMLDivElement;
  
    if (!container) return;
  
    let target: HTMLDivElement | null = null;
  
    switch (id) {
      case "synopsis":
        target = synopsisRef.current;
        break;
      case "argument":
        target = argumentRef.current;
        break;
      case "cast":
        target = castRef.current;
        break;
      case "multimedia":
        target = multimediaRef.current;
        break;
      case "more":
        target = moreRef.current;
        break;
      default:
        break;
    }
  
    if (container && target) {
      const containerTop = container.getBoundingClientRect().top;
      const targetTop = target.getBoundingClientRect().top;
      const offset = targetTop - containerTop + container.scrollTop;
  
      container.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

    // add below your ref declarations
    const [activeTab, setActiveTab] = useState<string>("synopsis");
    const isManualScroll = useRef(false);

    useEffect(() => {
      const container = document.querySelector(".custom-scrollbar-container");
      if (!container) return;
    
      // Debounce timer handle
      let scrollEndTimer: number;
    
      // When user scrolls, reset the manual-scroll lock after 150ms of no movement
      const onScroll = () => {
        clearTimeout(scrollEndTimer);
        scrollEndTimer = window.setTimeout(() => {
          isManualScroll.current = false;
        }, 150);
      };
      container.addEventListener("scroll", onScroll);
    
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Only update activeTab if this wasn't triggered by a manual click scroll
            if (entry.isIntersecting && !isManualScroll.current) {
              setActiveTab(entry.target.id);
            }
          });
        },
        {
          root: container,
          rootMargin: "0px 0px -50% 0px", // Fire when section top crosses middle
          threshold: 0,                    // As soon as any pixel enters that zone
        }
      );
    
      // Observe each section ref (IDs should already be set in your JSX)
      [synopsisRef, argumentRef, castRef, multimediaRef, moreRef].forEach((r) => {
        if (r.current) observer.observe(r.current);
      });
    
      return () => {
        observer.disconnect();
        container.removeEventListener("scroll", onScroll);
        clearTimeout(scrollEndTimer);
      };
    }, []);
    
  
  const renderSynopsis = () => (
    <article className="prose prose-invert mt-4 w-full text-base leading-6 text-[#F6F6F6] md:mt-4">
      {synopsis_body && <PortableText value={synopsis_body} />}
    </article>
  );

  const renderArgument = () => (
    <article className="prose prose-invert mt-4 w-full text-base font-normal leading-6 text-[#F6F6F6] md:mt-4">
      {argument_body && <PortableText value={argument_body} />}
    </article>
  );

  const renderCast = () => (
    <div className="mt-4 md:mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 md:gap-6 gap-4">
      {cast.map((member) => (
        <div key={member._key} className="flex flex-col items-center text-center">
          <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border border-gray-500">
            <img
              src={member.actor.image?.asset.url || "/default-avatar.png"}
              alt={member.actor.name}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-2 text-[#F6F6F6] text-center text-xs font-normal leading-normal">
            {member.actor.name}
          </p>
          <p className="text-[#F6F6F6] text-center text-[11px] font-normal leading-[20px]">
            {member.role}
          </p>
        </div>
      ))}
    </div>
  );

  // Single scrollable container with fixed height and hidden horizontal scroll
  // Added 'custom-scrollbar-container' for CSS targeting
  // Removed pr-2 as custom scrollbar might not need it
  const scrollableContainerClass = "h-[480px] md:h-[600px] overflow-y-auto overflow-x-hidden custom-scrollbar-container"; // [1][15]

  return (
    <div className="w-full">
      {/* Navigation Buttons */}
<div className="sticky top-0 z-10 bg-black py-2">
<div className="flex overflow-x-auto md:overflow-x-visible space-x-1.5 mb-3 mt-3 lg:space-x-2.5 lg:mt-5 lg:mb-5">
    {tabs.map(tab => {
      const isActive = tab.id === activeTab;
      return (
        <button
          key={tab.id}
          onClick={() => scrollToSection(tab.id)}
          className={
            `px-2.5 h-8 md:h-10 rounded-md transition-colors text-sm md:text-base flex-shrink-0 ` +
            (isActive
              ? "bg-[#f5c518] text-black"
              : "bg-black border border-[#f5c518] text-[#f5c518] hover:bg-gray-900")
          }
        >
          <span style={typographyStyle}>{tab.label}</span>
        </button>
      );
    })}
  </div>

</div>


      {/* Single Scrollable Container */}
      <div className={scrollableContainerClass}>
        <div className="mt-5 md:mt-4 space-y-6 md:space-y-7 px-1"> {/* Added slight horizontal padding inside */}
          <div ref={synopsisRef} id="synopsis">
            <h4 style={headerTitleStyle}>Synopsis</h4>
            {renderSynopsis()}
          </div>

          <div ref={argumentRef} id="argument">
            <h4 style={headerTitleStyle}>Argument</h4>
            {renderArgument()}
          </div>

          <div ref={castRef} id="cast">
            <h4 style={headerTitleStyle}>Cast</h4>
            {renderCast()}
          </div>

          <div ref={multimediaRef} id="multimedia">
            <h4 style={headerTitleStyle}>Multimedia</h4>
            <MultimediaCarousel multimedia={multimedia} />
          </div>

          <div ref={moreRef} id="more">
            <h4 style={headerTitleStyle}>More of this style</h4>
            <BannerRelatedRecipes relatedRecipes={relatedRecipes} />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- MultimediaCarousel component remains unchanged ---
const MultimediaCarousel = ({ multimedia }: { multimedia: ImageAsset[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!multimedia || multimedia.length === 0) {
    return <p className="text-gray-400">No multimedia available</p>;
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? multimedia.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === multimedia.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="mt-4 md:mt-4 md:mb-3 relative">
      {/* Main Image Display */}
      <div className="rounded-lg overflow-hidden w-full h-[250px] md:h-[379px] flex justify-center items-center">
        <img
          src={multimedia[currentIndex].asset.url}
          alt={multimedia[currentIndex].alt || "Multimedia Image"}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      </div>
      {/* Navigation Dots & Arrows */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex">
          {multimedia.map((_, index) => (
            <span
              key={index}
              className={`mx-1 transition-all duration-200 ${
                index === currentIndex
                  ? "w-[23px] h-[8px] bg-[#F5C518] rounded-[20px]"
                  : "w-[8px] h-[8px] bg-[#D9D9D9] rounded-full"
              }`}
            ></span>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="w-[32px] h-[32px] flex justify-center items-center"
          >
            {/* SVG Left Arrow */}
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M20 24L12 16L20 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="w-[32px] h-[32px] flex justify-center items-center"
          >
            {/* SVG Right Arrow */}
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M12 24L20 16L12 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      {/* Thumbnails */}
      <div className="flex items-center gap-2 overflow-x-auto mt-4">
        {multimedia.map((media, index) => (
          <div
            key={media._key}
            className={`relative w-24 h-16 md:w-36 md:h-24 rounded-lg overflow-hidden cursor-pointer border-2 ${
              index === currentIndex ? "border-yellow-400" : "border-transparent"
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <img
              src={media.asset.url}
              alt={media.alt || "Multimedia Thumbnail"}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};