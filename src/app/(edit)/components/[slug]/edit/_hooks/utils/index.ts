import { createdStatus } from "@/app/(edit)/components/[slug]/edit/_hooks/contexts";
import {
  CheckEditStatusData,
  EditDataStatus,
  EditStatus,
  EditStepStatus,
  EditingSteps,
} from "@/app/(edit)/components/[slug]/edit/_hooks/types";

export function paramsToEditingStep(params?: string | null): EditingSteps {
  switch (params) {
    case "summary":
      return "summary";
    case "files":
      return "files";
    case "document":
      return "document";
    default:
      return "summary";
  }
}

function getTargetStatus(flag: boolean): EditStepStatus {
  const dataStatus: EditDataStatus = flag ? "CREATED" : "EMPTY";

  return {
    status: "EDITING",
    dataStatus,
  };
}

function getNotTargetStatus(flag: boolean): EditStepStatus {
  const value = flag ? "CREATED" : "EMPTY";

  return {
    status: value,
    dataStatus: value,
  };
}

function getSectionFlag(
  section: EditingSteps,
  data: CheckEditStatusData
): boolean {
  switch (section) {
    case "summary":
      return !!data.name && data.name !== "Untitled Component";
    case "files":
      return data.fileLength > 0;
    case "document":
      return !!data.document;
    default:
      return false;
  }
}

export const getInitialEditStatus = (
  data: CheckEditStatusData,
  section: EditingSteps
): EditStatus => {
  const { draft } = data;

  if (!draft) {
    return {
      ...createdStatus,
      summary: getTargetStatus(getSectionFlag("summary", data)),
    };
  }

  return {
    summary: getNotTargetStatus(getSectionFlag("summary", data)),
    files: getNotTargetStatus(getSectionFlag("files", data)),
    document: getNotTargetStatus(getSectionFlag("document", data)),
    [section]: getTargetStatus(getSectionFlag(section, data)),
  };
};
