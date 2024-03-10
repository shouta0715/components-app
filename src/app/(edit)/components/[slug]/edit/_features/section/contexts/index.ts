import { atom } from "jotai";
import {
  EditStatus,
  EditingSteps,
} from "@/app/(edit)/components/[slug]/edit/_features/section/types";
import { EditDocumentInput } from "@/lib/schema/client/edit/document";
import { EditFilesInput } from "@/lib/schema/client/edit/files";
import { EditSummaryInput } from "@/lib/schema/client/edit/summary";

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

export const isPendingEditAtom = atom((get) => {
  const prev = get(editStatusAtom);

  const is =
    prev.document.status === "LOADING" ||
    prev.files.status === "LOADING" ||
    prev.summary.status === "LOADING";

  return is;
});

export const canPublishAtom = atom((get) => {
  const prev = get(editStatusAtom);
  const is =
    prev.document.dataStatus === "CREATED" &&
    prev.files.dataStatus === "CREATED" &&
    prev.summary.dataStatus === "CREATED";

  return is;
});

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

/** *********************
  
  Edit States
 
********************** */

type EditValueStates = {
  summary: EditSummaryInput | null;

  files: EditFilesInput | null;

  document: EditDocumentInput | null;
};

export const editValueStatesAtom = atom<EditValueStates>({
  summary: null,
  files: null,
  document: null,
});

export const isEditingAtom = atom<boolean>(false);

// draft

export const initialDraftAtom = atom<boolean>(false);
