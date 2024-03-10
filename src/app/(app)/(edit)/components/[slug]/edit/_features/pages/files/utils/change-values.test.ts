import { DeepPartial } from "react-hook-form";
import { getChangedFilesValues } from "@/app/(app)/(edit)/components/[slug]/edit/_features/pages/files/utils/change-values";
import { EditFilesInput } from "@/lib/schema/client/edit/files";
import { FilesUpdateInput } from "@/lib/schema/server/files";

type GetChangedFilesValuesProps = {
  input: FilesUpdateInput;
  defaultValues?: Readonly<DeepPartial<EditFilesInput>>;
  defaultDraft?: boolean;
};

const defaultValues: DeepPartial<EditFilesInput> = {
  files: [
    { extension: "html", name: "index", type: "default", id: 1, objectId: "1" },
  ],
  previewType: {
    type: "html",
    functionName: undefined,
  },
};

const defaultDraft = false;

const input: FilesUpdateInput = {
  draft: !defaultDraft,
  functionName: "Example",
  uploadFiles: [{ extension: "tsx", name: "react", objectId: "2" }],
  deleteFiles: [{ id: 1, extension: "html", objectId: "1" }],
};

const allChangedValues: GetChangedFilesValuesProps = {
  defaultDraft,
  defaultValues,
  input,
};

const noChangedValues: GetChangedFilesValuesProps = {
  defaultDraft,
  defaultValues,
  input: {
    draft: defaultDraft,
    functionName: undefined,
    uploadFiles: [],
    deleteFiles: [],
  },
};

describe("edit/files/utils", () => {
  describe("getChangedFilesValues", () => {
    test("should return all changed values", () => {
      const result = {
        draft: input.draft,
        functionName: input.functionName,
        uploadFiles: input.uploadFiles,
        deleteFiles: input.deleteFiles,
      };
      expect(getChangedFilesValues(allChangedValues)).toEqual(result);
    });

    test("should return only draft", () => {
      const result = {
        draft: input.draft,
      };
      expect(
        getChangedFilesValues({
          ...noChangedValues,
          input: { ...noChangedValues.input, draft: !defaultDraft },
        })
      ).toEqual(result);
    });

    test("should return only functionName", () => {
      const result = {
        functionName: input.functionName,
      };
      expect(
        getChangedFilesValues({
          ...noChangedValues,
          input: { ...noChangedValues.input, functionName: "Example" },
        })
      ).toEqual(result);
    });

    test("should return only uploadFiles", () => {
      const result = {
        uploadFiles: input.uploadFiles,
      };
      expect(
        getChangedFilesValues({
          ...noChangedValues,
          input: {
            ...noChangedValues.input,
            uploadFiles: [{ extension: "tsx", name: "react", objectId: "2" }],
          },
        })
      ).toEqual(result);
    });

    test("should return only deleteFiles", () => {
      const result = {
        deleteFiles: input.deleteFiles,
      };
      expect(
        getChangedFilesValues({
          ...noChangedValues,
          input: {
            ...noChangedValues.input,
            deleteFiles: [{ id: 1, extension: "html", objectId: "1" }],
          },
        })
      ).toEqual(result);
    });
  });
});
