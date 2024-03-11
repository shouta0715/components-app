import FileTypeComponents from "@/app/(app)/(page)/_components/file-type-component";
import { TopHeader } from "@/app/(app)/(page)/_components/header";
import { TrendComponents } from "@/app/(app)/(page)/_components/trend";
import { Categories } from "@/components/elements/category";
import { Section } from "@/components/ui/section";
import { getPopularCategories } from "@/services/category/get/popular";
import { getTrendComponents } from "@/services/components/get/trend";

export const dynamic = "error";

export default async function Home() {
  const [categories, components] = await Promise.all([
    getPopularCategories(10),
    getTrendComponents({
      limit: 10,
      offset: 0,
    }),
  ]);

  return (
    <div>
      <TopHeader />
      <Section.Root>
        <Section>
          <Section.Title>Trend Components</Section.Title>
          <Section.Content>
            <TrendComponents components={components} />
          </Section.Content>
          <Section.MoreLink href="/components/trend">
            トレンドをもっと見る
          </Section.MoreLink>
        </Section>

        <Section>
          <Section.Title>Files Types</Section.Title>
          <Section.Content>
            <FileTypeComponents />
          </Section.Content>
        </Section>

        <Section>
          <Section.Title>Popular Categories</Section.Title>
          <Section.Content>
            <Categories categories={categories} />
          </Section.Content>
          <Section.MoreLink href="/categories">
            カテゴリーもっと見る
          </Section.MoreLink>
        </Section>
      </Section.Root>
    </div>
  );
}
