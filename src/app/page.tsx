import { TopHeader } from "@/app/_components/header";
import { Categories } from "@/components/elements/category";
import { getCategoriesByHome } from "@/services/category/get";

export const dynamic = "error";

export default async function Home() {
  const categories = await getCategoriesByHome();

  return (
    <div>
      <TopHeader />
      <Categories categories={categories} />
    </div>
  );
}
