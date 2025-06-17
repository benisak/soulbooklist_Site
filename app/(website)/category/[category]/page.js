import { notFound } from "next/navigation";
import Category from "./category";
import { getAllRecipesByCategory } from "@/lib/sanity/client";

async function getCategoryRecipes(category) {
  const recipes = await getAllRecipesByCategory(category);
  const title = recipes[0]?.categories.find(
    (e) => e.slug.current === category
  )?.title;
  return { title, recipes };
}

export async function generateMetadata({ params }) {
  const data = await getCategoryRecipes(params.category);
  return { title: data?.title || "Category" };
}

export default async function PostDefault({ params }) {
  const data = await getCategoryRecipes(params.category);
  const { title, recipes } = data;

  // Use notFound() so that Next.js renders custom not-found.js page
  if (!title || !recipes || recipes.length === 0) {
    notFound();
  }

  return <Category recipes={recipes} title={title} />;
}
