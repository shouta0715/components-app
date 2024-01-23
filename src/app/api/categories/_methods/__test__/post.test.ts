import "@/tests/mocks/session";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { POST as createCategoryHandler } from "../post";
import {
  ForbiddenError,
  InternalServerError,
  UnauthorizedError,
} from "@/lib/errors";
import { CategoryInput } from "@/lib/schema/server/category";
import * as services from "@/services/category/post";
import { testBaseURL } from "@/tests/mocks/setup";

const url = `${testBaseURL}/api/categories`;
const input: CategoryInput = {
  name: "test name",
  description: "test description",
};

describe("POST Categories API Test", async () => {
  describe("success", () => {
    beforeAll(() => {
      vi.spyOn(services, "createCategory").mockImplementation(async () => {
        return { name: input.name };
      });
    });

    afterAll(() => {
      vi.restoreAllMocks();
    });

    test("should return 201", async () => {
      const req = new NextRequest(url, {
        method: "POST",
        body: JSON.stringify(input),
      });
      const res = await createCategoryHandler(req);

      expect(res.status).toBe(201);
    });
  });

  describe("failure", () => {
    test("if name is empty, should return 400", async () => {
      const req = new NextRequest(url, {
        method: "POST",
        body: JSON.stringify({ ...input, name: "" }),
      });
      const res = await createCategoryHandler(req);

      expect(res.status).toBe(400);
    });

    test("if description is empty, should return 400", async () => {
      const req = new NextRequest(url, {
        method: "POST",
        body: JSON.stringify({ ...input, description: "" }),
      });
      const res = await createCategoryHandler(req);

      expect(res.status).toBe(400);
    });

    test("if name is too long, should return 400", async () => {
      const req = new NextRequest(url, {
        method: "POST",
        body: JSON.stringify({ ...input, name: "a".repeat(26) }),
      });
      const res = await createCategoryHandler(req);

      expect(res.status).toBe(400);
    });

    test("if description is too long, should return 400", async () => {
      const req = new NextRequest(url, {
        method: "POST",
        body: JSON.stringify({ ...input, description: "a".repeat(101) }),
      });
      const res = await createCategoryHandler(req);

      expect(res.status).toBe(400);
    });

    test("if createCategory throws Prisma.PrismaClientKnownRequestError, should return 404", async () => {
      vi.spyOn(services, "createCategory").mockImplementation(async () => {
        throw new Prisma.PrismaClientKnownRequestError("", {
          code: "P2002",
          clientVersion: "",
        });
      });

      const req = new NextRequest(url, {
        method: "POST",
        body: JSON.stringify(input),
      });

      const res = await createCategoryHandler(req);

      expect(res.status).toBe(404);
    });

    test("if createCategory throws Prisma.PrismaClientValidationError, should return 404", async () => {
      vi.spyOn(services, "createCategory").mockImplementation(async () => {
        throw new Prisma.PrismaClientValidationError("", {
          clientVersion: "",
        });
      });

      const req = new NextRequest(url, {
        method: "POST",
        body: JSON.stringify(input),
      });

      const res = await createCategoryHandler(req);

      expect(res.status).toBe(404);
    });

    test("if createCategory throws InternalServerError, should return 500", async () => {
      vi.spyOn(services, "createCategory").mockImplementation(async () => {
        throw new InternalServerError();
      });

      const req = new NextRequest(url, {
        method: "POST",
        body: JSON.stringify(input),
      });

      const res = await createCategoryHandler(req);

      expect(res.status).toBe(500);
    });

    test("if createCategory throws UnauthorizedError should return 401", async () => {
      vi.spyOn(services, "createCategory").mockImplementation(async () => {
        throw new UnauthorizedError();
      });

      const req = new NextRequest(url, {
        method: "POST",
        body: JSON.stringify(input),
      });

      const res = await createCategoryHandler(req);

      expect(res.status).toBe(401);
    });
    test("if createCategory throws ForbiddenError should return 403", async () => {
      vi.spyOn(services, "createCategory").mockImplementation(async () => {
        throw new ForbiddenError();
      });

      const req = new NextRequest(url, {
        method: "POST",
        body: JSON.stringify(input),
      });

      const res = await createCategoryHandler(req);

      expect(res.status).toBe(403);
    });

    test("if createCategory throws any other error, should return 500", async () => {
      vi.spyOn(services, "createCategory").mockImplementation(async () => {
        throw new Error();
      });

      const req = new NextRequest(url, {
        method: "POST",
        body: JSON.stringify(input),
      });

      const res = await createCategoryHandler(req);

      expect(res.status).toBe(500);
    });
  });
});
