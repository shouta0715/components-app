import { useQuery } from "@tanstack/react-query";
import { transformCodeAction } from "@/actions/components/preview";

import { FileObject } from "@/services/files/get";

async function getTransformedCode({
  files,
  functionName,
}: {
  files: FileObject[];
  functionName?: string;
}) {
  const { data } = await transformCodeAction(files, functionName);

  return data;
}

export function useQueryTransformedCode({
  slug,
  objects,
  functionName,
}: {
  objects: FileObject[];
  slug: string;
  functionName?: string;
}) {
  const ids = objects.map(({ id }) => id);

  // TODO: gcTimeを0にしたくない。だが、gcTimeを0にしないと、functionNameを変えたときにUIPreviewのonLoadIframeが発火しないので、再描画されない。UnMountすると再描画される。

  const { data, isPending } = useQuery({
    queryKey: ["transformedCode", { slug, functionName, ids }],
    queryFn: () => getTransformedCode({ files: objects, functionName }),
    retry: false,
    gcTime: 0,
  });

  return { data, isPending };
}
