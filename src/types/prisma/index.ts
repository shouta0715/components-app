import { Category, Component, File, Profile, User } from "@prisma/client";

/*
**************************
with Relations
************************** 
*/

type WithCreator = Pick<User, "id" | "name" | "image">;
type WithCategory = Pick<Category, "name">;
type WithProfile = Pick<Profile, "github" | "twitter" | "website">;

/*
**************************
categories
************************** 
*/

export type ViewCategory = {
  components: {
    id: string;
    previewUrl: string;
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

/*
**************************
users
************************** 
*/

export type RankingUser = WithCreator & {
  likes_count: number;
  component_count: number;
  profile?: WithProfile;
};
