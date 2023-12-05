import React from "react";
import {
  BentoBackground,
  BentoCard,
  BentoDescription,
  BentoGrid,
  BentoHeader,
  BentoTitle,
} from "@/components/ui/bento-grid";
import { CategoriesWithComponentsCount } from "@/types/drizzle";

export function Category({
  category,
}: {
  category: CategoriesWithComponentsCount;
}) {
  return (
    <BentoCard
      asLink
      cta="View"
      href={`/categories/${category.categories.id}`}
      name={category.categories.name}
    >
      <BentoBackground>
        <div className="h-40 bg-accent" />
      </BentoBackground>
      <BentoHeader>
        <BentoTitle className="group-hover:text-destructive ">
          {category.categories.name}
        </BentoTitle>
        <BentoDescription className="grid gap-y-1">
          <span>{category.categories.description ?? ""}</span>
          <span>{category.components.count ?? 0} components</span>
        </BentoDescription>
      </BentoHeader>
    </BentoCard>
  );
}

export function Categories({
  categories,
}: {
  categories: CategoriesWithComponentsCount[];
}) {
  return (
    <BentoGrid className="col-span-3 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 xl:grid-cols-3 xl:gap-x-8">
      {categories.map((category) => (
        <Category key={category.categories.id} category={category} />
      ))}
    </BentoGrid>
  );
}
