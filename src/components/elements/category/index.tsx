import React from "react";
import {
  BentoBackground,
  BentoCard,
  BentoDescription,
  BentoGrid,
  BentoHeader,
  BentoTitle,
} from "@/components/ui/bento-grid";
import { Image } from "@/components/ui/image";
import { CategoriesByHome } from "@/types/prisma";
import { getImageUrl } from "@/utils";

export async function Category({ category }: { category: CategoriesByHome }) {
  const { previewUrl } = category.components;

  return (
    <BentoCard
      asLink
      cta="View"
      href={`/categories/${category.name}`}
      name={category.name}
    >
      <BentoBackground>
        <div className="relative h-52 w-full overflow-hidden bg-accent sm:h-44">
          <div className="absolute bottom-0 z-10 h-full w-full [backgroundImage:linear-gradient(180deg,transparent_0_60%,hsl(var(--accent))_98%_100%)]" />
          <figure className="relative mx-16 mt-4 block h-full sm:mx-8  md:mx-16">
            <Image
              alt={`Image for ${category.name}`}
              className="mx-auto h-auto w-auto rounded-md"
              height={200}
              priority
              quality={70}
              src={`${getImageUrl(previewUrl)}`}
              width={400}
            />
          </figure>
        </div>
      </BentoBackground>
      <BentoHeader>
        <BentoTitle className="capitalize group-hover:text-destructive">
          {category.name}
        </BentoTitle>
        <BentoDescription className="grid gap-y-1">
          <span>{category.description ?? ""}</span>
          <span>{category._count.components ?? 0} 件</span>
        </BentoDescription>
      </BentoHeader>
    </BentoCard>
  );
}

export function Categories({ categories }: { categories: CategoriesByHome[] }) {
  return (
    <BentoGrid className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-y-10 xl:grid-cols-3">
      {categories.map((category) => (
        <Category key={category.name} category={category} />
      ))}
    </BentoGrid>
  );
}
