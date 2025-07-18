import PostList from "@/components/postlist";
import { searchRecipes } from "@/lib/sanity/client";

export default async function Search({ searchParams }) {
  const query = searchParams.q;
  const posts = await searchRecipes(query);

  return (
    <>
      {query && posts?.length === 0 && (
        <div
          style={{
            maxWidth: "1185px",
            height: "100%",
            padding: 24,
            background: "#F6F6F6",
            borderRadius: 12,
            marginTop: 50,
            marginLeft: "auto", // Center the container
            marginRight: "auto", // Center the container
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            display: "flex",
          }}
          className="items-center justify-center"
        >
          <div
            className="self-stretch text-center justify-start text-[#4B4B4B] text-base font-semibold font-nunito sm:text-2xl sm:font-bold"
          >
            No posts found for {query}. Try again!
          </div>

        </div>
      )}
      {query && !posts && (
        <div className="flex h-40 items-center justify-center">
          <svg
            className="h-6 w-6 animate-spin text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>{" "}
        </div>
      )}
      {/* Parent container with horizontal padding and margin-top */}
      <div className="px-0 md:px-[160px] lg:px-0 mt-8">
        {/* Grid container for posts */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts &&
            posts.map((post) => (
              <div key={post._id} className="flex flex-col">
                <PostList
                  post={post}
                  aspect="square"
                  pathPrefix={"blog"}
                  className="mt- w-full h-full object-cover" // Ensures consistent scaling
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
