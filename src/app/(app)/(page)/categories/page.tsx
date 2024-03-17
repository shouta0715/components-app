import { redirect } from "next/navigation";
import { CategoryList } from "@/app/(app)/(page)/categories/_components";
import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { Section } from "@/components/ui/section";
import { getCategoriesWithComponentCount } from "@/services/category/get/with-component-count";

export const dynamic = "error";

const redirectSearchPage = async () => {
  "use server";

  redirect("/search");
};

export default async function Page() {
  const categories = await getCategoriesWithComponentCount(36);

  return (
    <Section>
      <Section.Title>人気のカテゴリー</Section.Title>

      <Section.Content>
        <Command>
          <div className="mb-4 flex w-full flex-1">
            <CommandInput
              className="placeholder:text-sm"
              placeholder="カテゴリーを検索する"
              wrapperClassName="border mr-4 h-9 flex-1 item-center rounded-md"
            />
          </div>
          <CommandEmpty>
            <p className="mb-4 text-muted-foreground">
              カテゴリーが見つかりませんでした。検索してみましょう。
            </p>
            <form action={redirectSearchPage}>
              <Button className="font-semibold" type="submit">
                検索ページでコンポーネントやカテゴリーを検索
              </Button>
            </form>
          </CommandEmpty>
          <CommandList className="max-h-none overflow-auto">
            <CategoryList categories={categories} />
          </CommandList>
        </Command>
      </Section.Content>
    </Section>
  );
}
