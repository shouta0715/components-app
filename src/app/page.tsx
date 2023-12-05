import { Categories } from "@/components/elements/category";
import { getCategoriesWithComponentsCount } from "@/services/category/get";

export const fetchCache = "force-cache";
export const revalidate = "false";

export default async function Home() {
  const categories = await getCategoriesWithComponentsCount();

  return (
    <div>
      <Categories categories={categories} />
    </div>
  );
}
