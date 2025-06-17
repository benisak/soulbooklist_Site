import PostPage from "./lifestyle";
import { getPostBySlug } from "@/lib/sanity/client";

// Función para obtener los datos del post de forma dinámica
async function getPostData(slug) {
  const post = await getPostBySlug(slug);
  return post;
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
    const post = await getPostData(params.slug);

    if (!post) {
      throw new Error("Post not found.");
    }

    return <PostPage post={post} />;
  } catch (error) {
    console.error("Error rendering post page:", error);
    return <div>Error loading post data.</div>;
  }
}
