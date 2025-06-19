import Image from "next/image";
import Link from "next/link";
import { cx } from "@/utils/all";
import { urlForImage } from "@/lib/sanity/image";
import { parseISO, format } from "date-fns";
import { PhotoIcon } from "@heroicons/react/24/outline";
import CategoryLabel from "@/components/blog/category";

export default function PostList({
  post,
  aspect,
  minimal,
  pathPrefix,
  preloadImage,
  fontSize,
  fontWeight,
}) {
  const imageProps = post?.mainImage ? urlForImage(post.mainImage) : null;

  return (
    <>
      {/* Outer Card Container with Hover Effect */}
      <div
        className={cx(
          "group cursor-pointer transform transition-transform duration-300 hover:scale-105"
        )}
      >
        {/* Inner Grid Layout */}
        <div className={cx(minimal && "grid gap-4 md:grid-cols-2")}>
          {/* Image Section */}
          <div
            className={cx(
              "relative overflow-hidden rounded-t-md bg-gray-100 dark:bg-gray-800"
            )}
            style={{ width: "100%", paddingBottom: "56.25%" }}
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
                      background:
                        "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, black 100%)",
                      borderRadius: "0 0 8px 8px",
                      top: "auto",
                      height: "50%",
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

          {/* Text Section with Light Gray Container */}
          <div className={cx(minimal && "flex items-center")}>
            <div
              className="bg-[#F7F7F7] rounded-b-lg p-4 w-full"
              style={{ marginTop: "-4px" }}
            >
              <CategoryLabel
                categories={post.categories}
                nomargin={minimal}
                className="mb-0 mt-0"
              />
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
                      color: "#1F1F1F",
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

              <div className="mt-3 flex items-center space-x-3 text-gray-900 dark:text-gray-400">
                <time
                  className="truncate"
                  style={{
                    color: "#1F1F1F",
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
