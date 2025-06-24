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
import SubscriptionDesktop from "@/components/SubscriptionDesktop";
import SubscriptionMobile from "@/components/SubscriptionMobile";
import IngredientList from "@/components/blog/ingredientList";
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

      {/* Mobile BannerMovie (on verification) */}
      {hasQueryParamVerified && isMobile && (
        <div className="relative -mr-[calc(90vw-100%)] md:-ml-[calc(48vw-100%)] md:-mr-[calc(72vw-100%)] bg-transparent md:bg-[#F6F6F6] md:p-0">
          <BannerMovie post={post} />
        </div>
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

            </div>
          </div>

          {/* Right column */}
          <div className="mt-0 flex w-full flex-col gap-8 lg:mt-0 lg:w-[383px]">
            <IngredientList
                ingredients={post.ingredients}
              />
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
