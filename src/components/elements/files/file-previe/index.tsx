import { File } from "@prisma/client";
import React from "react";
import { MultipleBrightCode } from "@/components/ui/bright-code";
import { MultipleCopyButton } from "@/components/ui/multiple-copy-button";
import {
  NavigateTabs,
  NavigateTabsTrigger,
  TabsContent,
  TabsList,
} from "@/components/ui/tabs";
import { getFiles } from "@/services/files/get";

export async function FilePreview({ files }: { files: File[] }) {
  const objects = await getFiles(files);

  return (
    <NavigateTabs className="grid gap-8" defaultValue="preview">
      <TabsList className="h-9 w-full justify-between rounded-none border-b bg-transparent p-0 dark:border-b-gray-700">
        <div>
          <NavigateTabsTrigger
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent transition-none data-[state=active]:border-b-primary"
            value="preview"
          >
            Preview
          </NavigateTabsTrigger>
          <NavigateTabsTrigger
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent transition-none data-[state=active]:border-b-primary"
            value="code"
          >
            Code
          </NavigateTabsTrigger>
        </div>
        <div className="relative">
          <MultipleCopyButton
            items={objects.map((object) => ({
              label: object.extension,
              value: object.file,
            }))}
          />
        </div>
      </TabsList>
      <TabsContent value="preview">aaa</TabsContent>
      <TabsContent value="code">
        <MultipleBrightCode objects={objects} />
      </TabsContent>
    </NavigateTabs>
  );
}
