import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import React from "react";
import { buttonVariants } from "@/components/ui/button";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Image } from "@/components/ui/image";
import { CommandPaletteCategory } from "@/services/category/get";
import { getImageUrl } from "@/utils";

function ComponentItem({
  name,
  id,
  previewUrl,
  categoryName,
}: {
  name: string;
  id: string;
  previewUrl: string;
  categoryName: string;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="group relative h-48 shrink-0 overflow-hidden rounded-lg">
        <Link
          className="absolute inset-0 block hover:bg-accent/20"
          href={`/components/${id}`}
        >
          <span className="sr-only">{name}の詳細を見る</span>
        </Link>
        <Image
          alt={`Image for ${name}`}
          className="h-auto w-full object-cover"
          height={200}
          quality={70}
          src={`${getImageUrl(previewUrl)}`}
          width={400}
        />
        <div className="absolute bottom-4 z-10 flex w-full justify-center px-4 opacity-0 transition-opacity group-hover:opacity-100">
          <Link
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className:
                "border border-border w-full bg-background/80 font-semibold px-6",
            })}
            href={`/components/${id}/quick-view`}
            scroll={false}
          >
            Quick View
          </Link>
        </div>
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <span className="max-w-max items-center rounded-full border border-border px-4 py-1 text-xs capitalize">
          {categoryName}
        </span>

        <p className="mt-2 line-clamp-1 text-center text-sm font-semibold">
          {name}
        </p>
        <Link
          className={buttonVariants({
            size: "sm",
            variant: "secondary",
            className: "mt-auto",
          })}
          href={`/components/${id}`}
        >
          詳細を見る
        </Link>
      </div>
    </div>
  );
}

export function CategoryCommandModalContent({
  categories,
  setOpen,
  value,
}: {
  categories: CommandPaletteCategory[];
  value: string;
  setOpen: (open: boolean) => void;
}) {
  const components = React.useMemo(
    () => categories.flatMap((category) => category.components),
    [categories]
  );

  return (
    <>
      <CommandInput
        className="placeholder:text-sm "
        placeholder="カテゴリーを検索する"
      />
      <CommandList className="max-h-none">
        <CommandEmpty>カテゴリーが見つかりませんでした</CommandEmpty>
        <CommandGroup className="p-0 text-primary">
          <div className="flex h-96 overflow-y-auto overflow-x-hidden">
            <div className="flex-auto p-4">
              {categories.map((category) => (
                <CommandItem
                  key={category.name}
                  className="!p-0"
                  value={category.name}
                >
                  <Link
                    className="flex h-full flex-1 justify-between px-1.5 py-3 font-normal capitalize"
                    href={`/categories/${category.name}`}
                    onClick={() => setOpen(false)}
                    prefetch={false}
                  >
                    <span>{category.name}</span>
                    <span className="text-muted-foreground">
                      {category._count.components}種類
                    </span>
                  </Link>
                  <ChevronRight
                    className={clsx(
                      "size-4 text-muted-foreground",
                      category.name === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </div>

            <div className="sticky top-0 hidden w-1/2 border-l p-4 sm:block">
              <div className="h-full">
                {components.map((component) => {
                  if (component.categoryName !== value) return null;

                  return <ComponentItem {...component} />;
                })}
              </div>
            </div>
          </div>
        </CommandGroup>
      </CommandList>

      <div className="mt-6 px-4 pb-2">
        <Link
          className={buttonVariants({
            className: "w-full font-semibold",
          })}
          href="/categories"
          onClick={() => setOpen(false)}
        >
          もっと見る
        </Link>
      </div>
    </>
  );
}
