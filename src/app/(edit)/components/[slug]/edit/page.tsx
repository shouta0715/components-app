import { notFound } from "next/navigation";
import { Suspense } from "react";

import { cacheGetCompWithFiles } from "@/app/(edit)/components/[slug]/edit/_features/common/cache";
import { EditHeader } from "@/app/(edit)/components/[slug]/edit/_features/common/components/client/header";
import { EditDocument } from "@/app/(edit)/components/[slug]/edit/_features/pages/documents/components/server";
import { EditFile } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/components/server";
import { EditSummary } from "@/app/(edit)/components/[slug]/edit/_features/pages/summary/components/server";
import { HydrateEditSection } from "@/app/(edit)/components/[slug]/edit/_features/section/components/client/hydrate-atom";

import { TabsContent, TabsList } from "@/components/ui/tabs";
import { assertMine } from "@/lib/auth/handlers";

import { EditFilesInput, PreviewType } from "@/lib/schema/client/edit/files";
import { EditSummaryInput } from "@/lib/schema/client/edit/summary";
import { Params } from "@/types/next";

export default async function Page({ params }: Params) {
  const data = await cacheGetCompWithFiles(params.slug);
  await assertMine(data.creatorId, notFound);

  const {
    name,
    description,
    categoryName,
    previewUrl,
    functionName,
    document,
  } = data;

  const summaryDefaultValues: EditSummaryInput = {
    name,
    description,
    categoryName: categoryName === "other" ? "" : categoryName,
    previewUrl: {
      type: "default",
      value: previewUrl,
    },
  };

  const files: EditFilesInput["files"] = data.files.map((file) => ({
    id: file.id,
    type: "default",
    objectId: file.objectId,
    extension: file.extension,
    name: file.name,
  }));

  const previewType: PreviewType = functionName
    ? {
        type: "react",
        functionName,
      }
    : {
        type: "html",
        functionName: null,
      };

  const filesDefaultValues: EditFilesInput = {
    files,
    previewType,
  };

  return (
    <Suspense fallback={null}>
      <HydrateEditSection data={data}>
        <TabsList className="block h-auto items-center bg-transparent p-0 text-primary">
          <EditHeader />
          {/* Tab Contents */}

          <div className="mt-8">
            <TabsContent value="summary">
              <EditSummary
                defaultValues={summaryDefaultValues}
                draft={data.draft}
              />
            </TabsContent>
            <TabsContent value="files">
              <EditFile defaultValues={filesDefaultValues} draft={data.draft} />
            </TabsContent>
            <TabsContent value="document">
              <EditDocument defaultValues={document} draft={data.draft} />
            </TabsContent>
          </div>
        </TabsList>
      </HydrateEditSection>
    </Suspense>
  );
}
