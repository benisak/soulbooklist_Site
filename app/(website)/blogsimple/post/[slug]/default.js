"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import { urlForImage } from "@/lib/sanity/image";
import IngredientList from "@/components/blog/ingredientList";
import { BannerAd } from "@/components/blog/banner";

// Utility function for robust string validation
const isValidString = (val) => typeof val === "string" && val.trim() !== "";

export default function Post({ post, loading }) {
  const [hasQueryParamVerified, setHasQueryParamVerified] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const verification = params.get("verification");
    if (verification === "dreamcode") {
      setHasQueryParamVerified(true);
    }
  }, []);

  if (!loading && (!post || !post.slug)) {
    notFound();
  }

  const imageProps = post?.mainImage ? urlForImage(post?.mainImage) : null;
  const hasPostImage = imageProps && isValidString(imageProps.src);
  const hasWidget = post.useWidget && isValidString(post.widgetCode?.code);

  return (
    <div className="bg-black"> {/* 🔥 Main Wrapper with black background */}
      <Container className="relative">
        <div className="flex flex-col items-start gap-6 md:px-0 lg:w-[1199px] lg:flex-row lg:gap-[112px]">
          {/* First Column */}
          <div className="mx-auto w-full md:mx-0 md:w-auto lg:w-[616px]">
            <div className="flex w-full flex-col items-center px-0 md:items-start md:px-0">
              {/* Title */}
              <h2 className="w-full text-3xl font-semibold tracking-tight text-[#F6F6F6] dark:text-[#F6F6F6] lg:text-4xl lg:leading-snug">
                {post.title}
              </h2>

              {/* Recipe Image or Widget */}
              <div
                className={
                  hasWidget || hasPostImage
                    ? "mt-6 md:mt-11 w-full overflow-hidden lg:rounded-lg"
                    : "mt-0 md:mt-0 w-full overflow-hidden lg:rounded-lg"
                }
              >
                {hasWidget ? (
                  <div
                    className="relative w-full"
                    style={{ minHeight: "360px" }}
                    dangerouslySetInnerHTML={{ __html: post.widgetCode.code }}
                  />
                ) : hasPostImage ? (
                  <div className="relative aspect-video w-full overflow-hidden lg:rounded-lg">
                    <Image
                      src={imageProps.src}
                      alt={post.mainImage?.alt || "Thumbnail"}
                      loading="eager"
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
              </div>

              {/* Recipe Body */}
              <article className="prose prose-invert mb-3 mt-6 w-full prose-a:text-blue-400 md:mt-11">
                {post.body && <PortableText value={post.body} />}
              </article>
            </div>

            {/* Banner Ad */}
            {hasQueryParamVerified && (
              <div className="relative -mr-[calc(90vw-100%)] md:-ml-[calc(48vw-100%)] md:-mr-[calc(72vw-100%)] bg-transparent md:bg-[#F6F6F6] md:p-0">
                <BannerAd
                  ingredients={post.ingredients}
                  modal_title={post.modal_title}
                />
              </div>
            )}

            {/* Mobile Version */}
            <div className="archive-link flex w-full justify-center sm:px-[30px] sm:py-[0px] md:py-0">
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

          {/* Second Column */}
          <div className="mt-8 flex w-full flex-col gap-8 lg:mt-0 lg:w-[383px]">
            {/* Ingredients List */}
            <IngredientList
              ingredients={post.ingredients}
              modal_title={post.modal_title}
            />

            {/* Subscription Component (Desktop Only) */}
            <div className="hidden flex-col gap-6 rounded-lg bg-[#1F1F1F] p-6 lg:flex lg:max-w-[360px] lg:self-center w-full">
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
                  className="h-[51px] w-[101px] break-words rounded-lg text-[14px] font-semibold text-black hover:opacity-90">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile-specific Subscription Component */}
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
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
