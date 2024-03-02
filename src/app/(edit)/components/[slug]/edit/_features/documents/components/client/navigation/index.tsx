"use client";

import { TabsList } from "@radix-ui/react-tabs";
import React from "react";
import { Control, UseFormRegister } from "react-hook-form";
import { DocumentPreview } from "@/app/(edit)/components/[slug]/edit/_features/documents/components/client/preview";
import { DocumentWriter } from "@/app/(edit)/components/[slug]/edit/_features/documents/components/client/writer";

import {
  NavigateTabs,
  NavigateTabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  EditDocumentInput,
  FormEditDocumentInput,
} from "@/lib/schema/client/edit/document";

type DocumentNavigationProps = {
  control: Control<FormEditDocumentInput>;
  register: UseFormRegister<FormEditDocumentInput>;
  defaultValues: EditDocumentInput;
};

export function DocumentNavigation({
  control,
  defaultValues,
  register,
}: DocumentNavigationProps) {
  return (
    <NavigateTabs className="grid gap-8" defaultValue="write" params="mode">
      <TabsList className="h-9 w-full justify-between rounded-none border-b bg-transparent p-0 dark:border-b-gray-700">
        <div>
          <NavigateTabsTrigger
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent transition-none data-[state=active]:border-b-primary"
            value="write"
          >
            Write
          </NavigateTabsTrigger>
          <NavigateTabsTrigger
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent transition-none data-[state=active]:border-b-primary"
            value="preview"
          >
            Preview
          </NavigateTabsTrigger>
        </div>
      </TabsList>
      <TabsContent value="write">
        <DocumentWriter defaultValues={defaultValues} register={register} />
      </TabsContent>
      <TabsContent value="preview">
        <DocumentPreview control={control} />
      </TabsContent>
    </NavigateTabs>
  );
}
