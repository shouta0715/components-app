import { Category, Component, ComponentPreviewImage } from "@prisma/client";

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
