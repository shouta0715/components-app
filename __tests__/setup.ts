import { PrismaClient } from "@prisma/client";
import "@testing-library/jest-dom";
import router from "next-router-mock";
import React from "react";
import { beforeEach, vi } from "vitest";
import { initialize } from "../src/tests/fabbrica";

vi.mock("next/navigation", () => ({
  // eslint-disable-next-line global-require
  ...require("next-router-mock"),
  usePathname: vi.fn().mockReturnValue("/"),
  RedirectType: vi.fn().mockReturnValue("redirect"),
  notFound: vi.fn().mockImplementation((): never => {
    router.push("/404");

    return undefined as never;
  }),
}));

beforeEach(() => {
  router.setCurrentUrl("/");
});

const prisma = new PrismaClient();

initialize({ prisma });

global.React = React;
