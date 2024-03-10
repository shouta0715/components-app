import { getCategoryComponents } from "@/services/components/get";

export type CategoryComponent = Awaited<
  ReturnType<typeof getCategoryComponents>
>[number];
