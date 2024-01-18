import { EditComp } from "@/types/prisma";

export type EditStatusValue = "CREATED" | "EDITING" | "LOADING" | "EMPTY";

export type EditingSteps = "summary" | "files" | "document";
export type EditDataStatus = Extract<EditStatusValue, "CREATED" | "EMPTY">;
export type EditStepStatus = {
  status: EditStatusValue;
  dataStatus: EditDataStatus;
};
export type EditStatus = {
  [key in EditingSteps]: EditStepStatus;
};

export type CheckEditStatusData = Pick<
  EditComp,
  "name" | "document" | "draft"
> & {
  fileLength: number;
};
