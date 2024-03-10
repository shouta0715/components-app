import React from "react";

import { DropZoneInfo } from "@/app/(app)/(edit)/components/[slug]/edit/_features/common/components/client/drop-zone/components/client/files-drop-zones";
import { NavigationProps } from "@/app/(app)/(edit)/components/[slug]/edit/_features/pages/files/types/navigation/preview";
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
