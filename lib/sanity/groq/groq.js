import { groq } from "next-sanity";

// Get all posts
export const postquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) {
  _id,
  _createdAt,
  publishedAt,
  mainImage {
    ...,
    "blurDataURL":asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background,
  },
  featured,
  excerpt,
  slug,
  title,
  author-> {
    _id,
    image,
    slug,
    name
  },
  categories[]->,
}
`;
// Get all posts with 0..limit
export const limitquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) [0..$limit] {
  ...,
  author->,
  categories[]->
}
`;
// [(($pageIndex - 1) * 10)...$pageIndex * 10]{
// Get subsequent paginated posts
export const paginatedquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) [$pageIndex...$limit] {
  ...,
  author->,
  categories[]->
}
`;

// Get Site Config
export const configQuery = groq`
*[_type == "settings"][0] {
  ...,
}
`;

// Single Post
export const singlequery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ...,
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug
      }
    }
  },
  author->,
  categories[]->,
  "estReadingTime": round(length(pt::text(body)) / 5 / 180 ),
  "related": *[_type == "post" && count(categories[@._ref in ^.^.categories[]._ref]) > 0 ] | order(publishedAt desc, _createdAt desc) [0...5] {
    title,
    slug,
    "date": coalesce(publishedAt,_createdAt),
    "image": mainImage
  },
}
`;

// Paths for generateStaticParams
export const pathquery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;
export const catpathquery = groq`
*[_type == "category" && defined(slug.current)][].slug.current
`;
export const authorsquery = groq`
*[_type == "author" && defined(slug.current)][].slug.current
`;

// Get Posts by Authors
export const postsbyauthorquery = groq`
*[_type == "post" && $slug match author->slug.current ] {
  ...,
  author->,
  categories[]->,
}
`;

// Get Posts by Category
export const postsbycatquery = groq`
*[_type == "post" && $slug in categories[]->slug.current ] {
  ...,
  author->,
  categories[]->,
}
`;

// Get top 5 categories
export const catquery = groq`*[_type == "category"] {
  ...,
  "count": count(*[_type == "post" && references(^._id)])
} | order(count desc) [0...5]`;

export const searchquery = groq`*[_type == "post" && _score > 0]
| score(title match $query || excerpt match $query || pt::text(body) match $query)
| order(_score desc)
{
  _score,
  _id,
  _createdAt,
  mainImage,
  author->,
  categories[]->,
   title,
   slug
}`;

// Get all Authors
export const allauthorsquery = groq`
*[_type == "author"] {
 ...,
 'slug': slug.current,
}
`;

// Get all Categories
export const allPostCategories = groq`
  *[_type == "post_category"] {
    _id,
    title,
    slug,
    color,
    image {
      asset->{
        url
      },
      alt
    },
    "recipeCount": count(*[_type == "recipe" && references(^._id)])
  }
`;

//Query to get top categories and other categories
export const categorizedPostCategories = limit => groq`
  {
    "topCategories": *[_type == "post_category"] | order(recipeCount desc)[0..${limit - 1}] {
      _id,
      title,
      "slug": slug.current,
      color,
      image {
        asset->{
          url
        },
        alt
      },
      recipeCount
    },
    "otherCategories": *[_type == "post_category" && !(_id in *[_type == "post_category"] | order(recipeCount desc)[0..${limit - 1}]._id)] {
      _id,
      title,
      "slug": slug.current,
      color,
      image {
        asset->{
          url
        },
        alt
      },
      recipeCount
    }
  }
`;

// Query to get all recipes with their categories and ingredients
export const allPostsByPaginationQuery = groq`
*[_type == "post" && (isHidden == false || isHidden == null) ] | order(publishedAt desc, _createdAt desc) [$pageIndex...$pageIndex + $limit] {
  _id,
  title,
  slug,
  excerpt,
  author,
  publishedAt,
  isHidden,
  mainImage {
    asset->{
      url
    },
    alt
  },
  categories[defined(@)][]-> {
    _id,
    title,
    slug,
    color,
    image {
      asset->{
        url
      },
      alt
    }
  },
  ingredients[defined(@)][]-> {
    _id,
    title,
    slug
  }
}
`;

//Query to search recipes
export const searchRecipesQuery = groq`
*[
  _type == "post" 
  && (isHidden == false || isHidden == null)
  && title match $query
] | order(_score desc) {
  _score,
  _id,
  _createdAt,
  mainImage,
  author->,
  categories[]->,
  title,
  slug,
  isHidden
}`;

//Query to get all recipes by category
export const allRecipesByCategoryQuery = groq`
*[_type == "post" && (isHidden == false || isHidden == null) && $categorySlug in categories[]->slug.current] {
  _id,
  title,
  slug,
  excerpt,
  author,
  publishedAt,
  isHidden,
  mainImage {
    asset->{
      url
    },
    alt
  },
  categories[]-> {
    _id,
    title,
    slug,
    color,
    image {
      asset->{
        url
      },
      alt
    }
  },
  ingredients[]-> {
    _id,
    title,
    slug
  }
}
`;

// Get N related recipes by multiple categories
export const relatedRecipesQuery = groq`
  *[_type == "post" && (isHidden == false || isHidden == null) && $categorySlug in categories[]->slug.current] 
  | order(publishedAt desc) 
  [0..$limit-1] {
    _id,
    title,
    slug,
    categories[]-> {
      _id,
      title,
      slug,
      color,
      image {
        asset->{
          url
        },
        alt
      }
    },
    publishedAt,
    isHidden,
    mainImage {
      asset-> {
        url
      }
    }
  }
`;

// Get N featured recipes by parameter
export const featuredRecipesQuery = groq`
*[_type == "post" && featured == true && (isHidden == false || isHidden == null)] 
| order(publishedAt desc, _createdAt desc)[0..$limit] {
  _id,
  title,
  slug,
  excerpt,
  author,
  publishedAt,
  isHidden,
  rating, 
  mainImage {
    asset->{
      url
    },
    alt
  },
  categories[]-> {
    _id,
    title,
    slug,
    color,
    image {
      asset->{
        url
      },
      alt
    }
  },
  ingredients[]-> {
    _id,
    title,
    slug
  }
}
`;


// Get N non-featured recipes by parameter

export const nonFeaturedRecipesQuery = groq`
*[_type == "post" && featured != true && (isHidden == false || isHidden == null)] | order(publishedAt desc, _createdAt desc) [0..$limit] {
  _id,
  title,
  slug,
  excerpt,
  author,
  publishedAt,
  isHidden,
  mainImage {
    asset->{
      url
    },
    alt
  },
  categories[]-> {
    _id,
    title,
    slug,
    color,
    image {
      asset->{
        url
      },
      alt
    }
  },
  ingredients[]-> {
    _id,
    title,
    slug
  }
}
`;

export const recipeBySlugQuery = groq`
*[_type == "post" && slug.current == $slug && (isHidden == false || isHidden == null)][0] {
  _id,
  title,
  slug,
  plot_summary,
  director,
  ingredients[] {
    title,
    url,
    productImage {
      asset->{
        url
      },
      alt
    },
    productImageUrl,
    price,
    discount,
    starsRating,
    countRatings
  },
  writers,
  main_cast,
  actors[] {
    role,
    actor -> {
      name,
      slug {
        current
      },
      image {
        asset -> {
          url
        }
      }
    },
    _key
  },
  featured,
  mainImage {
    asset->{
      url
    },
    alt
  },
  publishedAt,
  isHidden,
  categories[]-> {
    _id,
    title,
    slug
  },
  synopsis_body,
  argument_body,
  budget,
  box_office,
  duration,
  rating,
  trailer,
  multimedia_gallery[] {
    _key,
    _type,
    alt,
    asset->{
      url
    }
  },
  amazon_product_movie {
    url,
    rent_price,
    buy_price,
  },
  content_type,
}
`;
