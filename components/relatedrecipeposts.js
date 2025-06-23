import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/lib/sanity/image";
import { parseISO, format } from "date-fns";
import { PhotoIcon } from "@heroicons/react/24/outline";

export default function RelatedPost({ post, pathPrefix }) {
  const imageProps = post?.mainImage ? urlForImage(post.mainImage) : null;
  const category = post?.categories?.[0];

  return (
    <Link
      href={`/${pathPrefix}/post/${post.slug?.current}`}
      className="group block h-full"
    >
      <div className="flex flex-col bg-neutral-100 rounded-lg overflow-hidden h-full transition-transform duration-300 group-hover:scale-[1.02]">
        
        <div
          className="relative block h-64 w-full"
          style={{ flexShrink: 0 }}
        >
          {imageProps ? (
            <Image
              src={imageProps.src}
              {...(post.mainImage.blurDataURL && {
                placeholder: "blur",
                blurDataURL: post.mainImage.blurDataURL,
              })}
              alt={post.mainImage?.alt || "Thumbnail"}
              fill
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200">
              <PhotoIcon className="w-12 h-12 text-white" />
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col gap-2 flex-grow">
          {category && (
            <div className="inline-flex">
              <Link
                // CORRECTED: The `pathPrefix` has been removed to create the proper URL.
                href={`/category/${category.slug?.current}`}
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 p-2 bg-[#E4EEFA] rounded-lg hover:bg-[#d1e3f8] transition-colors"
              >
                <span className="text-[#2F88FF] text-xs font-semibold">
                  {category.title || "Uncategorized"}
                </span>
              </Link>
            </div>
          )}

          <h3 className="text-[#1F1F1F] text-lg font-bold leading-snug">
            {post.title}
          </h3>

          <time
            className="text-[#1F1F1F] text-xs font-medium mt-auto"
            dateTime={post?.publishedAt || post._createdAt}
          >
            {format(parseISO(post?.publishedAt || post._createdAt), "MMMM dd, yyyy")}
          </time>
        </div>
      </div>
    </Link>
  );
}
