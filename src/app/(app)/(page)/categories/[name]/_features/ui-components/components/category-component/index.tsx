import React from "react";
import { ComponentsOrder } from "@/app/(app)/(page)/categories/[name]/_features/common/types";
import { UIComponent } from "@/components/elements/ui-components";
import { CreateComponentButton } from "@/components/elements/ui-components/create-button";
import { getCategoryComponents } from "@/services/components/get";

type CategoryComponentProps = {
  name: string;
  skip?: number;
  order: ComponentsOrder;
};

export async function CategoryComponents({
  skip,
  order,
  name,
}: CategoryComponentProps) {
  const components = await getCategoryComponents({
    name,
    take: 20,
    skip: skip || 0,
    order: order === "trend" ? "popular" : order,
  });

  const hasComponents = components.length > 0;

  return (
    <div>
      {hasComponents ? (
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
      ) : (
        <div className="mt-20 w-full text-center leading-7">
          <p className="text-lg font-bold">まだコンポーネントがありません。</p>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              あなたが最初のコンポーネントを投稿しましょう。
            </p>
            <CreateComponentButton
              initialValues={{
                categoryName: name,
              }}
              variant="default"
            >
              <span className="capitalize">{name}</span>
              のコンポーネントを投稿する
            </CreateComponentButton>
          </div>
        </div>
      )}
    </div>
  );
}
