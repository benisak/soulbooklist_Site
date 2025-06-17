import { groq } from "next-sanity";

export const allSimplePostsByPaginationQuery = groq`
*[_type == "simple_post" && (isHidden == false || isHidden == null)] 
| order(publishedAt desc, _createdAt desc) [$pageIndex...$pageIndex + $limit] {
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
  ingredients {
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
  }
}
`;

export const searchSimplePostsQuery = groq`
*[
  _type == "simple_post" &&
  (isHidden == false || isHidden == null) &&
  title match $query
] | order(_score desc) {
  _score,
  _id,
  _createdAt,
  mainImage {
    asset->{
      url
    },
    alt
  },
  author,
  title,
  slug,
  isHidden
}
`;

export const featuredSimplePostsQuery = groq`
*[_type == "simple_post" && featured == true && (isHidden == false || isHidden == null)] 
| order(publishedAt desc, _createdAt desc) [0...$limit] {
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
  ingredients {
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
  }
}
`;

export const nonFeaturedSimplePostsQuery = groq`
*[_type == "simple_post" && (featured != true || !defined(featured)) && (isHidden == false || isHidden == null)] 
| order(publishedAt desc, _createdAt desc) [0...$limit] {
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
  ingredients {
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
  }
}
`;

export const simplePostBySlugQuery = groq`
*[
  _type == "simple_post" &&
  slug.current == $slug &&
  (isHidden == false || isHidden == null)
][0] {
  _id,
  title,
  slug,
  excerpt,
  author,
  featured,
  mainImage {
    asset->,
    alt
  },
  publishedAt,
  isHidden,
  body,
  ingredients[] {
    title,
    url,
    productImage {
      asset->,
      alt
    },
    productImageUrl,
    price,
    discount,
    starsRating,
    countRatings
  },
  modal_title,
  widgetCode,
  useWidget
}
`;


export const allSimplePostsQuery = groq`
*[_type == "simple_post" && (isHidden == false || isHidden == null)]
| order(publishedAt desc, _createdAt desc) {
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
  ingredients {
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
  }
}
`;
