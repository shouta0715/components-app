import { useQueryTransformedCode } from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/query/files/previews";
import { FileObject } from "@/services/files/get";

export function useEditPreviews(props: {
  objects: FileObject[];
  slug: string;
}) {
  const { data, isPending } = useQueryTransformedCode({
    ...props,
  });

  return {
    data,
    isPending,
  };
}
