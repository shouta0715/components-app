import "server-only";

import { Code, BrightProps } from "bright";
import React from "react";

import { LangIcon } from "@/components/elements/code/common";
import { CopyButton } from "@/components/ui/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileObject } from "@/services/files/get";
import { Extension } from "@/types/file";
import { cn } from "@/utils";

// TODO: MIT License https://github.com/PKief/vscode-material-icon-theme/blob/master/LICENSE.md

type BrightCodeProps = {
  className?: string;
  theme?: BrightProps["theme"];
  lang: Extension;
  children: string;
};

function BrightCode({ className, theme, children, ...props }: BrightCodeProps) {
  return (
    <div className="relative h-code-frame w-full overflow-scroll">
      <Code
        className={cn("text-sm min-w-full absolute overflow-auto", className)}
        codeClassName="w-full"
        style={{ margin: 0 }}
        theme={theme ?? "github-dark-dimmed"}
        {...props}
      >
        {children}
      </Code>
    </div>
  );
}

export function NormalBrightCode({
  theme,
  copy = true,
  className,
  children,
  ...props
}: Omit<BrightCodeProps, "lang"> &
  Pick<BrightProps, "lang"> & {
    copy?: boolean;
  }) {
  return (
    <div className="relative">
      <Code
        codeClassName="pr-12"
        {...props}
        className={cn("text-sm relative", className)}
        theme={theme ?? "github-dark-dimmed"}
      >
        {children}
      </Code>
      {copy && (
        <div className="pointer-events-none absolute inset-0 flex  h-12  w-full">
          <CopyButton
            className="pointer-events-auto my-auto ml-auto mr-4"
            value={children}
          />
        </div>
      )}
    </div>
  );
}

export function MultipleBrightCode({ objects }: { objects: FileObject[] }) {
  return (
    <Tabs
      className="overflow-hidden rounded-md"
      defaultValue={`${objects[0].componentId}/${objects[0].name}.${objects[0].extension}`}
    >
      <TabsList className="flex h-auto justify-start gap-2 overflow-y-scroll rounded-none bg-code py-2 data-[state=active]:shadow-none">
        {objects.map((object) => (
          <TabsTrigger
            key={`${object.componentId}/${object.name}.${object.extension}`}
            className="rounded-none border-b-2 border-b-transparent text-xs text-gray-200 opacity-50 transition-none data-[state=active]:border-b-orange-700 data-[state=active]:bg-code data-[state=active]:text-primary-foreground data-[state=active]:opacity-100 data-[state=active]:shadow-none sm:text-sm dark:data-[state=active]:text-primary"
            value={`${object.componentId}/${object.name}.${object.extension}`}
          >
            <LangIcon extension={object.extension} name={object.name} />
          </TabsTrigger>
        ))}
      </TabsList>

      {objects.map((object) => (
        <TabsContent
          key={`${object.componentId}/${object.name}.${object.extension}`}
          className="relative mt-0 bg-code"
          value={`${object.componentId}/${object.name}.${object.extension}`}
        >
          <CopyButton
            className="absolute right-4 z-10 mx-2 my-2.5 sm:right-4 sm:-my-10"
            value={object.file}
          />
          <BrightCode lang={object.extension}>{object.file}</BrightCode>
        </TabsContent>
      ))}
    </Tabs>
  );
}
