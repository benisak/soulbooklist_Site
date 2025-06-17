import { Suspense } from "react";
import Search from "./search";
import Input from "./input";
import Loading from "@/components/loading";
import CategoryList from "@/components/categorylist";
import Subscription from "@/components/Subscription";
import { getCategorizedPostCategories } from "@/lib/sanity/client";

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q;
  const categoriesForList = await getCategorizedPostCategories(7);

  return (
    <div className="bg-black pt-14">
      <div className="flex items-center justify-center">
        <h1 className="text-[#F5C518] text-brand-primary text-xl font-semibold tracking-tight dark:text-white lg:text-3xl lg:leading-tight">
          {query ? `Search results for "${query}"` : "Search"}
        </h1>
      </div>

      <Input query={query} />

      {/*
        Replacing the Container component with a plain div that applies the same horizontal paddings.
      */}
      <div className="px-4 md:px-[160px]">
        <Suspense key={searchParams.search} fallback={<Loading />}>
          <Search searchParams={searchParams} />
        </Suspense>

        <div
          style={{
            color: "#F5C518",
            fontSize: 30,
            fontWeight: "700",
            wordWrap: "break-word",
            textAlign: "center",
            marginTop: 50,
          }}
        >
          Or explore by category
        </div>

        <div className="w-full pt-8">
          <CategoryList topAndOtherCategories={categoriesForList} />
        </div>
      </div>

      <div className="w-full mt-12 bg-gray-100">
        <Subscription />
      </div>
    </div>
  );
}
