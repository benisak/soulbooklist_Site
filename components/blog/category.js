// components/CategoryLabel.js (or your path)
import Link from "next/link";
import Label from "@/components/ui/label"; // Assuming correct path
import React from "react"; // Import React for Fragment shorthand <>

export default function CategoryLabel({
  categories,
  nomargin = false
}) {
  // Good practice: Handle cases where categories might be null/undefined or not an array
  if (!Array.isArray(categories) || categories.length === 0) {
    return null; // Render nothing if no categories
  }

  return (
    // Use React Fragment to allow parent flex-wrap to work
    <>
      {categories.map((category, index) => {
         // Basic check for valid category data
         if (!category?.title || !category?.slug?.current) {
          console.warn("Skipping category with missing title or slug:", category);
          return null;
         }

        // Use a more stable key if possible (like Sanity's _id or the slug)
        const key = category._id || category.slug.current || index;

        return (
          <Link
            href={`/category/${category.slug.current}`}
            key={key}>
            {/* The Label component renders an inline-block span, which is fine */}
            <Label nomargin={nomargin}>
              {category.title}
            </Label>
          </Link>
        );
      })}
    </>
  );
}
