import type { Category as TCategory } from "@prisma/client";
import clsx from "clsx";
import { CopyPlus, Layers3, Sparkle, Sparkles } from "lucide-react";
import Link from "next/link";
import { CreateComponentButton } from "@/components/elements/ui-components/create-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { buttonVariants } from "@/components/ui/button";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { cn } from "@/utils";

export type CategoryListProps = {
  categories: (TCategory & { _count: { components: number } })[];
};

function getBadgeStatus(
  count: number,
  topCount: number,
  index: number
): { label: React.ReactNode; color: string } | null {
  if (count === topCount) {
    return {
      label: (
        <>
          <Sparkles className="mr-1 size-4 fill-yellow-500 text-yellow-500" />
          Most Popular Category
        </>
      ),
      color: "",
    };
  }

  if (index < 3) {
    return {
      label: (
        <>
          <Sparkle className="mr-1 size-4 fill-yellow-500 text-yellow-500" />
          Popular Category
        </>
      ),
      color: "",
    };
  }

  if (index < 6) {
    return {
      label: (
        <>
          <Sparkle className="mr-1 size-4 fill-yellow-500 text-yellow-500" />
          Trending Category
        </>
      ),
      color: "bg-secondary",
    };
  }

  return null;
}

function Category({
  name,
  description,
  count,
  index,
  topCount,
}: {
  name: string;
  description: string | null;
  count: number;
  index: number;
  topCount: number;
}) {
  const badgeStatus = getBadgeStatus(count, topCount, index);

  return (
    <CommandItem
      className="relative block w-full flex-1 select-auto rounded-2xl border border-border p-0 shadow-lg  ring-1 ring-border   aria-selected:bg-transparent aria-selected:text-current data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      value={name}
    >
      <div className="mx-auto flex h-full min-h-full flex-col items-center justify-around">
        <div className="flex h-14 w-full items-center justify-center overflow-hidden rounded-t-xl bg-primary p-3 text-background">
          <h3 className="line-clamp-2 text-base font-bold capitalize">
            {name}
          </h3>
        </div>
        <div className="flex h-full w-full flex-1 flex-col space-y-4 p-3  md:p-4">
          <div className="flex flex-1 flex-col">
            <span
              className={clsx(
                badgeStatus !== null &&
                  "relative inline-flex h-6 w-max items-center overflow-hidden rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-border",
                badgeStatus?.color
              )}
            >
              {index < 3 && (
                <BorderBeam
                  borderWidth={2}
                  colorFrom={index === 0 ? "#FFC107" : "#FFEB3B"}
                  colorTo={index === 0 ? "#F57C00" : "#FFB74D"}
                  duration={5}
                  size={44}
                />
              )}
              {badgeStatus?.label}
            </span>

            <p className="mt-2 line-clamp-4 flex-1 text-sm text-muted-foreground">
              {description || "このカテゴリーにはまだ説明がありません。"}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-1 items-center justify-center text-sm">
              投稿数
              <span className="px-1 text-center font-bold">{count}</span>件
            </div>
            <Link
              className={cn(
                buttonVariants({
                  size: "sm",
                }),
                "mx-auto h-auto px-6 py-2 text-xs font-bold"
              )}
              href={`/categories/${name}`}
            >
              <Layers3 className="mr-2 size-4" />
              投稿を見る
            </Link>
            <CreateComponentButton
              buttonClassName="h-auto p-2 text-xs font-bold"
              initialValues={{
                categoryName: name,
              }}
              size="sm"
              variant="secondary"
            >
              <CopyPlus className="mr-2 size-4" />
              このカテゴリーに投稿する
            </CreateComponentButton>
          </div>
        </div>
      </div>
    </CommandItem>
  );
}

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <CommandGroup className="p-0 text-primary">
      <ul className="grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-3 ">
        {categories.map((category, index) => {
          const topCount = categories[0]._count.components;

          return (
            <Category
              key={category.name}
              topCount={topCount}
              {...category}
              count={category._count.components}
              index={index}
            />
          );
        })}
      </ul>
    </CommandGroup>
  );
}
