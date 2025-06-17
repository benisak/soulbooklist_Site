import Container from "@/components/container";
import CategoryList from "@/components/categorylist";
import Subscription from "@/components/Subscription";
import { getCategorizedPostCategories } from "@/lib/sanity/client";

export default async function NotFoundPage() {
  // Fetch categories exactly as in your Home page.
  const data = await getCategorizedPostCategories(7);
  const categoriesForList = {
    topCategories: data?.topCategories || [],
    otherCategories: data?.otherCategories || [],
  };

  return (
    <div className="text-white bg-black">
      <section style={{ padding: "2rem", textAlign: "center" }}>
        <h1 className="text-white text-brand-primary text-3xl font-semibold tracking-tight dark:text-white lg:text-5xl lg:leading-tight mb-4">
          Movies
        </h1>
        <p>0 Movies</p>
      </section>

      <div
        className="w-full max-w-[calc(100vw-32px)] sm:max-w-md md:max-w-[1185px] mx-auto py-6 bg-[#4B4B4B] rounded-lg md:mt-6 mt-4 flex justify-center items-center text-center text-lg font-bold break-words"
      >
        No movies found for this category. Try another category
      </div>

      <Container large>
        <div className="w-full pt-8">
          <CategoryList topAndOtherCategories={categoriesForList} />
        </div>
      </Container>

      <div className="w-full md:mt-12 mt-4 bg-gray-100">
        <Subscription />
      </div>
    </div>
  );
}
