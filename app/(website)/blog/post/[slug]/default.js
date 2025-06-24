"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Container from "@/components/container";
import { notFound } from "next/navigation";
import { urlForImage } from "@/lib/sanity/image";

// Components
import MovieModal from "@/components/blog/movie_modal";
import MovieModalMobile from "@/components/blog/MovieModalMobile";
import BannerMovie from "@/components/blog/bannermovie";
import PostHeader from "@/components/blog/PostHeader";
import PostImage from "@/components/blog/PostImage";
import SynopsisBody from "@/components/blog/SynopsisBody";
import BookCard from "@/components/blog/BookCard";
import SubscriptionDesktop from "@/components/SubscriptionDesktop";
import SubscriptionMobile from "@/components/SubscriptionMobile";
import BannerRelatedRecipes from "@/components/bannerRelatedRecipes";

export default function Post({ loading, post, relatedRecipes }) {
  const [hasQueryParamVerified, setHasQueryParamVerified] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const verification = new URLSearchParams(window.location.search).get("verification");
      if (verification === "dreamcode") setHasQueryParamVerified(true);
    }
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      const timer = setTimeout(() => setModalOpen(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!loading && (!post || !post.slug)) {
    notFound();
  }

  return (
    <div className="bg-white">
      {/* Overlay */}
      {modalOpen && (
        <div id="page-overlay" className="fixed inset-0 bg-[rgba(33,33,33,0.75)] z-40" />
      )}

      {/* Desktop modal */}
      {modalOpen && !isMobile && (
        <MovieModal post={post} onClose={() => setModalOpen(false)} />
      )}

      {/* Mobile BannerMovie (on verification) */}
      {hasQueryParamVerified && isMobile && (
        <div className="relative -mr-[calc(90vw-100%)] md:-ml-[calc(48vw-100%)] md:-mr-[calc(72vw-100%)] bg-transparent md:bg-[#F6F6F6] md:p-0">
          <BannerMovie post={post} />
        </div>
      )}

      {/* Mobile modal */}
      <div className="bg-black">
        <MovieModalMobile post={post} />
      </div>

      {/* Desktop MovieModal with full props */}
      {modalOpen && (
        <MovieModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          main_image_url={post.mainImage.asset.url}
          title={post.title}
          plot_summary={post.plot_summary}
          rating={post.rating}
          url={post.amazon_product_movie.url}
          buy_price={post.amazon_product_movie?.buy_price}
          rent_price={post.amazon_product_movie?.rent_price}
        />
      )}

      {/* Main layout */}
      <Container className="relative">
        <div className="flex flex-col items-start gap-6 md:px-0 lg:w-[1199px] lg:flex-row lg:gap-[112px]">
          {/* Left column */}
          <div className="mx-auto w-full md:mx-0 md:w-auto lg:w-[616px]">
            <div className="flex w-full flex-col items-center px-0 md:items-start">
              <div className="mt-0 flex w-full flex-col gap-2 md:mt-4 md:flex-row md:items-center md:justify-between">
                <PostHeader title={post.title} categories={post.categories} />
              </div>

              <PostImage image={post.mainImage} alt={post.mainImage?.alt} />

              <SynopsisBody value={post.synopsis_body} />

              {/* BookCard (Mobile only) */}
              <div className="block w-full max-w-sm mx-auto sm:hidden">
                <BookCard />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="mt-0 flex w-full flex-col gap-8 lg:mt-0 lg:w-[383px]">
            <div className="hidden lg:block">
              <BookCard />
            </div>
            <SubscriptionDesktop />
          </div>
        </div>
      </Container>

     {/* Related Recipes - Desktop Only */}
      <div className="hidden md:block w-full bg-white px-4 md:px-6 lg:px-0">
        <div className="max-w-[1200px] mx-auto">
          <BannerRelatedRecipes relatedRecipes={relatedRecipes} />
        </div>
      </div>

      {/* Related Recipes - Mobile Only */}
      <div className="block md:hidden w-full bg-white pl-4 pr-0">
        <div className="max-w-[1200px] mx-auto">
          <BannerRelatedRecipes relatedRecipes={relatedRecipes} />
        </div>
      </div>

      {/* Mobile subscription */}
      <SubscriptionMobile />
    </div>
  );
}
