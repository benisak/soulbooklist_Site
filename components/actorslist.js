import Image from "next/image";
import Link from "next/link";
import { cx } from "@/utils/all";
import { urlForImage } from "@/lib/sanity/image";
import { parseISO, format } from "date-fns";
import { PhotoIcon } from "@heroicons/react/24/outline";


export default function ActorList({
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
      <div
        className={cx(
          "group cursor-pointer",
          minimal && "grid gap-4 md:grid-cols-2"
        )}
      >
        {/* Actors Image Section */}
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
            {true ? ( 
              <>
                <Image
                  src="/img/actor_mock.jpeg"
                  alt="Actor Mock"
                  loading="lazy"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-all"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,UklGRiIAAABXRUJQVlA4IBgAAAAwAQCdASoEAAQAAkA4JYwCdAD0oAAA/vv7uAAAA"
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

            {/* Actors Title */}
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
            </div>

            {/* Subheadline */}
            <div className="pt-2 pb-1">
              <p className="text-[#FFFF] text-sm font-medium leading-tight">
                Movies that captivated the WeCrashed actor
              </p>
            </div>

            {/* Date */}
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
                {format(parseISO(post?.publishedAt || post._createdAt), "MMMM dd, yyyy")}
              </time>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
