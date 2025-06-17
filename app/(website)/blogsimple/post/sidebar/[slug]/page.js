import PostPage from "./sidebar";
import {
  getAllPostsSlugs,
  getPostBySlug,
  getTopCategories
} from "@/lib/sanity/client";

// Esta función se utiliza para obtener los datos del post y las categorías de forma dinámica
async function getPostData(slug) {
  const post = await getPostBySlug(slug);
  const categories = await getTopCategories();
  return { post, categories };
}

export async function generateMetadata({ params }) {
  try {
    const post = await getPostBySlug(params.slug);
    return { title: post.title };
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
    const { post, categories } = await getPostData(params.slug);

    if (!post) {
      throw new Error("Post not found.");
    }

    return <PostPage post={post} categories={categories} />;
  } catch (error) {
    console.error("Error rendering post page:", error);
    return <div>Error loading post data.</div>;
  }
}
