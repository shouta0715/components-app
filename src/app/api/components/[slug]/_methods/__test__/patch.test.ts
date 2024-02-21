import "@/tests/mocks/session";
import { NextRequest } from "next/server";
import { PATCH as updateComponentHandler } from "../patch";
import { ComponentUpdateInput } from "@/lib/schema/server/component";
import * as getServices from "@/services/components/get";
import * as services from "@/services/components/patch";
import { testBaseURL } from "@/tests/mocks/setup";

const url = `${testBaseURL}/api/components/1`;

const input: Required<ComponentUpdateInput> = {
  name: "new name",
  description: "new description",
  previewUrl: "new previewUrl",
  draft: false,
  categoryName: "new category",
  document: "new document",
};

describe("PATCH Component API test", () => {
  describe("success", () => {
    beforeAll(() => {
      vi.spyOn(services, "updateComponent").mockImplementation(async () => {
        return { id: "1" };
      });

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
      const res = await updateComponentHandler(req, { params: { slug: "1" } });

      expect(res.status).toBe(204);
    });

    test("should call updateComponent", async () => {
      const req = new NextRequest(url, {
        method: "PATCH",
        body: JSON.stringify(input),
      });
      await updateComponentHandler(req, { params: { slug: "1" } });

      expect(services.updateComponent).toBeCalledWith("1", input);
    });

    test("some fields are updated", async () => {
      const req = new NextRequest(url, {
        method: "PATCH",
        body: JSON.stringify({
          name: "new name",
          description: "new description",
        }),
      });
      await updateComponentHandler(req, { params: { slug: "1" } });

      expect(services.updateComponent).toBeCalledWith("1", {
        name: "new name",
        description: "new description",
      });
    });
  });

  describe("failure", () => {
    test("if name is empty, should return 400", async () => {
      const req = new NextRequest(url, {
        method: "PATCH",
        body: JSON.stringify({ ...input, name: "" }),
      });
      const res = await updateComponentHandler(req, { params: { slug: "1" } });

      expect(res.status).toBe(400);
    });

    test("if name is too long, should return 400", async () => {
      const req = new NextRequest(url, {
        method: "PATCH",
        body: JSON.stringify({ ...input, name: "a".repeat(51) }),
      });
      const res = await updateComponentHandler(req, { params: { slug: "1" } });

      expect(res.status).toBe(400);
    });

    test("if description is too long, should return 400", async () => {
      const req = new NextRequest(url, {
        method: "PATCH",
        body: JSON.stringify({ ...input, description: "a".repeat(201) }),
      });
      const res = await updateComponentHandler(req, { params: { slug: "1" } });

      expect(res.status).toBe(400);
    });

    test("if body is not valid, should return 400", async () => {
      const req = new NextRequest(url, {
        method: "PATCH",
        body: JSON.stringify({ ...input, name: 1 }),
      });
      const res = await updateComponentHandler(req, { params: { slug: "1" } });

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
      const res = await updateComponentHandler(req, { params: { slug: "1" } });

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
      const res = await updateComponentHandler(req, { params: { slug: "1" } });

      expect(res.status).toBe(500);
    });
  });
});
