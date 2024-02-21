import { Category, Component, File, User } from "@prisma/client";

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
    previewUrl: string;
  };
  _count: {
    components: number;
  };
} & Category;

export type SearchCategory = Pick<Category, "name"> & {
  _count: {
    components: number;
  };
};

/* 
**************************
Components
************************** 
*/

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
