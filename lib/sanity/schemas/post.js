export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Post Title",
      type: "string",
      validation: Rule =>
        Rule.required().error("A post must have a title")
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
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString()
    },
    {
      name: "plot_summary",
      title: "Plot summary",
      type: "text",
      rows: 1,
      description: "Short description of the movie",
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
              type: "string",
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
      description: "List of ingredients used in this recipe",
    },
    {
      name: "director",
      title: "Director",
      type: "string",
      description: "Director of the movie"
    },
    {
      name: "writers",
      title: "Writers",
      type: "array",
      of: [{ type: "string" }],
      description: "Names of the writers of the movie"
    },
    {
      name: "main_cast",
      title: "Main Cast",
      type: "array",
      of: [{ type: "string" }],
      description: "Names of the main cast of the movie"
    },
    {
      name: "actors",
      title: "Actors",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "actor",
              title: "Actor",
              type: "reference",
              to: [{ type: "actor" }],
              description: "Actor in the movie, select an existing actor from the list or add a new actor"
            },
            {
              name: "role",
              title: "Role",
              type: "string",
              description: "The role played by the actor in this movie"
            }
          ]
        }
      ]
    },
    {
      name: "budget",
      title: "Budget",
      type: "number",
      description: "Budget of the movie in USD millions"
    },
    {
      name: "box_office",
      title: "Box Office",
      type: "number",
      description: "Box office collection of the movie in USD millions"
    },
    {
      name: "duration",
      title: "Duration",
      type: "number",
      description: "Duration of the movie in minutes"
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
      description: "Rating out of 10"
    },
    {
      name: "trailer",
      title: "Trailer",
      type: "url",
      description: "URL of the trailer on YouTube"
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
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "post_category" }] }],
      validation: Rule =>
        Rule.required().error(
          "A recipe must have at least one category"
        )
    },
    {
      name: "synopsis_body",
      title: "Synopsis",
      type: "blockContent"
    },
    {
      name: "argument_body",
      title: "Argument",
      type: "blockContent"
    },
    {
      name: "multimedia_gallery",
      title: "Multimedia Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              description: "Helpful for SEO and screen readers"
            }
          ]
        }
      ],
      validation: Rule =>
        Rule.max(10)
          .warning("You can upload up to 10 images only.")
          .min(1)
          .error("At least one image is required in the gallery.")
    },    
    {
      name: "amazon_product_movie",
      title: "Amazon Product Movie",
      type: "object",
      fields: [
        {
          name: "url",
          title: "URL",
          type: "url",
          description: "Link to the Amazon prime video"
        },
        {
          name: "rent_price",
          title: "Rent Price",
          type: "number",
          description: "Price of renting the movie in USD"
        },
        {
          name: "buy_price",
          title: "Buy Price",
          type: "number",
          description: "Price of buying the movie in USD"
        }
      ],
      description: "",
      validation: Rule =>
        Rule.required().error(
          "A review must have an Amazon link"
        )
    },
    {
      name: "content_type",
      title: "Content Type",
      type: "string",
      options: {
        list: [
          { title: "Movie", value: "movie" },
          { title: "TV Series", value: "tv_series" }
        ],
        layout: "dropdown" // You can choose "radio" or "dropdown"
      },
      validation: Rule => Rule.required().error("Please select a content type")
    }
  ]
};
