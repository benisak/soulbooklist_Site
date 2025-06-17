export default {
  name: "post_category",
  title: "Post Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200
      },
      validation: Rule => Rule.required()
    },
    {
      name: "color",
      title: "Color",
      type: "string",
      description: "Color of the category",
      options: {
        list: [
          { title: "Green", value: "green" },
          { title: "Blue", value: "blue" },
          { title: "Purple", value: "purple" },
          { title: "Orange", value: "orange" }
        ]
      }
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessibility."
        }
      ]
    }
  ]
};
