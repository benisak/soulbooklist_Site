export interface PostCategory {
  _id: string;
  title: string;
  slug: string;
  color: string;
  image: PostImage;
  recipeCount: number;
}

export interface AllPostCategories {
  topCategories: PostCategory[];
  otherCategories: PostCategory[];
}

export interface PostImage {
  asset: {
    url: string;
  };
  alt: string;
}
