"use client";
import Link from "next/link";
import {
  AllPostCategories,
  PostCategory,
} from "@/shared/entities/PostCategory";

interface CategoryListProps {
  topAndOtherCategories: AllPostCategories;
  onLinkClick: () => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  topAndOtherCategories,
  onLinkClick,
}) => {
  const { topCategories } = topAndOtherCategories;

  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-3 gap-4 md:grid-cols-4 md:gap-6">
        <h2 className="sr-only">Categories</h2>

        {/* Top Categories */}
        {topCategories.map((category, index) => (
          <Link
            key={category._id}
            href={`/category/${category.slug ? category.slug : "#"}`}
            passHref
            onClick={onLinkClick}
            className={index >= 5 ? "hidden md:flex" : "flex"}
          >
            {/* === CARD STYLES APPLIED HERE === */}
            <div
              className="w-full bg-[#F6F6F6] rounded-lg flex flex-col justify-center items-center p-[10px] gap-[10px]
                         h-[72px] md:h-[88px]" // CHANGED: Set explicit responsive heights
            >
              <span
                className="text-center text-[#40749C] 
                           text-xs font-medium 
                           md:text-base md:font-bold"
              >
                {category.title}
              </span>
            </div>
          </Link>
        ))}

        {/* === "All" CARD: STYLES APPLIED HERE === */}
        <Link
          href="/archive"
          passHref
          onClick={onLinkClick}
          className="flex"
        >
          <div
            className="w-full bg-[#F6F6F6] rounded-lg flex flex-col justify-center items-center p-[10px] gap-[10px]
                       h-[72px] md:h-[88px]" // CHANGED: Set explicit responsive heights
          >
            <span
              className="text-center text-[#40749C] 
                         text-xs font-medium 
                         md:text-base md:font-bold"
            >
              All
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CategoryList;
