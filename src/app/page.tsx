import { TopHeader } from "@/app/_components/header";
import { Categories } from "@/components/elements/category";
import { getCategoriesByHome } from "@/services/category/get";

export const revalidate = "86400";

export default async function Home() {
  const categories = await getCategoriesByHome();

  return (
    <div>
      <TopHeader />
      <Categories categories={categories} />
    </div>
  );
}
