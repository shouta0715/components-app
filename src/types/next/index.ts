export type Params<T extends string[] | string = "slug"> = {
  params: T extends string
    ? T extends ""
      ? never
      : { [key in T]: string }
    : T["length"] extends 0
      ? never
      : { [key in T[number]]: string };
};
