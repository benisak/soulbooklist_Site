import Link          from "next/link";
import PostList      from "@/components/postlist";
import HeroSection   from "@/components/HeroSection";
import Subscription  from "@/components/Subscription";
import CategoryList  from "@/components/categorylist";

import {
  getCategorizedPostCategories,
  getFeaturedRecipes,
  getNonFeaturedRecipes
} from "@/lib/sanity/client";

export default async function HomeLifeStyle() {
  /* ————————————————————————————————————
     Fetch data
  ———————————————————————————————————— */
  const featuredPost      = await getFeaturedRecipes(18); // first 18 posts
  const posts             = await getNonFeaturedRecipes(12);
  const categoriesForList = await getCategorizedPostCategories(7);

  /* ————————————————————————————————————
     JSX
  ———————————————————————————————————— */
  return (
    <>
      {/* Hero – full width */}
      <div className="w-full">
        <HeroSection />
      </div>

      {/* Main wrapper (white background) */}
      <div className="bg-white w-full flex flex-col gap-[1px] lg:gap-[55px] px-4 md:px-[160px]">
        {/* Categories */}
        <div className="w-full pt-8">
          <CategoryList topAndOtherCategories={categoriesForList} />
        </div>

        {/* ───────────────────────────────────────────────────
            RECOMMENDED  (first 6 featured posts)
           ─────────────────────────────────────────────────── */}
        <div className="pb-6 pt-8">
          {featuredPost.length >= 6 && (
            <>
              <h2 className="text-[20px] md:text-[30px] font-roboto-serif font-bold md:font-semibold">
                <strong>Recommended</strong>
              </h2>

              {/* 3-column grid – NO auto-rows-fr */}
              <div className="mb-10 mt-[32px] grid w-full gap-[32px] md:grid-cols-3">
                {featuredPost.slice(0, 6).map((post) => (
                  <PostList
                    key={post._id}
                    post={post}
                    aspect="landscape"
                    pathPrefix="blog"
                    fontWeight="normal"
                    preloadImage
                    /* stretch only inside each row of this section */
                    fillHeight={true}
                    className="w-full h-full"
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Subscription – full-width stripe */}
      <div className="w-full bg-gray-100 mb-8">
        <Subscription />
      </div>

      {/* Other 12 posts (keep old behaviour, no stretch) */}
      <div className="w-full flex flex-col gap-[1px] lg:gap-[55px] px-4 md:px-[160px]">
        {featuredPost.length > 6 && (
          <div className="pb-0 pt-6">
            <div className="mb-2 mt-0 grid w-full gap-[32px] md:grid-cols-3">
      {featuredPost.slice(6, 18).map((post) => (
        <PostList
          key={post._id}
          post={post}
          aspect="landscape"
          pathPrefix="blog"
          fontWeight="normal"
          preloadImage
          fillHeight={true}     
          className="w-full h-full"
        />
      ))}
    </div>
          </div>
        )}

        {/* Archive link */}
        <div className="flex w-full justify-center pb-[56px] md:pb-[32px] pt-[24px]">
          <Link
            href="/archive"
            className="relative inline-flex items-center justify-center gap-1 rounded-md border border-[#40749C] bg-white px-4 py-3 text-sm font-medium text-[#40749C] transition-colors duration-300 hover:bg-[#40749C] hover:text-white md:w-auto"
            style={{ fontSize: 16, fontWeight: 600 }}
          >
            See all content
          </Link>
        </div>
      </div>
    </>
  );
}
