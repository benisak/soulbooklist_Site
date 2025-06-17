const { allPostSlugsQuery } = require("./groq/recipeQueries");
const {
  allPostCategoriesQuery
} = require("./groq/postCategoryQueries");
const { createClient } = require("next-sanity");

// Utiliza las variables de entorno definidas en .env
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID; // Obtiene el ID del proyecto de Sanity
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  "test"; // Obtiene el dataset de Sanity
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-03-25"; // Obtiene la versión de la API

// Crear el cliente de Sanity solo si el projectId es válido
const client = projectId
  ? createClient({ projectId, dataset, apiVersion })
  : null;

// Función para obtener los slugs de las recetas
const getAllRecipeSlugs = async () => {
  if (client) {
    try {
      // Realiza la consulta de los slugs de las recetas en Sanity
      const slugs = await client.fetch(allPostSlugsQuery);
      return slugs.map(slug => ({ slug: slug.slug.current })); // Mapea los slugs
    } catch (error) {
      console.error("Error fetching recipe slugs:", error);
      return [];
    }
  }
  return [];
};

const getAllPostCategorySlugs = async () => {
  if (client) {
    try {
      // Realiza la consulta de los slugs de las categorías de posts en Sanity
      const categories = await client.fetch(allPostCategoriesQuery);
      return categories.map(category => ({
        slug: category.slug.current
      })); // Mapea los slugs
    } catch (error) {
      console.error("Error fetching post category slugs:", error);
      return [];
    }
  }
  return [];
};

module.exports = { getAllRecipeSlugs, getAllPostCategorySlugs };
