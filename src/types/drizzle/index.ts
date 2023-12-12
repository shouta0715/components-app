import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  categories,
  codes,
  componentSetItems,
  componentSets,
  components,
  dependencies,
  purchases,
  reviews,
  users,
} from "@/db/schema";

export type ComponentSet = InferSelectModel<typeof componentSets>;
export type InsertComponentSet = InferInsertModel<typeof componentSets>;

export type ComponentSetItem = InferSelectModel<typeof componentSetItems>;
export type InsertComponentSetItem = InferInsertModel<typeof componentSetItems>;

export type Code = InferSelectModel<typeof codes>;
export type InsertCode = InferInsertModel<typeof codes>;

export type Dependency = InferSelectModel<typeof dependencies>;
export type InsertDependency = InferInsertModel<typeof dependencies>;

export type Purchase = InferSelectModel<typeof purchases>;
export type InsertPurchase = InferInsertModel<typeof purchases>;

export type Review = InferSelectModel<typeof reviews>;
export type InsertReview = InferInsertModel<typeof reviews>;

export type User = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;

export type Component = InferSelectModel<typeof components>;
export type InsertComponent = InferInsertModel<typeof components>;
export type ComponentWithCode = {
  components: Component;
  codes: Code[];
};

export type Category = InferSelectModel<typeof categories>;
export type InsertCategory = InferInsertModel<typeof categories>;
export type CategoryWithCode = {
  categories: Category;
  components: {
    codes: Code[];
  }[];
  aggregate: {
    count: number;
  };
};
