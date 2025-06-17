import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "./config";
import {
  postquery,
  limitquery,
  paginatedquery,
  configQuery,
  singlequery,
  pathquery,
  allauthorsquery,
  authorsquery,
  postsbyauthorquery,
  postsbycatquery,
  catpathquery,
  catquery,
  searchquery,
  allPostCategories,
  categorizedPostCategories,
  allPostsByPaginationQuery,
  allRecipesByCategoryQuery,
  featuredRecipesQuery,
  nonFeaturedRecipesQuery,
  recipeBySlugQuery,
  searchRecipesQuery,
  relatedRecipesQuery
} from "./groq/groq";
import { allPostSlugsQuery } from "./groq/recipeQueries";
import {
  AllPostCategories,
  Post,
  SimplePost,
  Slug
} from "@/shared/entities";

import {
  allSimplePostsQuery,
  simplePostBySlugQuery
} from "./groq/simplePostQueries";

if (!projectId) {
  console.error(
    "The Sanity Project ID is not set. Check your environment variables."
  );
}

if (!projectId) {
  console.error(
    "The Sanity Project ID is not set. Check your environment variables."
  );
}

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn })
  : null;

export const fetcher = async ([query, params]) => {
  return client ? client.fetch(query, params) : [];
};

export async function getAllPosts() {
  if (client) {
    return (await client.fetch(postquery)) || [];
  }
  return [];
}

export async function getSettings() {
  if (client) {
    return (await client.fetch(configQuery)) || [];
  }
  return [];
}

export async function getPostBySlug(slug) {
  if (client) {
    return (await client.fetch(singlequery, { slug })) || {};
  }
  return {};
}

export async function getAllPostsSlugs() {
  if (client) {
    const slugs = (await client.fetch(pathquery)) || [];
    return slugs.map(slug => ({ slug }));
  }
  return [];
}
// Author
export async function getAllAuthorsSlugs() {
  if (client) {
    const slugs = (await client.fetch(authorsquery)) || [];
    return slugs.map(slug => ({ author: slug }));
  }
  return [];
}

export async function getAuthorPostsBySlug(slug) {
  if (client) {
    return (await client.fetch(postsbyauthorquery, { slug })) || {};
  }
  return {};
}

export async function getAllAuthors() {
  if (client) {
    return (await client.fetch(allauthorsquery)) || [];
  }
  return [];
}

// Category

export async function getAllCategories() {
  if (client) {
    const slugs = (await client.fetch(catpathquery)) || [];
    return slugs.map(slug => ({ category: slug }));
  }
  return [];
}

export async function getPostsByCategory(slug) {
  if (client) {
    return (await client.fetch(postsbycatquery, { slug })) || {};
  }
  return {};
}

export async function getTopCategories() {
  if (client) {
    return (await client.fetch(catquery)) || [];
  }
  return [];
}

export async function getPaginatedPosts({ limit, pageIndex = 0 }) {
  if (client) {
    try {
      // Disable caching for this fetch
      const posts = await client.fetch(paginatedquery, {
        pageIndex: pageIndex,
        limit: limit
      });
      return posts || [];
    } catch (error) {
      console.error("Error fetching paginated posts:", error);
      return [];
    }
  }
  return [];
}

export async function searchPosts(query = "") {
  if (client) {
    return (
      (await client.fetch(searchquery, {
        //query: query
      })) || []
    );
  }
  return [];
}

export async function getAllPostCategories() {
  if (client) {
    try {
      const categories = await client.fetch(allPostCategories);
      return categories || [];
    } catch (error) {
      console.error("Error fetching all post categories:", error);
      return [];
    }
  }
  return [];
}

export async function getCategorizedPostCategories(limit) {
  if (client) {
    try {
      const query = categorizedPostCategories(limit);
      const categories: AllPostCategories = await client.fetch(
        query,
        {},
        { cache: "no-cache" }
      );

      return {
        topCategories: categories?.topCategories || [],
        otherCategories: categories?.otherCategories || []
      };
    } catch (error) {
      console.error(
        "Error fetching categorized post categories:",
        error
      );
      return {
        topCategories: [],
        otherCategories: []
      };
    }
  }

  return {
    topCategories: [],
    otherCategories: []
  };
}

export async function getCategorizedPostCategoriesLabels(
  limit: number
) {
  if (client) {
    try {
      const query = categorizedPostCategories(limit);
      const categories: AllPostCategories = await client.fetch(
        query,
        {},
        { cache: "no-cache" }
      );

      return {
        topCategories:
          categories?.topCategories.map(category => ({
            title: category.title,
            slug: category.slug
          })) || [],
        otherCategories:
          categories?.otherCategories.map(category => ({
            title: category.title,
            slug: category.slug
          })) || []
      };
    } catch (error) {
      console.error(
        "Error fetching categorized post categories:",
        error
      );
      return {
        topCategories: [],
        otherCategories: []
      };
    }
  }
}

//Recipes methods

export async function getRecipeBySlug(
  slug: string
): Promise<Post | null> {
  if (client) {
    try {
      // Disable caching for this fetch
      const post: Post = await client.fetch(
        recipeBySlugQuery,
        {
          slug
        },
        { cache: "no-cache" }
      );
      return post || null;
    } catch (error) {
      console.error("Error fetching recipe by slug:", error);
      return null; // Return null on error
    }
  }

  return null; // Return null if client is not available
}

export async function searchRecipes(query) {
  if (client) {
    try {
      const recipes: Post[] =
        (await client.fetch(
          searchRecipesQuery,
          {
            query: query
          },
          { cache: "no-cache" }
        )) || [];
      return recipes || [];
    } catch (error) {
      console.error("Error fetching search recipes:", error);
      return [];
    }
  }
  return [];
}

export async function getAllRecipesByPagination({
  limit,
  pageIndex = 0
}: {
  limit: number;
  pageIndex?: number;
}): Promise<Post[]> {
  if (client) {
    try {
      // Disable caching for this fetch
      const recipes: Post[] = await client.fetch(
        allPostsByPaginationQuery,
        {
          pageIndex: pageIndex,
          limit: limit
        },
        { cache: "no-cache" }
      ); // Add no-store directive here

      return recipes || []; // Return fetched recipes or an empty array
    } catch (error) {
      console.error("Error fetching paginated recipes:", error);
      return []; // Return an empty array on error
    }
  }

  return []; // Return an empty array if client is not available
}

export async function getAllRecipesByCategory(
  categorySlug: string
): Promise<Post[]> {
  if (client) {
    try {
      // Disable caching for this fetch
      const recipes: Post[] = await client.fetch(
        allRecipesByCategoryQuery,
        { categorySlug },
        { cache: "no-cache" }
      );
      return recipes || [];
    } catch (error) {
      console.error("Error fetching recipes by category:", error);
      return [];
    }
  }
  return [];
}

export async function getRelatedRecipes(
  categorySlug: string,
  limit: number
): Promise<Post[]> {
  if (client) {
    try {
      const recipes: Post[] = await client.fetch(
        relatedRecipesQuery,
        {
          categorySlug, // Asegúrate de que el arreglo de slugs se pase correctamente
          limit
        }
      );
      return recipes || []; // Retorna las recetas o un array vacío si no hay resultados
    } catch (error) {
      console.error("Error fetching related recipes:", error);
      return []; // Si hay un error, retorna un array vacío
    }
  }
  return [];
}

export async function getFeaturedRecipes(
  limit: number
): Promise<Post[]> {
  if (client) {
    try {
      // Disable caching for this fetch
      const recipes: Post[] = await client.fetch(
        featuredRecipesQuery,
        { limit },
        { cache: "no-cache" }
      );
      return recipes || [];
    } catch (error) {
      console.error("Error fetching featured recipes:", error);
      return [];
    }
  }
  return [];
}

export async function getNonFeaturedRecipes(
  limit: number
): Promise<Post[]> {
  if (client) {
    try {
      // Disable caching for this fetch
      const recipes: Post[] = await client.fetch(
        nonFeaturedRecipesQuery,
        { limit }
      );
      return recipes || [];
    } catch (error) {
      console.error("Error fetching non-featured recipes:", error);
      return [];
    }
  }
  return [];
}

// Recipe slugs
export async function getAllRecipeSlugs() {
  if (client) {
    const slugs: Slug[] = await client.fetch(allPostSlugsQuery);
    return slugs.map((slug: Slug) => ({ slug: slug.slug.current }));
  }
  return [];
}

// Simple posts query
export async function getSimplePosts() {
  if (client) {
    try {
      const simplePosts: SimplePost[] = await client.fetch(
        allSimplePostsQuery
      );
      return simplePosts || [];
    } catch (error) {
      console.error("Error fetching simple posts:", error);
      return [];
    }
  }
  return [];
}

export async function getSimplePostBySlug(
  slug: string
): Promise<SimplePost | null> {
  if (client) {
    try {
      // Disable caching for this fetch
      const simplePost: SimplePost = await client.fetch(
        simplePostBySlugQuery,
        {
          slug
        },
        { cache: "no-cache" }
      );
      return simplePost || null;
    } catch (error) {
      console.error("Error fetching recipe by slug:", error);
      return null; // Return null on error
    }
  }

  return null; // Return null if client is not available
}
