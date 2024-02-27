import "@/tests/mocks/session";

import { NextRequest } from "next/server";
import { PATCH as updateComponentFilesHandler } from "../patch";
import { FilesUpdateInput } from "@/lib/schema/server/files";
import * as getServices from "@/services/components/get";
import * as services from "@/services/components/patch";
import { testBaseURL } from "@/tests/mocks/setup";

const url = `${testBaseURL}/api/components/1/files`;

const input: Required<FilesUpdateInput> = {
  draft: false,
  deleteIDs: [],
  uploadFiles: [],
  functionName: "Example",
};

describe("PATCH Component Files API test", () => {
  describe("success", () => {
    beforeAll(() => {
      vi.spyOn(services, "updateComponentFiles").mockImplementation(
        async () => {}
      );

      vi.spyOn(getServices, "getComponentCreatorId").mockImplementation(
        async () => "test-user"
      );
    });

    afterAll(() => {
      vi.restoreAllMocks();
    });

    test("should return 204", async () => {
      const req = new NextRequest(url, {
        method: "PATCH",
        body: JSON.stringify(input),
      });
      const res = await updateComponentFilesHandler(req, {
        params: { slug: "1" },
      });

      expect(res.status).toBe(204);
    });

    test("should call updateComponentFiles", async () => {
      const req = new NextRequest(url, {
        method: "PATCH",
        body: JSON.stringify(input),
      });
      await updateComponentFilesHandler(req, { params: { slug: "1" } });

      expect(services.updateComponentFiles).toBeCalledWith("1", input);
    });

    test("some fields are updated", async () => {
      const req = new NextRequest(url, {
        method: "PATCH",
        body: JSON.stringify({
          functionName: "Example",
        }),
      });
      await updateComponentFilesHandler(req, { params: { slug: "1" } });

      expect(services.updateComponentFiles).toBeCalledWith("1", {
        functionName: "Example",
      });
    });
  });

  describe("failure", () => {
    test("if function name is not Capitalize return 400", async () => {
      const req = new NextRequest(url, {
        method: "PATCH",
        body: JSON.stringify({ functionName: "example" }),
      });
      const res = await updateComponentFilesHandler(req, {
        params: { slug: "1" },
      });

      expect(res.status).toBe(400);
    });

    test("if function name is empty, should return 400", async () => {
      const req = new NextRequest(url, {
        method: "PATCH",
        body: JSON.stringify({ functionName: "" }),
      });
      const res = await updateComponentFilesHandler(req, {
        params: { slug: "1" },
      });

      expect(res.status).toBe(400);
    });

    test("if function name is too long, should return 400", async () => {
      const req = new NextRequest(url, {
        method: "PATCH",
        body: JSON.stringify({ functionName: "A".repeat(31) }),
      });
      const res = await updateComponentFilesHandler(req, {
        params: { slug: "1" },
      });

      expect(res.status).toBe(400);
    });

    test("if body is not valid, should return 400", async () => {
      const req = new NextRequest(url, {
        method: "PATCH",
        body: JSON.stringify({ invalid: "invalid" }),
      });
      const res = await updateComponentFilesHandler(req, {
        params: { slug: "1" },
      });

      expect(res.status).toBe(400);
    });

    test("if user is not creator, should return 404", async () => {
      vi.spyOn(getServices, "getComponentCreatorId").mockImplementation(
        async () => "other-user"
      );

      const req = new NextRequest(url, {
        method: "PATCH",
        body: JSON.stringify(input),
      });
      const res = await updateComponentFilesHandler(req, {
        params: { slug: "1" },
      });

      expect(res.status).toBe(404);
    });

    test("Internal server error", async () => {
      vi.spyOn(getServices, "getComponentCreatorId").mockImplementation(
        async () => {
          throw new Error("test error");
        }
      );
      const req = new NextRequest(url, {
        method: "PATCH",
        body: JSON.stringify(input),
      });
      const res = await updateComponentFilesHandler(req, {
        params: { slug: "1" },
      });

      expect(res.status).toBe(500);
    });
  });
});
