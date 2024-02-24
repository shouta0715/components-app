import { ComponentUpdateInput } from "@/lib/schema/server/component";
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

export type SummaryUpdateInputValue = Omit<
  Required<ComponentUpdateInput>,
  "draft" | "document"
>;

/** **************************
 Files Status
*************************** */

export type FileStatus = {
  status: "error" | "success";
  message?: string;
};

export type FilesStatus = {
  numbers: FileStatus;
  preview: FileStatus;
  combination: FileStatus;
};

export const errorFilesStatus: FilesStatus = {
  numbers: {
    status: "error",
    message: "1つ以上のファイルをアップロードしてください。",
  },
  preview: {
    status: "error",
    message:
      ".html, .jsx, .tsxのいずれかのファイルをアップロードしてください。",
  },
  combination: {
    status: "error",
    message: "js形式とts形式のファイルは同時にアップロードできません。",
  },
};

export const successFilesStatus: FilesStatus = {
  numbers: {
    status: "success",
  },
  preview: {
    status: "success",
  },
  combination: {
    status: "success",
  },
};
