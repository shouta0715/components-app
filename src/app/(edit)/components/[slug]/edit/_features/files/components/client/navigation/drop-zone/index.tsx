import React from "react";

import { DropZoneInfo } from "@/app/(edit)/components/[slug]/edit/_features/files/components/client/navigation/drop-zone/information";
import { NavigationProps } from "@/app/(edit)/components/[slug]/edit/_features/files/types/navigation/preview";
import { TabsContent } from "@/components/ui/tabs";

export function DropZoneNavigate({
  getInputProps,
  files,
  isLoading,
  isDragActive,
}: Omit<NavigationProps, "slug">) {
  return (
    <>
      <TabsContent value="preview">
        <DropZoneInfo
          files={files}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          isLoading={isLoading}
          type="preview"
        />
      </TabsContent>
      <TabsContent value="code">
        <DropZoneInfo
          files={files}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          isLoading={isLoading}
          type="code"
        />
      </TabsContent>
    </>
  );
}
