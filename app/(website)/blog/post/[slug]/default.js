// Movies Project
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";
import { notFound } from "next/navigation";
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import { urlForImage } from "@/lib/sanity/image";
import { parseISO, format } from "date-fns";
import CategoryLabel from "@/components/blog/category";
import MovieModal from "@/components/blog/movie_modal";
import MovieModalMobile from "@/components/blog/MovieModalMobile";
import MovieDetails from "@/components/blog/moviedetails";
import BannerMovie from "@/components/blog/bannermovie";
import TabContent from '@/components/TabContent';

export default function Post(props) {
  const { loading, post, relatedRecipes } = props;

  // only show BannerMovie if this query-param is correct
  const [hasQueryParamVerified, setHasQueryParamVerified] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const verification = new URLSearchParams(window.location.search).get("verification");
      if (verification === "dreamcode") {
        setHasQueryParamVerified(true);
      }
    }
  }, []);

  // track mobile vs desktop
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize(); // initialize
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // desktop-only modal timer (if you still need it)
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    if (window.innerWidth >= 768) {
      const timer = setTimeout(() => setModalOpen(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!loading && (!post || !post.slug)) {
    notFound();
  }
  // Helper function to convert duration in minutes to hours:minutes format
  const formatDurationToHours = (durationInMinutes) => {
    const hours = Math.floor(durationInMinutes / 60); // Get the hours
    const minutes = durationInMinutes % 60; // Get the remaining minutes
    return `${hours}:${minutes.toString().padStart(2, '0')}`; // Format as "h:mm"
  };

  const formattedDuration = post.duration ? formatDurationToHours(post.duration) : "N/A";

  const formattedDurationP = post.duration ? Number(post.duration) : null;



  const imageProps = post?.mainImage
    ? urlForImage(post?.mainImage)
    : null;
  
    

  return (
    <div className="bg-black">
       {/* Dark Overlay (Only appears on desktop when modal is open) */}
       {modalOpen && (
        <div
          id="page-overlay"
          className="fixed inset-0 bg-[rgba(33,33,33,0.75)] z-40"
        ></div>

        
      )}

          {/* Desktop modal */}
      {modalOpen && !isMobile && <MovieModal post={post} onClose={() => setModalOpen(false)} />}

      {/* Mobile modal can be replaced by BannerMovie */}
      {/* Only mount BannerMovie if both “verified” AND “isMobile” are true */}
      {hasQueryParamVerified && isMobile && (
        <div
          className="
            relative
            -mr-[calc(90vw-100%)]
            md:-ml-[calc(48vw-100%)]
            md:-mr-[calc(72vw-100%)]
            bg-transparent
            md:bg-[#F6F6F6]
            md:p-0
          "
        >
          <BannerMovie post={post} />
        </div>
      )}
      
      <div className="bg-black">
      {/* Mobile Modal (Handles Everything Internally) */}
      <MovieModalMobile post={props.post} />
    </div>

      {/* Movie Modal (Only on Desktop) */}
      {modalOpen && <MovieModal isOpen={modalOpen} onClose={() => setModalOpen(false) } main_image_url={post.mainImage.asset.url} 
      title={post.title} plot_summary={post.plot_summary} duration={formattedDurationP} rating={post.rating} url={post.amazon_product_movie.url} 
      buy_price={post.amazon_product_movie?.buy_price} rent_price={post.amazon_product_movie?.rent_price}/>}

      <Container className="relative">
        {/* Main container for mobile and desktop */}
<div className="flex flex-col items-start gap-6 md:px-0 lg:w-[1199px] lg:flex-row lg:gap-[112px]">
  {/* First Column */}
  <div className="mx-auto w-full md:mx-0 md:w-auto lg:w-[616px]">
    {/* Mobile-specific width */}
    <div className="flex w-full flex-col items-center px-0 md:items-start md:px-0">
      
      {/* Title and Rating Row */}
      <div className="mt-0 flex w-full flex-col gap-2 md:mt-4 md:flex-row md:items-center md:justify-between">
        {/* Title */}
        <h2 className="w-full text-3xl font-semibold tracking-tight text-[#F6F6F6] dark:text-[#F6F6F6] lg:text-4xl lg:leading-snug">
          {post.title}
        </h2>

        {/* Rating - Only visible on md and up */}
        <div className="hidden md:flex flex-col items-end">
          <span className="hidden lg:block text-white text-xs font-normal mb-0 pl-[2px]">
            Rating
          </span>
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
              <path d="M3.9425 16.7324L5.405 10.8166L0.5 6.83769L6.98 6.31137L9.5 0.732422L12.02 6.31137L18.5 6.83769L13.595 10.8166L15.0575 16.7324L9.5 13.5956L3.9425 16.7324Z" fill="#F5C518"/>
            </svg>
            <span style={{ color: 'white', fontSize: '16px', fontWeight: '600', wordWrap: 'break-word' }}>{post.rating}</span>
            <span style={{ color: 'white', fontSize: '14px', fontWeight: '400', lineHeight: '20px', wordWrap: 'break-word' }}>/10</span>
          </div>
        </div>
      </div>

      {/* Date and Category Row */}
      <div className="mt-3 mb-6 w-full md:mt-1">
        {/* Date */}
        <div className="flex items-center text-sm">
          <time
            className="text-[#F6F6F6]"
            dateTime={post?.publishedAt || post._createdAt}>
            {format(
              parseISO(post?.publishedAt || post._createdAt),
              "MMMM dd, yyyy"
            )}
          </time>
        </div>

      {/* Categories */}
      <div className="mt-2 flex w-full flex-col items-start gap-2 md:mt-1">
        <div className="flex flex-wrap w-full gap-0">
          <CategoryLabel categories={post.categories} />
        </div>
      </div>
      </div>

            {/* Movie Video */}
            <div className="relative z-0 aspect-video w-full overflow-hidden lg:rounded-lg">
              {/* Check if there's a trailer (YouTube URL) */}
              {post.trailer ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${post.trailer.split("v=")[1]}`}  // Extract video ID from URL
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="object-cover"
                />
              ) : (
                imageProps && (
                  <Image
                    src={imageProps.src}
                    alt={post.mainImage?.alt || "Thumbnail"}
                    loading="eager"
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                )
              )}
            </div>

           



            {/* Duration and Rating Container */}
            <div className="w-full mt-4 mb-4">
              {/* Mobile Layout: Duration and Rating in same row */}
              <div className="mb-6 md:hidden w-full flex justify-between items-center">
                <span className="text-[#F6F6F6] text-[14px] font-normal leading-[20px]">
                  Duration: {formattedDuration}
                </span>
                
                {/* Rating component for mobile */}
                <div className="flex flex-col">
                  <span className="text-white text-xs font-normal mb-0 pl-[2px]">
                    Rating
                  </span>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
                      <path d="M3.9425 16.7324L5.405 10.8166L0.5 6.83769L6.98 6.31137L9.5 0.732422L12.02 6.31137L18.5 6.83769L13.595 10.8166L15.0575 16.7324L9.5 13.5956L3.9425 16.7324Z" fill="#F5C518"/>
                    </svg>
                    <span style={{ color: 'white', fontSize: '16px', fontWeight: '600', wordWrap: 'break-word' }}>{post.rating}</span>
                    <span style={{ color: 'white', fontSize: '14px', fontWeight: '400', lineHeight: '20px', wordWrap: 'break-word' }}>/10</span>
                  </div>
                </div>
              </div>

              {/* Desktop Layout: Only Duration */}
              <div className="mb-2 hidden md:block">
                <span className="text-[#F6F6F6] text-[14px] font-normal leading-[20px]">
                  Duration: {formattedDuration}
                </span>
                
              </div>

              <span className="text-[#FFF] text-[16px] font-normal leading-[24px]">
                {post.plot_summary}
              </span>
              
              {/* Movie Details*/}
              <div className="block md:hidden mt-5">
                <MovieDetails amazon_product_movie={post.amazon_product_movie} box_office={post.box_office}
                  budget={post.budget} duration={formattedDuration} director={post.director} main_cast={post.main_cast} 
                  mainimage_url={post.mainImage.asset.url} plot_summary={post.plot_summary} rating={post.rating} title={post.title} writers={post.writers} />
              </div>

              <article>
            {/* Other post content */}
            <TabContent 
              synopsis_body={post.synopsis_body}
              argument_body={post.argument_body}
              cast={post.actors}
              multimedia={post.multimedia_gallery}
              relatedRecipes={relatedRecipes}
            />
            </article>

            
          {/* Archive Link */}
        <div className="archive-link flex w-full justify-center sm:px-[30px] sm:py-[0px] md:py-0  pt-[20px] md:pt-[20px]">
          <Link
            href="/archive"
            className="mt-8 relative inline-flex w-full max-w-[100%] items-center justify-center gap-1 rounded-md border border-[#f5c518] bg-black px-4 py-3 text-center text-sm font-medium text-[#f5c518] focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 md:w-auto"
            style={{
              borderRadius: "8px",
              border: "1px solid var(#f5c518)",
              color: "var(#f5c518)",
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
            

            </div>
          

          {/* Second Column */}
          <div className="mt-0 flex w-full flex-col gap-8 lg:mt-0 lg:w-[383px]">

          {/* Movie Details*/}
          <div className="hidden md:block md:mt-5">
            <MovieDetails amazon_product_movie={post.amazon_product_movie} box_office={post.box_office}
              budget={post.budget} duration={formattedDuration} director={post.director} main_cast={post.main_cast} 
              mainimage_url={post.mainImage.asset.url} plot_summary={post.plot_summary} rating={post.rating} title={post.title} writers={post.writers} />
          </div>



            {/* Subscription Component (Desktop Only) */}
            <div className="hidden w-full flex-col gap-6 rounded-lg bg-[#1F1F1F] p-6 lg:flex">
              {/* Heading Section */}
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold text-white">
                  Be part of the club
                </h3>
                <p className="text-base font-normal leading-6 text-white">
                  Subscribe to receive weekly news and the latest
                  movies
                </p>
              </div>

              {/* Input and Button Section */}
              <div className="flex gap-2">
                {/* Email Input */}
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-[#1F1F1F] h-[51px] w-[226px] rounded-xl border border-[#7D7D7D] px-4 text-base text-[#7D7D7D] focus:outline-none"
                />
                {/* Subscribe Button */}
                <button
                  style={{ backgroundColor: "#F5C518" }}
                  className="h-[51px] w-[101px] break-words rounded-lg text-[16px] font-semibold text-black hover:opacity-90">
                  Suscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      

      {/* Mobile-specific Subscription Component (Full Width) */}
      <div className="flex w-full flex-col items-start justify-center gap-6 bg-[#1F1F1F] px-4 py-6 lg:hidden">
        <div className="flex w-full flex-col items-start justify-center gap-4">
          <h3 className="break-words text-[20px] font-bold text-white">
            Be part of the club
          </h3>
          <p className="break-words text-[16px] font-normal leading-[24px] text-white">
            Subscribe to receive weekly news and the latest movies
          </p>
        </div>
        <div className="flex w-full flex-row items-center gap-2">
          <input
            type="email"
            placeholder="Email"
            className="h-[51px] flex-[219] rounded-lg border border-[#7D7D7D] bg-[#1F1F1F] px-4 text-base text-[#7D7D7D] focus:outline-none"
          />
          <button
            style={{ backgroundColor: "#F5C518" }}
            className="h-[51px] flex-[101] rounded-md text-[16px] font-semibold text-black hover:opacity-90">
            Suscribe
          </button>
        </div>
      </div>
    </div>
    
  );
}