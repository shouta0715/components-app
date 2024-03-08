import { describe, expect, test } from "vitest";

import { NotFoundError } from "@/lib/errors";
import {
  getComp,
  getCompWithFiles,
  getCompWithImages,
  getTopComps,
} from "@/services/components/get";
import {
  defineCategoryFactory,
  defineComponentFactory,
  defineFileFactory,
  defineUserFactory,
} from "@/tests/fabbrica";

describe("GET Component RDB Test", async () => {
  test("getComp", async () => {
    const category = defineCategoryFactory();
    const creator = defineUserFactory();
    const mockComponent = defineComponentFactory({
      defaultData: { category, creator },
    });

    const wont = await mockComponent.create();

    const should = await getComp(wont.id);

    expect(should).toStrictEqual(should);
  });

  test("getCompWithFiles", async () => {
    const category = defineCategoryFactory();
    const creator = defineUserFactory();
    const mockComponent = await defineComponentFactory({
      defaultData: { category, creator },
    }).create();
    const mockFile = defineFileFactory({
      defaultData: async () => ({
        component: {
          connect: {
            id: mockComponent.id,
          },
        },
      }),
    });

    await mockFile.createList(3);

    const should = await getCompWithFiles(mockComponent.id);

    expect(should).toStrictEqual(should);
  });

  test("if getComponent is null throw on NotFoundError", async () => {
    expect(getComp("")).rejects.toThrow(NotFoundError);
  });

  test("getCompWithImages", async () => {
    const category = defineCategoryFactory();
    const creator = defineUserFactory();

    const component = defineComponentFactory({
      defaultData: { category, creator },
    });

    const wont = await component.create();

    const should = await getCompWithImages(wont.id);

    expect(should).toStrictEqual(should);
  });

  test("if getComponentWithImages is null throw on NotFoundError", async () => {
    expect(getCompWithImages("not-found")).rejects.toThrow(NotFoundError);
  });

  test("getTopComps", async () => {
    const category = defineCategoryFactory();
    const creator = defineUserFactory();

    const component = defineComponentFactory({
      defaultData: { category, creator },
    });

    await component.createList(10);

    const should = await getTopComps(5);

    expect(should).toHaveLength(5);
  });
});
