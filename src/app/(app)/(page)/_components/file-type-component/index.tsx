import { Extension } from "@prisma/client";
import clsx from "clsx";
import { Suspense } from "react";
import { UIComponent } from "@/components/elements/ui-components";
import { CreateComponentButton } from "@/components/elements/ui-components/create-button";
import { UIComponentLoader } from "@/components/elements/ui-components/loader";
import { LangIcons } from "@/components/icons/LangIcons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getComponentsByFileType } from "@/services/components/get";

const extensions: {
  name: Extension;
  color: string;
  textColor?: string;
}[] = [
  {
    name: "html",
    color: "group-data-[state=active]:ring-html",
    textColor: "group-data-[state=active]:text-html",
  },
  {
    name: "tsx",
    color: "group-data-[state=active]:ring-tsx",
    textColor: "group-data-[state=active]:text-tsx",
  },
  {
    name: "css",
    color: "group-data-[state=active]:ring-css",
    textColor: "group-data-[state=active]:text-css",
  },
  {
    name: "js",
    color: "group-data-[state=active]:ring-js",
    textColor: "group-data-[state=active]:text-js",
  },
  {
    name: "ts",
    color: "group-data-[state=active]:ring-ts",
    textColor: "group-data-[state=active]:text-ts",
  },
  {
    name: "jsx",
    color: "group-data-[state=active]:ring-jsx",
    textColor: "group-data-[state=active]:text-jsx",
  },
];

const FileTypeComponent = async ({ type }: { type: Extension }) => {
  const components = await getComponentsByFileType(type);

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
            <CreateComponentButton variant="default">
              投稿してみましょう
            </CreateComponentButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default async function FileTypeComponents() {
  return (
    <Tabs className="w-full" defaultValue="html">
      <TabsList className="relative block h-28 max-w-full justify-between gap-x-4 bg-transparent">
        <div className="flex max-w-full justify-between gap-x-6 px-2">
          {extensions.map((extension) => {
            const Icon = LangIcons[extension.name];

            return (
              <TabsTrigger
                key={extension.name}
                className="group flex flex-col rounded-none p-0 ring-offset-background transition-all focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground  data-[state=active]:shadow-none"
                value={extension.name}
              >
                <Icon
                  className={clsx(
                    "size-12 rounded-full p-2 ring-2 ring-border sm:size-16",
                    extension.color
                  )}
                />
                <span
                  className={clsx("mt-1 font-semibold", extension.textColor)}
                >
                  {extension.name}
                </span>
              </TabsTrigger>
            );
          })}
        </div>
      </TabsList>

      <div className="mt-4">
        {extensions.map((extension) => (
          <TabsContent key={extension.name} value={extension.name}>
            <Suspense fallback={<UIComponentLoader length={5} />}>
              <FileTypeComponent type={extension.name} />
            </Suspense>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
