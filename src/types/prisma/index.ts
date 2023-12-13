import { Category, ComponentPreviewImage } from "@prisma/client";

export type CategoriesByHome = {
  components: {
    id: string;
    previewImages: ComponentPreviewImage[];
  };
  _count: {
    components: number;
  };
} & Category;
