import {
  Category,
  Component,
  ComponentPreviewImage,
  User,
} from "@prisma/client";

export type CategoriesByHome = {
  components: {
    id: string;
    previewImages: ComponentPreviewImage[];
  };
  _count: {
    components: number;
  };
} & Category;

export type CompWithImgs = Component & {
  previewImages?: ComponentPreviewImage[];
};

export type ComponentWithParent = Component & {
  creator: Pick<User, "id" | "name" | "image">;
  category: Pick<Category, "id" | "name">;
};
