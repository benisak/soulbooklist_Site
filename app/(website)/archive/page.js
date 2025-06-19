import { Suspense } from "react";
import Archive from "./archive";
import Loading from "@/components/loading";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function ArchivePage({ searchParams }) {
  return (
    <div className="bg-white py-6 px-4 md:px-[160px]">
      <div className="relative text-black">
        <h1 className="font-roboto-serif text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
          Books
        </h1>
        <div className="text-center">
          <p className="text-black text-lg mt-2">
            See all the soul books here
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
