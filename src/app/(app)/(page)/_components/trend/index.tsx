import React from "react";
import { UIComponent } from "@/components/elements/ui-components";
import { CreateComponentButton } from "@/components/elements/ui-components/create-button";
import { TrendComponent } from "@/domain/components/trend";

export async function TrendComponents({
  components,
}: {
  components: TrendComponent[];
}) {
  const hasComponents = components.length > 0;

  return (
    <div>
      {hasComponents ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-y-10">
          {components.map((component) => {
            return (
              <UIComponent
                key={`trend-component-${component.id}`}
                {...component}
                count={component.count}
                extensions={component.extensions}
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
            <CreateComponentButton variant="default">
              投稿してみましょう
            </CreateComponentButton>
          </div>
        </div>
      )}
    </div>
  );
}
