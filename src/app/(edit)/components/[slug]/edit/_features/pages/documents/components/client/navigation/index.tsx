"use client";

import { TabsList } from "@radix-ui/react-tabs";
import { ArrowBigUpDash, Check, Eye, Pencil } from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";
import {
  Control,
  UseFormGetValues,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import { DocumentLoader } from "@/app/(edit)/components/[slug]/edit/_features/pages/documents/components/client/loader";
import { DocumentPreview } from "@/app/(edit)/components/[slug]/edit/_features/pages/documents/components/client/preview";
import { MarkdownWriteRule } from "@/app/(edit)/components/[slug]/edit/_features/pages/documents/components/client/write-rule";

import { useDocumentNavigation } from "@/app/(edit)/components/[slug]/edit/_features/pages/documents/hooks/navigation";
import { Button } from "@/components/ui/button";

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
  defaultValues: EditDocumentInput;
  isDirty: boolean;
  isPending: boolean;
  setValue: UseFormSetValue<FormEditDocumentInput>;
  reset: UseFormReset<FormEditDocumentInput>;
  getValues: UseFormGetValues<FormEditDocumentInput>;
};

const DynamicDocumentWriter = dynamic(
  () =>
    import(
      "@/app/(edit)/components/[slug]/edit/_features/pages/documents/components/client/writer"
    ).then((mod) => mod.DocumentWriter),
  {
    ssr: false,
    loading: () => (
      <DocumentLoader>ドキュメントを読み込んでいます...</DocumentLoader>
    ),
  }
);

export function DocumentNavigation({
  control,
  defaultValues,
  isDirty,
  isPending,
  setValue,
  reset,
  getValues,
}: DocumentNavigationProps) {
  const { mode, ref } = useDocumentNavigation();

  return (
    <NavigateTabs
      className="relative h-[85vh] min-h-96 overflow-y-scroll rounded-md border border-border bg-background pb-8"
      customRef={ref}
      defaultValue="write"
      params="mode"
      value={mode}
    >
      <TabsList className="sticky top-0 z-10 flex w-full items-center justify-between border border-border bg-accent p-2">
        <div className="space-x-4">
          <NavigateTabsTrigger
            className="rounded-md border border-transparent bg-transparent transition-none hover:bg-background/50 hover:text-primary data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-none"
            value="write"
          >
            <Pencil className="mr-2 size-4" />
            Write
          </NavigateTabsTrigger>
          <NavigateTabsTrigger
            className="rounded-md border border-transparent bg-transparent transition-none hover:bg-background/50 hover:text-primary data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-none"
            value="preview"
          >
            <Eye className="mr-2 size-4" />
            Preview
          </NavigateTabsTrigger>
        </div>
        <div className="flex items-center justify-center gap-x-4">
          <MarkdownWriteRule />
          <Button
            className="h-auto w-28 py-2 text-xs font-semibold transition-all"
            disabled={!isDirty || isPending}
            size="sm"
            type="submit"
          >
            {isDirty ? (
              "変更を保存する"
            ) : (
              <span className="flex items-center">
                <Check className="mr-1 size-4" />
                保存済み
              </span>
            )}
          </Button>
          <button
            className="flex items-center justify-center rounded-md p-1 hover:bg-background/80 hover:text-accent-foreground"
            onClick={() =>
              ref.current?.scrollTo({ top: 0, behavior: "smooth" })
            }
            type="button"
          >
            <span className="sr-only">一番上に戻る</span>
            <ArrowBigUpDash className="size-6" />
          </button>
        </div>
      </TabsList>

      <div className="relative p-6">
        <TabsContent className="mt-0" value="write">
          <DynamicDocumentWriter
            defaultValues={defaultValues}
            getValues={getValues}
            reset={reset}
            setValue={setValue}
          />
        </TabsContent>
        <TabsContent className="mt-0 pt-4" value="preview">
          <span className="absolute right-0 top-0 inline-flex items-center  rounded-bl-md border-b border-l border-border bg-secondary px-2 py-1 text-sm font-medium text-primary">
            <svg
              aria-hidden="true"
              className="mr-2 size-2 fill-yellow-500"
              viewBox="0 0 6 6"
            >
              <circle cx={3} cy={3} r={3} />
            </svg>
            Preview
          </span>
          <DocumentPreview control={control} />
        </TabsContent>
      </div>
    </NavigateTabs>
  );
}
