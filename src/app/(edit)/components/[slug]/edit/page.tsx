import { notFound } from "next/navigation";
import { Suspense } from "react";

import { cacheGetCompWithFiles } from "@/app/(edit)/components/[slug]/edit/_features/common/cache";
import { EditHeader } from "@/app/(edit)/components/[slug]/edit/_features/common/components/client/header";
import { EditDocument } from "@/app/(edit)/components/[slug]/edit/_features/documents/components/server";
import { EditFile } from "@/app/(edit)/components/[slug]/edit/_features/files/components/server";
import { HydrateEditSection } from "@/app/(edit)/components/[slug]/edit/_features/section/components/client/hydrate-atom";
import { EditSummary } from "@/app/(edit)/components/[slug]/edit/_features/summary/components/server";

import { TabsContent, TabsList } from "@/components/ui/tabs";
import { assertMine } from "@/lib/auth/handlers";
import { EditFilesInput, PreviewType } from "@/lib/schema/client/edit/files";
import { EditSummaryInput } from "@/lib/schema/client/edit/summary";
import { Params } from "@/types/next";

export default async function Page({ params }: Params) {
  const data = await cacheGetCompWithFiles(params.slug);
  await assertMine(data.creatorId, notFound);

  const { name, description, categoryName, previewUrl, functionName } = data;

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
              <EditFile defaultValues={filesDefaultValues} />
            </TabsContent>
            <TabsContent value="document">
              <EditDocument />
            </TabsContent>
          </div>
        </TabsList>
      </HydrateEditSection>
    </Suspense>
  );
}
