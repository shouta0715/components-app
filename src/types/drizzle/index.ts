import { InferSelectModel } from "drizzle-orm";
import { categories } from "@/db/schema";

export type Category = InferSelectModel<typeof categories>;
