// Movies Project
import Image from "next/image";
import Link from "next/link";
import { cx } from "@/utils/all";
import { urlForImage } from "@/lib/sanity/image";
import { parseISO, format } from "date-fns";
import { PhotoIcon } from "@heroicons/react/24/outline";
import CategoryLabelHome from "@/components/blog/categoryhome";

export default function PostListHome({
  post,
  aspect,
  minimal,
  pathPrefix,
  preloadImage,
  fontSize,
  fontWeight,
}) {
  const imageProps = post?.mainImage ? urlForImage(post.mainImage) : null;
  const rating = post.rating ?? "8.4"; // Fallback if rating is null

  return (
    <>
      <div
        className={cx(
          "group cursor-pointer",
          minimal && "grid gap-4 md:grid-cols-2"
        )}
      >
        {/* Image Section */}
        <div
          className={cx(
            "relative overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800"
          )}
          style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}
        >
          <Link
            href={`/${pathPrefix}/post/${post.slug?.current}`}
            className="absolute inset-0"
            style={{ display: "block" }}
          >
            {imageProps ? (
              <>
                <Image
                  src={imageProps.src}
                  {...(post.mainImage.blurDataURL && {
                    placeholder: "blur",
                    blurDataURL: post.mainImage.blurDataURL,
                  })}
                  alt={post.mainImage?.alt || "Thumbnail"}
                  loading="lazy"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-all"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, black 100%)',
                    borderRadius: '0 0 8px 8px',
                    top: 'auto',
                    height: '50%'
                  }}
                />
              </>
            ) : (
              <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-gray-200">
                <PhotoIcon />
              </span>
            )}
          </Link>
        </div>

        {/* Text Section */}
        <div className={cx(minimal && "flex items-center")}>
          <div>
            <CategoryLabelHome
              categories={post.categories}
              nomargin={minimal}
              className="mb-0 mt-0"
            />

            {/* Title + Rating IMDb label in same row */}
            <div className="flex justify-between items-center mt-1">
              <h2
                className={cx(
                  fontSize === "large"
                    ? "text-2xl"
                    : minimal
                    ? "text-3xl"
                    : "text-lg",
                  fontWeight === "normal"
                    ? "line-clamp-2 font-medium tracking-normal text-[#F5C518]"
                    : "font-semibold leading-snug tracking-tight",
                  "mt-1"
                )}
              >
                <Link href={`/${pathPrefix}/post/${post.slug?.current}`}>
                  <span
                    style={{
                      color: "#F6F6F6",
                      fontSize: "19px",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "normal",
                    }}
                  >
                    {post.title}
                  </span>
                </Link>
              </h2>
              <span className="text-white text-xs font-normal">Rating IMDb</span>
            </div>

            {/* Optional excerpt - hidden */}
            <div className="hidden">
              {post.excerpt && (
                <p className="mt-2 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                  <Link href={`/${pathPrefix}/post/${post.slug?.current}`}>
                    {post.excerpt}
                  </Link>
                </p>
              )}
            </div>

            {/* Date and Rating */}
            <div className="mt-0 flex items-center justify-between text-gray-900 dark:text-gray-400">
              <time
                className="truncate"
                style={{
                  color: "var(--Black-500, #F6F6F6)",
                  fontSize: "13px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                }}
                dateTime={post?.publishedAt || post._createdAt}
              >
                {format(
                  parseISO(post?.publishedAt || post._createdAt),
                  "MMMM dd, yyyy"
                )}
              </time>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 19 17"
                  fill="none"
                >
                  <path
                    d="M3.9425 16.7324L5.405 10.8166L0.5 6.83769L6.98 6.31137L9.5 0.732422L12.02 6.31137L18.5 6.83769L13.595 10.8166L15.0575 16.7324L9.5 13.5956L3.9425 16.7324Z"
                    fill="#F5C518"
                  />
                </svg>
                <span
                  style={{
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  {rating}
                </span>
                <span
                  style={{
                    color: 'white',
                    fontSize: '13px',
                    fontWeight: '400',
                  }}
                >
                  /10
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
