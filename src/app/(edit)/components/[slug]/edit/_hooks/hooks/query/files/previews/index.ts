import { useQuery } from "@tanstack/react-query";
import { transformCodeAction } from "@/actions/components/preview";

import { FileObject } from "@/services/files/get";

async function getTransformedCode({ files }: { files: FileObject[] }) {
  const { data } = await transformCodeAction(files);

  return data;
}

export function useQueryTransformedCode({
  slug,
  objects,
}: {
  objects: FileObject[];
  slug: string;
}) {
  const { data, isPending } = useQuery({
    queryKey: ["transformedCode", { slug }],
    queryFn: () => getTransformedCode({ files: objects }),
  });

  return { data, isPending };
}
