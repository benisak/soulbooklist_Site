import { Suspense } from "react";
import Archive from "./archive";
import Loading from "@/components/loading";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function ArchivePage({ searchParams }) {
  return (
    <div className="bg-black py-6 px-4 md:px-[160px]">
      <div className="relative text-[#F5C518]">
        <h1 className="text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
          Movies and Series
        </h1>
        <div className="text-center">
          <p className="text-white text-lg mt-2">
            See all the movie reviews here
          </p>
        </div>
        {searchParams ? (
          <Archive searchParams={searchParams} />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
