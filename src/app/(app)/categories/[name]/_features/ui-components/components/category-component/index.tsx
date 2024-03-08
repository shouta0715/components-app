import React from "react";
import { ComponentsOrder } from "@/app/(app)/categories/[name]/_features/common/types";
import { UIComponent } from "@/components/elements/ui-components";
import { getCategoryComponents } from "@/services/components/get";

type CategoryComponentProps = {
  name: string;
  take?: string;
  skip?: string;
  order: ComponentsOrder;
};

export async function CategoryComponents({
  take,
  skip,
  order,
  name,
}: CategoryComponentProps) {
  const components = await getCategoryComponents({
    name,
    take: take ? +take : 20,
    skip: skip ? +skip : 0,
    order: order === "trend" ? "popular" : order,
  });

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-y-10">
      {components.map((component) => {
        return (
          <UIComponent
            key={component.id}
            {...component}
            count={component._count.likes}
            extensions={component.files}
          />
        );
      })}
    </div>
  );
}
