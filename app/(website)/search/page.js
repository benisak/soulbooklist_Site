import { Suspense } from "react";
import Search from "./search";
import Input from "./input";
import Loading from "@/components/loading";
import CategoryList from "@/components/categorylist";
import Subscription from "@/components/Subscription";
import { getCategorizedPostCategories } from "@/lib/sanity/client";

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q;
  const categoriesForList = await getCategorizedPostCategories(7); // Fetching categories  D1D1D1

  return (
    // Replaced the fragment with a <main> tag for semantic HTML.
    // Applied the background color using a Tailwind arbitrary value class.
    <main className="bg-[#FFFFFF]">
      <div className="px-4 md:px-[160px]"> {/* Applied padding here */}
        <div className="pt-8 md:pt-14 flex items-center justify-center">
          <h1 className="font-roboto-serif text-center text-Black-500 text-2xl md:text-4xl font-black">
            {query ? `Search results for "${query}"` : "Search"}
          </h1>
        </div>

        <Input query={query} />

        <div className="w-full"> {/* Wrapping section */}
          <Suspense key={searchParams.search} fallback={<Loading />}>
            <Search searchParams={searchParams} />
          </Suspense>

          {/* Centered Text Above Category List */}
          <div className="text-[#1F1F1F] text-xl md:text-3xl text-[30px] font-bold break-words md:text-center mt-12 font-roboto-serif">
            Or explore by category
          </div>


          {/* Category List Section */}
          <div className="w-full pt-6">
            <CategoryList topAndOtherCategories={categoriesForList} />
          </div>
        </div>
      </div>

      {/* Full-width Subscription Section (moved outside the padded container) */}
      <div className="w-full mt-12">
        <Subscription />
      </div>
    </main>
  );
}
