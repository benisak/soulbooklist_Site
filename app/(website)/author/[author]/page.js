import Author from "./author";
import { getAuthorPostsBySlug } from "@/lib/sanity/client";

// Función para obtener los datos del autor de forma dinámica
async function getAuthor(slug) {
  const posts = await getAuthorPostsBySlug(slug);
  return posts?.[0]?.author || {};
}

export async function generateMetadata({ params }) {
  try {
    const author = await getAuthor(params.author);
    return { title: author.title };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error",
      description: "An error occurred while generating metadata."
    };
  }
}

export default async function AuthorPage({ params }) {
  try {
    // Obtener las publicaciones y los datos del autor dinámicamente
    const posts = await getAuthorPostsBySlug(params.author);
    const author = await getAuthor(params.author);

    if (!posts || !author) {
      throw new Error("Author or posts not found.");
    }

    return <Author posts={posts} author={author} />;
  } catch (error) {
    console.error("Error rendering author page:", error);
    return <div>Error loading author data.</div>;
  }
}
