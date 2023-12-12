import React from "react";
import {
  BentoBackground,
  BentoCard,
  BentoDescription,
  BentoGrid,
  BentoHeader,
  BentoTitle,
} from "@/components/ui/bento-grid";
import { Codes } from "@/features/code";
import { CategoryWithCode } from "@/types/drizzle";

export async function Category({ category }: { category: CategoryWithCode }) {
  const firstCodes = category.components[0].codes;

  return (
    <BentoCard
      asLink
      cta="View components"
      href={`/categories/${category.categories.id}`}
      name={category.categories.name}
    >
      <BentoBackground>
        <div className="mx-auto flex h-40 w-full overflow-hidden ">
          <Codes codes={firstCodes} />
        </div>
      </BentoBackground>
      <BentoHeader>
        <BentoTitle className="group-hover:text-destructive">
          {category.categories.name}
        </BentoTitle>
        <BentoDescription className="grid gap-y-1">
          <span>{category.categories.description ?? ""}</span>
          <span>{category.aggregate.count ?? 0} components</span>
        </BentoDescription>
      </BentoHeader>
    </BentoCard>
  );
}

export function Categories({ categories }: { categories: CategoryWithCode[] }) {
  return (
    <BentoGrid className="col-span-3 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 xl:grid-cols-3 xl:gap-x-8">
      {categories.map((category) => (
        <Category key={category.categories.id} category={category} />
      ))}
    </BentoGrid>
  );
}
