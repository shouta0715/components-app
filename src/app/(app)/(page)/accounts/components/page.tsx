import NDynamic from "next/dynamic";
import React from "react";
import {
  MeComponentsCommand,
  MeComponentsCommandGroup,
  MeComponentsCommandInput,
  MeComponentsCommandList,
} from "@/app/(app)/(page)/accounts/components/_components/command";
import { MeComponent } from "@/app/(app)/(page)/accounts/components/_components/ui-component";
import { Section } from "@/components/ui/section";
import { getSessionUser } from "@/lib/auth/handlers";
import { getMeComponents } from "@/services/components/get/me";

const DynamicEmpty = NDynamic(
  () =>
    import("@/app/(app)/(page)/accounts/components/_components/command/empty"),
  {
    ssr: false,
  }
);

export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await getSessionUser();

  const components = await getMeComponents({
    userId: user.id,
  });

  return (
    <div>
      <Section>
        <Section.Title>投稿の管理</Section.Title>

        <MeComponentsCommand>
          <MeComponentsCommandInput
            className="mb-4 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-[16px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="search"
            placeholder="カテゴリーまたはタイトルで検索"
          />

          <MeComponentsCommandList>
            <MeComponentsCommandGroup className="peer">
              <div className="mt-8 space-y-8">
                {components.map((component) => {
                  return (
                    <MeComponent
                      key={component.id}
                      {...component}
                      count={component._count.likes}
                      extensions={component.files}
                    />
                  );
                })}
              </div>
            </MeComponentsCommandGroup>
            <DynamicEmpty />
          </MeComponentsCommandList>
        </MeComponentsCommand>
      </Section>
    </div>
  );
}
