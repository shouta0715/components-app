import { atom } from "jotai";
import {
  EditStatus,
  EditingSteps,
} from "@/app/(edit)/components/[slug]/edit/_hooks/types";

function getObjectKeys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

export const initialEditStatus: EditStatus = {
  summary: {
    status: "LOADING",
    dataStatus: "EMPTY",
  },
  files: {
    status: "LOADING",
    dataStatus: "EMPTY",
  },
  document: {
    status: "LOADING",
    dataStatus: "EMPTY",
  },
};

export const createdStatus: EditStatus = {
  summary: {
    status: "CREATED",
    dataStatus: "CREATED",
  },
  files: {
    status: "CREATED",
    dataStatus: "CREATED",
  },
  document: {
    status: "CREATED",
    dataStatus: "CREATED",
  },
};

export const editPaths: Array<{
  name: EditingSteps;
}> = [
  {
    name: "summary",
  },
  {
    name: "files",
  },
  {
    name: "document",
  },
];

export const editStatusAtom = atom<EditStatus>(initialEditStatus);

export const onRedirectEditAtom = atom(
  null,
  (get, set, value: EditingSteps) => {
    const prev = get(editStatusAtom);

    const prevEditing = getObjectKeys(prev).find(
      (key) => prev[key].status === "EDITING"
    );
    if (value === prevEditing || !prevEditing) {
      set(editStatusAtom, prev);

      return;
    }

    set(editStatusAtom, {
      ...prev,
      [prevEditing]: {
        status: prev[prevEditing].dataStatus,
        dataStatus: prev[prevEditing].dataStatus,
      },
      [value]: {
        status: "EDITING",
        dataStatus: prev[value].dataStatus,
      },
    });
  }
);
