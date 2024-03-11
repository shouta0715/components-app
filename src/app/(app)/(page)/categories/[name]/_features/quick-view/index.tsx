import { notFound } from "next/navigation";
import { FilePreviews } from "@/components/elements/files/file-previe";
import { UIPreviewLoading } from "@/components/elements/files/ui-preview/client/loading";

import { getPreviewComponent } from "@/services/components/get/previews";
import { getFiles } from "@/services/files/get";

export const QuickViewLoader = () => {
  return (
    <div className="space-y-4">
      <div aria-busy="true" aria-live="polite">
        <div className="flex h-9 items-center gap-x-6 border-b px-3 text-xs">
          プレビューをロード中...
        </div>
        <div className="mt-6">
          <UIPreviewLoading name="Quick View is Loading..." />
        </div>
      </div>
    </div>
  );
};

export async function QuickView({ slug }: { slug: string }) {
  const component = await getPreviewComponent(slug);

  if (component === null || component.draft) notFound();

  return (
    <FilePreviews
      functionNames={component.functionName || undefined}
      getObject={async () => getFiles(component.files)}
      name={component.name}
    />
  );
}
