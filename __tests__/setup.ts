import { PrismaClient } from "@prisma/client";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
import React from "react";
import { beforeEach, vi } from "vitest";
import { initialize } from "../src/tests/fabbrica";

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation");

  return {
    ...actual,
    usePathname: () => {
      return mockRouter.pathname;
    },
    useRouter: vi.fn().mockReturnValue(mockRouter),
    RedirectType: vi.fn().mockReturnValue("redirect"),
    useSearchParams: () => {
      const { query } = mockRouter;

      return new URLSearchParams(
        Object.entries(query).map(([key, value]) => [key, String(value)])
      );
    },
    notFound: vi.fn().mockImplementation((): never => {
      mockRouter.push("/404");

      return undefined as never;
    }),
  };
});
vi.mock("server-only", () => {
  return {
    isServer: true,
  };
});

beforeEach(() => {
  mockRouter.setCurrentUrl("/");
});

const prisma = new PrismaClient();

initialize({ prisma });

global.React = React;
