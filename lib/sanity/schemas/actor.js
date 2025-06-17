export default {
    name: "actor",
    title: "Actor",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string"
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 96
            }
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            options: {
                hotspot: true
            }
        },
    ],
};
