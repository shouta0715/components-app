import "server-only";

import React, { Suspense } from "react";

import { LangIcon } from "@/components/elements/code/common";

import {
  ShikiCode,
  ShikiLoading,
} from "@/components/elements/code/common/shiki";
import { CopyButton } from "@/components/ui/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileObject } from "@/services/files/get";

export function MultipleSyntaxCode({ objects }: { objects: FileObject[] }) {
  return (
    <Tabs className="overflow-hidden rounded-md" defaultValue={objects[0].id}>
      <TabsList
        className="relative -mb-2 w-full justify-start gap-2 overflow-hidden overflow-y-scroll rounded-none  bg-code data-[state=active]:shadow-none"
        style={{ colorScheme: "dark" }}
      >
        <div className="scroll-bar-hidden absolute z-10 flex w-full flex-1 overflow-scroll pr-4">
          {objects.map((object) => (
            <div key={object.id} className="relative">
              <TabsTrigger
                className="h-10 rounded-none border-b-2 border-b-transparent pr-6 text-xs text-gray-200 opacity-50 transition-none data-[state=active]:border-b-orange-700 data-[state=active]:bg-code data-[state=active]:text-primary-foreground data-[state=active]:opacity-100 data-[state=active]:shadow-none sm:text-sm dark:data-[state=active]:text-primary"
                value={object.id}
              >
                <LangIcon extension={object.extension} name={object.name} />
              </TabsTrigger>
            </div>
          ))}
        </div>
      </TabsList>

      {objects.map((object) => (
        <TabsContent
          key={object.id}
          className="relative mt-0 bg-code"
          style={{ colorScheme: "dark" }}
          value={object.id}
        >
          <CopyButton
            className="absolute right-4 z-10 mx-2 my-2.5 sm:right-4"
            value={object.file}
          />
          <div className="relative h-code-frame w-full overflow-scroll">
            <Suspense fallback={<ShikiLoading />}>
              <ShikiCode lang={object.extension}>{object.file}</ShikiCode>
            </Suspense>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
