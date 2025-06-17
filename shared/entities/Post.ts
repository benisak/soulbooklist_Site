import { Ingredient } from "./Ingredient";
import { PostCategory } from "./PostCategory";

// Define the Recommendation interface based on your Sanity schema
export interface Recommendation {
  recommendationContent: string; // Replace with appropriate type if using complex blockContent
  recommendationUrl: string;
}

// Here we are defining the Recipe entity to structurize the data we get from Sanity
export interface Post {
  _id: string;
  title: string;
  slug: Slug;
  excerpt?: string;
  author?: string;
  plot_summary?: string;
  mainImage?: {
    asset: {
      _id?: string;
      url: string;
    };
    alt?: string | null;
  };
  publishedAt?: string;
  director?: string;
  main_cast?: string;
  categories: PostCategory[];
  recommendations?: Recommendation;
  featured?: boolean;
  synopsis_body?: any;
  argument_body?: any;
  writers?: string[];
  rating?: number;
  duration?: number;
  box_office?: number;
  budget?: number;
  actors?: MovieActor[];
  multimedia_gallery?: ImageAsset[];
  amazon_product_movie?: {
    url: string;
    rent_price?: number;
    buy_price?: number;
  };
  isHidden?: boolean | null;
  content_type?: any;
}


export interface Slug {
  slug: {
    current: string;
    _type: string;
  };
}


// Define MovieActor interface
export interface MovieActor {
  role: string;
  actor: {
    name: string;
    _id?: string;
    slug: {
      current: string;
    };
    image?: {
      asset: {
        url: string;
      };
    };
  };
  _key: string;
}


// Define ImageAsset interface for multimedia gallery
export interface ImageAsset {
  _key: string;
  _type: string;
  asset: {
    _id?: string;
    url: string;
  };
  alt?: string | null;
}