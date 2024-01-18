import { notFound } from "next/navigation";
import { HydrateEditAtom } from "@/app/(edit)/components/[slug]/edit/_components/client/hydrate-atom";
import { EditDocument } from "@/app/(edit)/components/[slug]/edit/_components/server/document";
import { EditFile } from "@/app/(edit)/components/[slug]/edit/_components/server/files";
import { EditHeader } from "@/app/(edit)/components/[slug]/edit/_components/server/header";
import { EditSummary } from "@/app/(edit)/components/[slug]/edit/_components/server/summary";
import { cacheGetCompWithFiles } from "@/app/(edit)/components/[slug]/edit/_hooks/cache";
import { NavigateTabs, TabsContent } from "@/components/ui/tabs";
import { assertMine } from "@/lib/auth/handlers";
import { Params } from "@/types/next";

export default async function Page({ params }: Params) {
  const data = await cacheGetCompWithFiles(params.slug);
  await assertMine(data.creatorId, notFound);

  return (
    <HydrateEditAtom data={data}>
      <NavigateTabs defaultValue="summary" params="section">
        <EditHeader />

        {/* Tab Contents */}
        <TabsContent value="summary">
          <EditSummary />
        </TabsContent>

        <TabsContent value="files">
          <EditFile />
        </TabsContent>

        <TabsContent value="document">
          <EditDocument />
        </TabsContent>
      </NavigateTabs>
    </HydrateEditAtom>
  );
}
