// app/post/[slug]/page.tsx

import { getSimplePostBySlug } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import { notFound } from "next/navigation";
import Post from "./default"; // Client component

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const post = await getSimplePostBySlug(params.slug);
    if (!post) {
      return {
        title: "Post Not Found",
        description: "This post does not exist.",
      };
    }

    const imageObj = post.mainImage ? urlForImage(post.mainImage) : null;
    const imageUrl = imageObj?.src
      ? new URL(imageObj.src, "https://www.myoldwine.com").toString()
      : null;

    return {
      title: post.title || "Untitled Post",
      description: post.excerpt || "No description available.",
      openGraph: {
        title: post.title,
        description: post.excerpt || "No description available.",
        images: imageUrl
          ? [
              {
                url: imageUrl,
                width: imageObj?.width || 1200,
                height: imageObj?.height || 630,
                alt: post.title,
              },
            ]
          : undefined,
      },
      twitter: {
        title: post.title,
        description: post.excerpt || "No description available.",
        images: imageUrl ? [imageUrl] : undefined,
        card: "summary_large_image",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error",
      description: "An error occurred while generating metadata.",
    };
  }
}

export default async function PostDefault({ params }: { params: { slug: string } }) {
  try {
    const post = await getSimplePostBySlug(params.slug);
    if (!post || !post.slug) {
      notFound();
    }

    return <Post post={post} loading={false} />;
  } catch (error) {
    console.error("Error rendering post page:", error);
    notFound();
  }
}
