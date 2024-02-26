import { DeepPartial } from "react-hook-form";
import { createdStatus } from "@/app/(edit)/components/[slug]/edit/_features/section/contexts";
import {
  CheckEditStatusData,
  EditDataStatus,
  EditStatus,
  EditStepStatus,
  EditingSteps,
  SummaryUpdateInputValue,
} from "@/app/(edit)/components/[slug]/edit/_features/section/types";
import { EditSummaryInput } from "@/lib/schema/client/edit/summary";

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

export const getNextEditingStep = (
  currentStep: EditingSteps
): EditingSteps | "preview" => {
  switch (currentStep) {
    case "summary":
      return "files";
    case "files":
      return "document";
    case "document":
      return "preview";
    default:
      return "summary";
  }
};

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

export function getCurrentEditingSteps(data: EditStatus): EditingSteps {
  const keys = Object.keys(data) as EditingSteps[];

  const currentStep = keys.find((key) => data[key].status === "EDITING");

  if (!currentStep) throw new Error("No current step found");

  return currentStep;
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

export const getComponentChangedValues = (
  input: SummaryUpdateInputValue,
  defaultValues?: Readonly<DeepPartial<EditSummaryInput>>
) => {
  return Object.fromEntries(
    Object.entries(input).filter(([key, value]) => {
      if (key !== "previewUrl")
        return value !== defaultValues?.[key as keyof EditSummaryInput];

      return value !== defaultValues?.previewUrl?.value;
    })
  );
};
