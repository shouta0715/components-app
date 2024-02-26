import { useQuery } from "@tanstack/react-query";
import { transformCodeAction } from "@/actions/components/preview";

import { FilePreviewsProps } from "@/app/(edit)/components/[slug]/edit/_features/files/types/file-preview";

async function getTransformedCode({
  objects,
  functionName,
}: Omit<FilePreviewsProps, "slug">) {
  const { data } = await transformCodeAction(objects, functionName);

  return data;
}

export function useQueryTransformedCode({
  slug,
  objects,
  functionName,
}: FilePreviewsProps) {
  const ids = objects.map(({ id }) => id);

  // TODO: gcTimeを0にしたくない。だが、gcTimeを0にしないと、functionNameを変えたときにUIPreviewのonLoadIframeが発火しないので、再描画されない。UnMountすると再描画される。

  const { data, isPending } = useQuery({
    queryKey: ["transformedCode", { slug, functionName, ids }],
    queryFn: () => getTransformedCode({ objects, functionName }),
    retry: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });

  return { data, isPending };
}
