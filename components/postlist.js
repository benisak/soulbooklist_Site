import Image from "next/image";
import Link  from "next/link";
import { cx } from "@/utils/all";
import { urlForImage } from "@/lib/sanity/image";
import { parseISO, format } from "date-fns";
import { PhotoIcon } from "@heroicons/react/24/outline";
import CategoryLabel from "@/components/blog/category";


export default function PostList({
  post,
  minimal        = false,
  pathPrefix     = "blog",
  preloadImage   = false,
  fontSize,
  fontWeight,
  fillHeight     = false,  // pass TRUE only in the grids that may need leveling
  className      = "",
}) {
  const imageProps = post?.mainImage ? urlForImage(post.mainImage) : null;


  /* conditional utility groups --------------------------------------*/
  const stretchCard = fillHeight ? "flex flex-col h-full"                      : "";
  const stretchBox  = fillHeight ? "flex flex-col flex-grow" : "";


  return (
    <article
      className={cx(
        "group cursor-pointer transform transition-transform duration-300 md:hover:scale-105",
        stretchCard,
        className
      )}
    >
      {/* --------------- thumbnail ----------------------------------- */}
      <div
        className="relative overflow-hidden rounded-t-md bg-gray-100 dark:bg-gray-800"
        style={{ width: "100%", paddingBottom: "56.25%" }}  /* 16:9 */
      >
        <Link
          href={`/${pathPrefix}/post/${post.slug?.current}`}
          className="absolute inset-0 block"
        >
          {imageProps ? (
            <Image
              src={imageProps.src}
              {...(post.mainImage.blurDataURL && {
                placeholder: "blur",
                blurDataURL: post.mainImage.blurDataURL,
              })}
              alt={post.mainImage?.alt || "Thumbnail"}
              loading={preloadImage ? "eager" : "lazy"}
              fill
              sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
              className="object-cover transition-all"
            />
          ) : (
            <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-gray-200">
              <PhotoIcon />
            </span>
          )}
        </Link>
      </div>


      {/* --------------- grey text box ------------------------------- */}
      <div
        className={cx(
          "bg-[#F7F7F7] rounded-b-lg p-4 w-full",
          stretchBox,              // fills leftover height *only if it exists*
          minimal && "items-center"
        )}
        style={{ marginTop: "-4px" }}
      >
        {/* top group */}
        <div>
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
                  fontSize: 19,
                  fontWeight: 700,
                }}
              >
                {post.title}
              </span>
            </Link>
          </h2>
        </div>


        {/* bottom line */}
        <time
          className="mt-3 truncate text-gray-900 dark:text-gray-400"
          style={{ fontSize: 13, fontWeight: 400 }}
          dateTime={post?.publishedAt || post._createdAt}
        >
          {format(
            parseISO(post?.publishedAt || post._createdAt),
            "MMMM dd, yyyy"
          )}
        </time>
      </div>
    </article>
  );
}
