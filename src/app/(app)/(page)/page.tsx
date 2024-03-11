import FileTypeComponents from "@/app/(app)/(page)/_components/file-type-component";
import { TopHeader } from "@/app/(app)/(page)/_components/header";
import { TrendComponents } from "@/app/(app)/(page)/_components/trend";
import { BuildTimeBadge } from "@/components/elements/badges/build-time";
import { Categories } from "@/components/elements/category";
import { Section } from "@/components/ui/section";
import { getPopularCategories } from "@/services/category/get/popular";
import { getTrendComponents } from "@/services/components/get/trend";
import { getBuildDate } from "@/utils/time/build-date";

export const dynamic = "error";

const buildDate = getBuildDate();

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
          <Section.Title className="flex items-center justify-between">
            Trend Components <BuildTimeBadge date={buildDate} />
          </Section.Title>
          <Section.Content>
            <TrendComponents components={components} />
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

        <Section>
          <Section.Title>Files Types</Section.Title>
          <Section.Content>
            <FileTypeComponents />
          </Section.Content>
        </Section>
      </Section.Root>
    </div>
  );
}
