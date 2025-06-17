import PostList from "@/components/postlist";
import PostListHome from "@/components/postlisthome";
import Pagination from "@/components/blog/pagination";
import { getAllRecipesByPagination } from "@/lib/sanity/client";

export default async function Post({ searchParams }) {
  const page = searchParams.page;
  const pageIndex = parseInt(page, 10) || 1; // Default to first page if not provided

  const POSTS_PER_PAGE =
    parseInt(process.env.NEXT_PUBLIC_POSTS_PER_PAGE, 10) || 6;

  const params = {
    pageIndex: (pageIndex - 1) * POSTS_PER_PAGE, // Calculate correct offset
    limit: POSTS_PER_PAGE // Number of posts to fetch per page
  };

  const recipes = await getAllRecipesByPagination(params);

  const isFirstPage = pageIndex < 2;
  const isLastPage = recipes.length < POSTS_PER_PAGE;

  return (
    <>
      {recipes.length === 0 && (
        <div className="flex h-40 items-center justify-center">
          <span className="text-lg text-gray-500">
            End of the result!
          </span>
        </div>
      )}
      <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
        {recipes.map(post => (
          <PostListHome
            pathPrefix={"blog"}
            key={post._id}
            post={post}
            aspect="square"
          />
        ))}
      </div>

      <Pagination
        pageIndex={pageIndex}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  );
}
