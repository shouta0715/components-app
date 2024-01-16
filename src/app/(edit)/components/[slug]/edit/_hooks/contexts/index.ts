import { atom } from "jotai";

export type EditStatusValue =
  | "CREATED"
  | "EDITING"
  | "LOADING"
  | "EMPTY"
  | "EMPTY_EDITING";
export type EditingSteps = "Summary" | "Files" | "Document";
export type EditStatus = {
  [key in EditingSteps]: EditStatusValue;
};
export const InitialEditStatus: EditStatus = {
  Summary: "LOADING",
  Files: "LOADING",
  Document: "LOADING",
};
export const FinishedEditStatus: EditStatus = {
  Summary: "CREATED",
  Files: "CREATED",
  Document: "CREATED",
};
export const editStatusAtom = atom<EditStatus>(InitialEditStatus);
