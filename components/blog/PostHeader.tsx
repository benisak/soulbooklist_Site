"use client";
import CategoryLabel from "./category";

interface PostHeaderProps {
  title: string;
  categories: any[];
}

export default function PostHeader({ title, categories }: PostHeaderProps) {
  return (
    <div className="mt-2 md:mb-2 mb-4 flex w-full flex-col items-start gap-2 md:mt-1">
      <div className="flex flex-wrap w-full">
        <CategoryLabel categories={categories} />
      </div>
      <h2 className="w-full font-roboto-serif text-2xl font-bold tracking-tight text-[#1F1F1F] dark:text-[#F6F6F6] lg:text-4xl lg:leading-snug">
        {title}
      </h2>

    </div>
  );
}
