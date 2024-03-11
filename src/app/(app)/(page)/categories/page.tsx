import { CategoryList } from "@/app/(app)/(page)/categories/_components";
import { Section } from "@/components/ui/section";
import { getCategoriesWithComponentCount } from "@/services/category/get/with-component-count";

export const dynamic = "error";

export default async function Page() {
  const categories = await getCategoriesWithComponentCount(30);

  return (
    <Section>
      <Section.Title>カテゴリー</Section.Title>
      <Section.Content>
        <CategoryList categories={categories} />
      </Section.Content>
    </Section>
  );
}
