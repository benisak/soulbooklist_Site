import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/lib/sanity/image";
import { parseISO, format } from "date-fns";
import { PhotoIcon } from "@heroicons/react/24/outline";
import CategoryLabel from "@/components/blog/category";

export default function RelatedPost({
  post,
  pathPrefix,
  isMobile = false,
}) {
  const imageProps = post?.mainImage ? urlForImage(post.mainImage) : null;
  const category = post?.categories?.[0];

  return (
    <Link
      href={`/${pathPrefix}/post/${post.slug?.current}`}
      className={`group block h-full ${isMobile ? "w-[262px] flex-shrink-0" : ""}`}
    >
      <div className="flex flex-col bg-neutral-100 rounded-lg overflow-hidden h-full transition-transform duration-300 group-hover:scale-[1.02]">
        {/* Image */}
        <div
          className="overflow-hidden bg-gray-100 relative"
          style={{
            width: isMobile ? "262px" : "100%",
            height: isMobile ? "160px" : "256px",
            borderRadius: "8px 8px 0 0",
            flexShrink: 0,
          }}
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
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-[8px]">
              <PhotoIcon className="w-12 h-12 text-white" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`p-4 flex flex-col gap-2 ${isMobile ? "min-h-[130px]" : "flex-grow"}`}>
          {category && (
          <div className="inline-flex">
            <Link
              href={`/category/${category.slug?.current}`}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 inline-flex items-center justify-center p-2 rounded-lg text-xs font-semibold leading-normal bg-[#E5EFF6] text-[#40749C] mr-2 mb-2 hover:bg-[#d1e3f8] transition-colors"
            >
              {category.title || "Uncategorized"}
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
