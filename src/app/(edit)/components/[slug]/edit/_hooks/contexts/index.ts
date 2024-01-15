import { atom } from "jotai";

type Status = "SUCCESS" | "EDITING" | "LOADING" | "EMPTY";
type EditingSteps = "Summary" | "Files" | "Document";
export type EditStatus = {
  [key in EditingSteps]: Status;
};
export const InitialEditStatus: EditStatus = {
  Summary: "LOADING",
  Files: "LOADING",
  Document: "LOADING",
};
export const FinishedEditStatus: EditStatus = {
  Summary: "SUCCESS",
  Files: "SUCCESS",
  Document: "SUCCESS",
};
export const editStatusAtom = atom<EditStatus>(InitialEditStatus);
