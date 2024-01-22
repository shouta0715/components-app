import {
  Category,
  Component,
  ComponentPreviewImage,
  File,
  User,
} from "@prisma/client";

/*
**************************
with Relations
************************** 
*/

type WithCreator = Pick<User, "id" | "name" | "image">;
type WithCategory = Pick<Category, "name">;

/*
**************************
Categories
************************** 
*/

export type CategoriesByHome = {
  components: {
    id: string;
    previewImages: ComponentPreviewImage[];
  };
  _count: {
    components: number;
  };
} & Category;

/* 
**************************
Components
************************** 
*/

export type CompWithImgs = Component & {
  previewImages?: ComponentPreviewImage[];
};

export type CompWithFiles = Component & {
  category: WithCategory;
  creator: WithCreator;
  files: File[];
};

export type EditComp = Component & {
  category: WithCategory;
  creator: Pick<WithCreator, "id">;
  files: File[];
};

export type ComponentWithParent = Component & {
  category: WithCategory;
  creator: WithCreator;
};
