import { notFound, redirect } from "next/navigation";
import { cacheGetCompWithFiles } from "@/app/(edit)/components/[slug]/edit/_hooks/cache";
import { EditingSteps } from "@/app/(edit)/components/[slug]/edit/_hooks/contexts";
import { getComponentCreatedStatus } from "@/app/(edit)/components/[slug]/edit/_hooks/utils";

function documentRedirect(
  filesCreated: boolean,
  summaryCreated: boolean
): void {
  if (!summaryCreated) redirect("summary");
  if (!filesCreated) redirect("files");
}

function FilesRedirect(summaryCreated: boolean): void {
  if (!summaryCreated) redirect("summary");
}

function HomeRedirect(
  filesCreated: boolean,
  summaryCreated: boolean,
  documentCreated: boolean
) {
  if (!summaryCreated) return redirect("edit/summary");
  if (!filesCreated) return redirect("edit/files");
  if (!documentCreated) return redirect("edit/document");

  return redirect("summary");
}

export const checkEditRedirect = async (
  id: string,
  page: EditingSteps | "Home"
): Promise<void> => {
  const data = await cacheGetCompWithFiles(id);
  const { name, draft, files, document } = data;

  if (!draft) redirect("summary");

  const { summaryCreated, filesCreated, documentCreated } =
    getComponentCreatedStatus({
      name,
      files,
      document,
    });

  switch (page) {
    case "Summary":
      break;
    case "Files":
      FilesRedirect(summaryCreated);
      break;
    case "Document":
      documentRedirect(filesCreated, summaryCreated);
      break;

    case "Home":
      HomeRedirect(filesCreated, summaryCreated, documentCreated);
      break;
    default:
      notFound();
  }
};
