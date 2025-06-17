import { Ingredient } from "./Ingredient";
import { Slug } from "./Post";

export interface SimplePost {
  _id: string;
  title: string;
  slug: Slug;
  excerpt?: string;
  author?: string;
  publishedAt: string;
  isHidden?: boolean;
  featured?: boolean;
  mainImage?: {
    asset: {
      _id: string;
      url: string;
    };
  };
  ingredients: Ingredient[];
}
