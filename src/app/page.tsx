import { Categories } from "@/components/elements/category";
import { getCategoriesByHome } from "@/services/category/get";

export const fetchCache = "force-cache";
export const revalidate = "false";

export default async function Home() {
  const categories = await getCategoriesByHome();

  return (
    <div>
      <Categories categories={categories} />
    </div>
  );
}
