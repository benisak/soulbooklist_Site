import PostPage from "./default";
import {
  getRecipeBySlug,
  getRelatedRecipes
} from "@/lib/sanity/client";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  try {
    const post = await getRecipeBySlug(params.slug);

    if (!post) {
      return {
        title: "Post Not Found",
        description: "This post does not exist."
      };
    }

    return {
      title: post.title || "Untitled Post",
      description: post.excerpt || "No description available."
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error",
      description: "An error occurred while generating metadata."
    };
  }
}

export default async function PostDefault({ params }) {
  try {
    const post = await getRecipeBySlug(params.slug);

    if (!post) {
      notFound(); // Redirige a la página 404 si el post no existe
    }

    // Asegurarse de que el slug y otros campos críticos existen
    if (!post.slug) {
      throw new Error("Post is missing a slug.");
    }

    const relatedRecipesSlugs = post.categories.map(
      category => category.slug.current
    );

    // Here we are just sending the first category slug
    //TODO: Check the way to send many categories

    const relatedRecipes = await getRelatedRecipes(
      relatedRecipesSlugs[0],
      11
    );

    const filteredRelatedRecipes = relatedRecipes.filter(
      recipe => recipe.slug.current !== post.slug.current
    );

    // Devolvemos la página del post con las recetas filtradas
    return (
      <PostPage post={post} relatedRecipes={filteredRelatedRecipes} />
    );
  } catch (error) {
    console.error("Error rendering post page:", error);
    notFound(); // Redirige a la página 404 en caso de error
  }
}
