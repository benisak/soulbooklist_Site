import ActorList from "@/components/actorslist";
import ActorPagination from "@/components/blog/actorpagination";
import { getAllRecipesByPagination } from "@/lib/sanity/client";

export default async function Post({ searchParams }) {
  const page = searchParams.page;
  const pageIndex = parseInt(page, 10) || 1; // Default to first page if not provided

  const ACTORS_PER_PAGE =
    parseInt(process.env.NEXT_PUBLIC_ACTORS_PER_PAGE, 10) || 12;

  const params = {
    pageIndex: (pageIndex - 1) * ACTORS_PER_PAGE, // Calculate correct offset
    limit: ACTORS_PER_PAGE // Number of posts to fetch per page
  };

  const recipes = await getAllRecipesByPagination(params);

  const isFirstPage = pageIndex < 2;
  const isLastPage = recipes.length < ACTORS_PER_PAGE;

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
          <ActorList
            pathPrefix={"blog"}
            key={post._id}
            post={post}
            aspect="square"
          />
        ))}
      </div>

      <ActorPagination
        pageIndex={pageIndex}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  );
}
