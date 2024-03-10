import { notFound } from "next/navigation";
import { Suspense } from "react";

import { cacheGetCompWithFiles } from "@/app/(app)/(edit)/components/[slug]/edit/_features/common/cache";
import { EditHeader } from "@/app/(app)/(edit)/components/[slug]/edit/_features/common/components/client/header";
import { getEditDefaultValues } from "@/app/(app)/(edit)/components/[slug]/edit/_features/common/utils";
import { EditDocument } from "@/app/(app)/(edit)/components/[slug]/edit/_features/pages/documents/components/server";
import { EditFile } from "@/app/(app)/(edit)/components/[slug]/edit/_features/pages/files/components/server";
import { EditSummary } from "@/app/(app)/(edit)/components/[slug]/edit/_features/pages/summary/components/server";
import { HydrateEditSection } from "@/app/(app)/(edit)/components/[slug]/edit/_features/section/components/client/hydrate-atom";

import { TabsContent, TabsList } from "@/components/ui/tabs";
import { assertMine } from "@/lib/auth/handlers";

import { Params } from "@/types/next";

export default async function Page({ params }: Params) {
  const data = await cacheGetCompWithFiles(params.slug);
  await assertMine(data.creatorId, notFound);

  const { files, summary, document, draft, name } = getEditDefaultValues(data);

  return (
    <div className="animate-fade-in bg-background/20">
      <Suspense fallback={null}>
        <HydrateEditSection data={data}>
          <TabsList className="block h-auto items-center bg-transparent p-0 text-primary">
            <Suspense>
              <EditHeader />
            </Suspense>
            {/* Tab Contents */}
            <div className="mt-8">
              <TabsContent value="summary">
                <EditSummary
                  defaultValues={summary}
                  draft={draft}
                  name={name}
                />
              </TabsContent>
              <TabsContent value="files">
                <EditFile defaultValues={files} draft={draft} name={name} />
              </TabsContent>
              <TabsContent value="document">
                <EditDocument
                  defaultValues={document}
                  draft={draft}
                  name={name}
                />
              </TabsContent>
            </div>
          </TabsList>
        </HydrateEditSection>
      </Suspense>
    </div>
  );
}
