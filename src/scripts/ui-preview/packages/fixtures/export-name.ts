type FX = {
  file: string;
  id: string;
};

export const FX_NAMED_FUNCTION_COMPONENT: FX = {
  file: `export function Component() {}`,
  id: "1",
};

export const FX_CONST_ARROW_FUNCTION_COMPONENT: FX = {
  file: `export const Component = () => {}`,
  id: "1",
};

export const FX_DEFAULT_NAMED_FUNCTION_COMPONENT: FX = {
  file: `export default function Component() {}`,
  id: "1",
};

export const FX_DEFAULT_VARIABLE_COMPONENT: FX = {
  file: `export default Component`,
  id: "1",
};

export const FX_NAMED_COMPONENT: FX = {
  file: `export { Component }`,
  id: "1",
};

export const FX_NO_EXPORT_COMPONENT: FX = {
  file: `function Component() {}`,
  id: "1",
};

export const FX_NAMED_CHANGE_COMPONENT: FX = {
  file: `export function Changed() {}`,
  id: "1",
};

export const FX_CONST_ARROW_CHANGE_COMPONENT: FX = {
  file: `export const Changed = () => {}`,
  id: "1",
};

export const FX_DEFAULT_NAMED_CHANGE_COMPONENT: FX = {
  file: `export default function Changed() {}`,
  id: "1",
};

export const FX_DEFAULT_VARIABLE_CHANGE_COMPONENT: FX = {
  file: `export default Changed`,
  id: "1",
};

export const FX_NAMED_CHANGE: FX = {
  file: `export { Changed }`,
  id: "1",
};

export const FX_DOUBLE_EXPORT: FX = {
  file: `export { Component, Changed }`,
  id: "1",
};

export const FX_EXPECT_COMPONENT_NAME = "Component";
export const FX_EXPECT_CHANGE_NAME = "Changed";
