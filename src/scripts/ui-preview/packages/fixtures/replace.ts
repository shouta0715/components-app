import { ESM_BASE_URL } from "@/scripts/ui-preview/constant";

const PACKAGE = "package";
const PACKAGE2 = "package2";

export const FX_NAMED_IMPORT = {
  target: `import { Component } from "${PACKAGE}"`,
  expected: `import { Component } from "${ESM_BASE_URL}/${PACKAGE}";`,
};
export const FX_DEFAULT_IMPORT = {
  target: `import Component from "${PACKAGE}"`,
  expected: `import Component from "${ESM_BASE_URL}/${PACKAGE}";`,
};
export const FX_DYNAMIC_IMPORT = {
  target: `import("${PACKAGE}")`,
  expected: `import("${ESM_BASE_URL}/${PACKAGE}")`,
};
export const FX_MULTI_IMPORT = {
  target: `import { Component1, Component2 } from "${PACKAGE}"`,
  expected: `import { Component1, Component2 } from "${ESM_BASE_URL}/${PACKAGE}";`,
};
export const FX_STUCK_IMPORT = {
  target: `import { Component1, Component2 } from "${PACKAGE}"; import { Component3 } from "${PACKAGE2}";`,
  expected: `import { Component1, Component2 } from "${ESM_BASE_URL}/${PACKAGE}"; import { Component3 } from "${ESM_BASE_URL}/${PACKAGE2}";`,
};

export const FX_MINIFIED_STUCK_IMPORT = {
  target: `import{Component1,Component2}from"${PACKAGE}";import{Component3}from"${PACKAGE2}";`,
  expected: `import {Component1,Component2} from "${ESM_BASE_URL}/${PACKAGE}";import {Component3} from "${ESM_BASE_URL}/${PACKAGE2}";`,
};

export const FX_NOT_LIBRARY_IMPORT = {
  target: `import { Component } from "./Component"`,
  expected: `import { Component } from "./Component";`,
};
