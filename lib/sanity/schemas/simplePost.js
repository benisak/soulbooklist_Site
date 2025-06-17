export default {
  name: "simple_post",
  title: "Simple Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Recipe Title",
      type: "string",
      validation: Rule =>
        Rule.required().error("A recipe must have a title")
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: "author",
      title: "Author",
      type: "string"
    },
    {
      name: "featured",
      title: "Mark as Featured",
      type: "boolean"
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessiblity."
        }
      ],
      options: {
        hotspot: true
      }
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString()
    },
    {
      name: "isHidden",
      title: "Hide this recipe",
      type: "boolean",
      description:
        "Hide this recipe from the front-end, at the beginning only recipes from original lullatips was hidden"
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent"
    },
    {
      name: "ingredients",
      title: "Ingredients",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string"
            },
            {
              name: "url",
              title: "URL",
              type: "url",
              description: "Link to the ingredient on Amazon"
            },
            {
              name: "productImage",
              title: "Product Image",
              type: "image",
              options: { hotspot: true },
              fields: [
                {
                  name: "alt",
                  title: "Alternative Text",
                  type: "string",
                  description:
                    "Image description for SEO and accessibility"
                }
              ]
            },
            {
              name: "productImageUrl",
              title: "Product Image URL",
              type: "url",
              description: "External URL for the product image"
            },
            {
              name: "price",
              title: "Price",
              type: "number",
              description: "Price of the ingredient on Amazon"
            },
            {
              name: "discount",
              title: "Discount",
              type: "string",
              description: "Discount percentage if any"
            },
            {
              name: "starsRating",
              title: "Stars Rating",
              type: "number",
              description: "Rating out of 5 stars"
            },
            {
              name: "countRatings",
              title: "Count of Ratings",
              type: "number",
              description: "Number of ratings for the ingredient"
            }
          ]
        }
      ],
      description: "List of ingredients used in this recipe"
    },
    {
      name: "amazonAsins",
      title: "Amazon ASINs",
      type: "array",
      of: [{ type: "string" }],
      description:
        "List of Amazon ASINs, here you can add an ASIN to search and add new products to the ingredients list for the recipe (optional)",
      validation: Rule => Rule.optional()
    }
  ]
};
