import { randomUUID } from "crypto";
import { describe, expect, test } from "vitest";

import { prisma } from "@/lib/client/prisma";
import { ComponentUpdateInput } from "@/lib/schema/server/component";
import { FilesUpdateInput, UploadFileInput } from "@/lib/schema/server/files";
import {
  updateComponent,
  updateComponentFiles,
} from "@/services/components/patch";
import { createMockComponentFiles } from "@/services/components/patch/fixtures/components";
import { createDraftComponent } from "@/services/components/post";
import * as aws from "@/services/files/delete";
import { defineUserFactory } from "@/tests/fabbrica";
import { randomExtension, randomString } from "@/utils/random";

describe("PATCH Component RDB test", () => {
  describe("updateComponent", () => {
    test("update all fields", async () => {
      const user = await defineUserFactory().create();

      const component = await createDraftComponent(user.id);

      const newData: ComponentUpdateInput = {
        name: "new name",
        description: "new description",
        previewUrl: "new previewUrl",
        draft: false,
        categoryName: "new category",
        document: "new document",
      };

      await updateComponent(component.id, newData);

      const expectComponent = await prisma.component.findUnique({
        where: { id: component.id },
      });

      if (!expectComponent) throw new Error("Component not found");

      expect(expectComponent).not.toBeUndefined();
      expect(expectComponent.name).toBe(newData.name);
      expect(expectComponent.description).toBe(newData.description);
      expect(expectComponent.previewUrl).toBe(newData.previewUrl);
      expect(expectComponent.draft).toBe(newData.draft);
      expect(expectComponent.categoryName).toBe(newData.categoryName);
      expect(expectComponent.document).toBe(newData.document);
    });

    test("update some fields", async () => {
      const user = await defineUserFactory().create();

      const component = await createDraftComponent(user.id);

      const newData: ComponentUpdateInput = {
        name: "new name",
        description: "new description",
      };

      const updatedComponent = await updateComponent(component.id, newData);

      expect(updatedComponent).not.toBeUndefined();

      const expectComponent = await prisma.component.findUnique({
        where: { id: component.id },
      });

      if (!expectComponent) throw new Error("Component not found");

      expect(expectComponent).not.toBeUndefined();
      expect(expectComponent.name).toBe(newData.name);
      expect(expectComponent.description).toBe(newData.description);

      expect(expectComponent.previewUrl).toBe(component.previewUrl);
      expect(expectComponent.draft).toBe(component.draft);
      expect(expectComponent.categoryName).toBe(component.categoryName);
      expect(expectComponent.document).toBe(component.document);
    });
  });

  describe("updateComponentFiles", () => {
    const spyDeleteAWSFiles = vi
      .spyOn(aws, "deleteAWSFiles")
      .mockImplementation(async () => {});

    afterAll(() => {
      spyDeleteAWSFiles.mockRestore();
    });

    describe("with delete files", () => {
      afterAll(() => {
        spyDeleteAWSFiles.mockReset();
      });
      test("delete files", async () => {
        const { component, files } = await createMockComponentFiles();
        const firstFile = files[0];
        const deleteIDs = {
          id: firstFile.id,
          objectId: firstFile.objectId,
          extension: firstFile.extension,
        };

        const input: FilesUpdateInput = { deleteIDs: [deleteIDs] };

        await updateComponentFiles(component.id, input);

        const expectComponent = await prisma.component.findUnique({
          where: { id: component.id },
          include: { files: true },
        });

        expect(spyDeleteAWSFiles).toBeCalledWith([
          `${firstFile.objectId}.${firstFile.extension}`,
        ]);
        expect(expectComponent).not.toBeUndefined();
        expect(expectComponent?.files.length).toBe(files.length - 1);
        expect(expectComponent?.files.find((f) => f.id === firstFile.id)).toBe(
          undefined
        );
        expect(files.filter((f) => f.id !== firstFile.id)).toStrictEqual(
          expectComponent?.files
        );
      });

      test("delete with update other fields", async () => {
        const { component, files } = await createMockComponentFiles();
        const firstFile = files[0];
        const deleteIDs = {
          id: firstFile.id,
          objectId: firstFile.objectId,
          extension: firstFile.extension,
        };

        const input: FilesUpdateInput = {
          deleteIDs: [deleteIDs],
          functionName: "new function name",
          draft: false,
        };

        await updateComponentFiles(component.id, input);

        const expectComponent = await prisma.component.findUnique({
          where: { id: component.id },
          include: { files: true },
        });

        expect(spyDeleteAWSFiles).toBeCalledWith([
          `${firstFile.objectId}.${firstFile.extension}`,
        ]);
        expect(expectComponent).not.toBeUndefined();
        expect(expectComponent?.files.length).toBe(files.length - 1);
        expect(expectComponent?.files.find((f) => f.id === firstFile.id)).toBe(
          undefined
        );
        expect(files.filter((f) => f.id !== firstFile.id)).toStrictEqual(
          expectComponent?.files
        );
        expect(expectComponent?.functionName).toBe(input.functionName);
        expect(expectComponent?.draft).toBe(input.draft);
      });

      test("delete files with create new files", async () => {
        const { component, files } = await createMockComponentFiles();
        const firstFile = files[0];
        const deleteIDs = {
          id: firstFile.id,
          objectId: firstFile.objectId,
          extension: firstFile.extension,
        };

        const newFiles: UploadFileInput[] = [
          {
            name: randomString(),
            objectId: randomUUID(),
            extension: randomExtension(),
          },
        ];

        const input: FilesUpdateInput = {
          deleteIDs: [deleteIDs],
          uploadFiles: newFiles,
        };

        await updateComponentFiles(component.id, input);

        const expectComponent = await prisma.component.findUnique({
          where: { id: component.id },
          include: { files: true },
        });

        expect(spyDeleteAWSFiles).toBeCalledWith([
          `${firstFile.objectId}.${firstFile.extension}`,
        ]);
        expect(expectComponent).not.toBeUndefined();
        expect(expectComponent?.files.length).toBe(files.length);
        expect(expectComponent?.files.find((f) => f.id === firstFile.id)).toBe(
          undefined
        );

        const removeFiledFiles = expectComponent?.files.map((f) => ({
          name: f.name,
          extension: f.extension,
          objectId: f.objectId,
        }));

        const removedFiles = files
          .filter((f) => f.id !== firstFile.id)
          .map((f) => ({
            name: f.name,
            extension: f.extension,
            objectId: f.objectId,
          }));

        expect([...removedFiles, ...newFiles]).toStrictEqual(removeFiledFiles);
      });

      test("delete files with create new files and update other fields", async () => {
        const { component, files } = await createMockComponentFiles();
        const firstFile = files[0];
        const deleteIDs = {
          id: firstFile.id,
          objectId: firstFile.objectId,
          extension: firstFile.extension,
        };

        const newFiles: UploadFileInput[] = [
          {
            name: randomString(),
            objectId: randomUUID(),
            extension: randomExtension(),
          },
          {
            name: randomString(),
            objectId: randomUUID(),
            extension: randomExtension(),
          },
        ];

        const input: FilesUpdateInput = {
          deleteIDs: [deleteIDs],
          uploadFiles: newFiles,
          functionName: "new function name",
          draft: true,
        };

        await updateComponentFiles(component.id, input);

        const expectComponent = await prisma.component.findUnique({
          where: { id: component.id },
          include: { files: true },
        });

        expect(spyDeleteAWSFiles).toBeCalledWith([
          `${firstFile.objectId}.${firstFile.extension}`,
        ]);
        expect(expectComponent).not.toBeUndefined();
        expect(expectComponent?.files.length).toBe(
          files.length - 1 + newFiles.length
        );
        expect(expectComponent?.files.find((f) => f.id === firstFile.id)).toBe(
          undefined
        );

        const removeFiledFiles = expectComponent?.files.map((f) => ({
          name: f.name,
          extension: f.extension,
          objectId: f.objectId,
        }));

        const removedFiles = files
          .filter((f) => f.id !== firstFile.id)
          .map((f) => ({
            name: f.name,
            extension: f.extension,
            objectId: f.objectId,
          }));

        expect([...removedFiles, ...newFiles]).toStrictEqual(removeFiledFiles);
        expect(expectComponent?.functionName).toBe(input.functionName);
        expect(expectComponent?.draft).toBe(input.draft);
      });

      test("if fail to aws delete, rollback", async () => {
        const { component, files } = await createMockComponentFiles();
        const firstFile = files[0];
        const deleteIDs = {
          id: firstFile.id,
          objectId: firstFile.objectId,
          extension: firstFile.extension,
        };

        const input: FilesUpdateInput = { deleteIDs: [deleteIDs] };

        spyDeleteAWSFiles.mockImplementation(async () => {
          throw new Error("Failed to delete files from s3");
        });

        try {
          await updateComponentFiles(component.id, input);
        } catch (e) {
          expect(e).not.toBeUndefined();
        }

        const expectComponent = await prisma.component.findUnique({
          where: { id: component.id },
          include: { files: true },
        });

        expect(expectComponent).not.toBeUndefined();
        expect(expectComponent?.files.length).toBe(files.length);
        expect(
          expectComponent?.files.find((f) => f.id === firstFile.id)
        ).toStrictEqual(firstFile);
        expect(files).toStrictEqual(expectComponent?.files);
      });
    });

    describe("with create new files", () => {
      afterAll(() => {
        spyDeleteAWSFiles.mockReset();
      });
      test("create new files", async () => {
        const { component, files } = await createMockComponentFiles();
        const newFiles: UploadFileInput[] = [
          {
            name: randomString(),
            objectId: randomUUID(),
            extension: randomExtension(),
          },
          {
            name: randomString(),
            objectId: randomUUID(),
            extension: randomExtension(),
          },
        ];

        const input: FilesUpdateInput = { uploadFiles: newFiles };

        await updateComponentFiles(component.id, input);

        const expectComponent = await prisma.component.findUnique({
          where: { id: component.id },
          include: { files: true },
        });

        expect(expectComponent).not.toBeUndefined();
        expect(expectComponent?.files.length).toBe(
          files.length + newFiles.length
        );

        const removeFiledFiles = expectComponent?.files.map((f) => ({
          name: f.name,
          extension: f.extension,
          objectId: f.objectId,
        }));

        const removedFiles = files.map((f) => ({
          name: f.name,
          extension: f.extension,
          objectId: f.objectId,
        }));

        expect([...removedFiles, ...newFiles]).toStrictEqual(removeFiledFiles);
      });

      test("create new files with update other fields", async () => {
        const { component, files } = await createMockComponentFiles();
        const newFiles: UploadFileInput[] = [
          {
            name: randomString(),
            objectId: randomUUID(),
            extension: randomExtension(),
          },
        ];

        const input: FilesUpdateInput = {
          uploadFiles: newFiles,
          functionName: "new function name",
          draft: true,
        };

        await updateComponentFiles(component.id, input);

        const expectComponent = await prisma.component.findUnique({
          where: { id: component.id },
          include: { files: true },
        });

        expect(expectComponent).not.toBeUndefined();
        expect(expectComponent?.files.length).toBe(
          files.length + newFiles.length
        );

        const removeFiledFiles = expectComponent?.files.map((f) => ({
          name: f.name,
          extension: f.extension,
          objectId: f.objectId,
        }));

        const removedFiles = files.map((f) => ({
          name: f.name,
          extension: f.extension,
          objectId: f.objectId,
        }));

        expect([...removedFiles, ...newFiles]).toStrictEqual(removeFiledFiles);
        expect(expectComponent?.functionName).toBe(input.functionName);
        expect(expectComponent?.draft).toBe(input.draft);
      });
    });

    describe("update fields", () => {
      afterAll(() => {
        spyDeleteAWSFiles.mockReset();
      });

      test("update fields", async () => {
        const { component } = await createMockComponentFiles();
        const input: FilesUpdateInput = {
          functionName: "new function name",
          draft: true,
        };

        await updateComponentFiles(component.id, input);

        const expectComponent = await prisma.component.findUnique({
          where: { id: component.id },
        });

        expect(expectComponent).not.toBeUndefined();
        expect(expectComponent?.functionName).toBe(input.functionName);
        expect(expectComponent?.draft).toBe(input.draft);
      });

      test("if fail to aws delete, rollback", async () => {
        const { component } = await createMockComponentFiles();
        const input: FilesUpdateInput = {
          functionName: "new function name",
          draft: true,
        };

        spyDeleteAWSFiles.mockImplementation(async () => {
          throw new Error("Failed to delete files from s3");
        });

        try {
          await updateComponentFiles(component.id, input);
        } catch (e) {
          expect(e).not.toBeUndefined();
        }

        const expectComponent = await prisma.component.findUnique({
          where: { id: component.id },
        });

        expect(expectComponent).not.toBeUndefined();
        expect(expectComponent?.functionName).toBe(component.functionName);
        expect(expectComponent?.draft).toBe(component.draft);
      });
    });
  });
});
