import { Provider, WritableAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";

export const setupNextParameter = (
  pathname: string,
  query?: Record<string, string>
) => {
  return {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: `/${pathname}`,
        query,
      },
    },
  };
};

type HydrateAtomProps = {
  initialValues: Iterable<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly [WritableAtom<unknown, [any], unknown>, unknown]
  >;
  children: React.ReactNode;
};
const HydrateAtoms = ({ initialValues, children }: HydrateAtomProps) => {
  useHydrateAtoms(new Map(initialValues));

  return children;
};

export const TestAtomProvider = ({
  initialValues,
  children,
}: HydrateAtomProps) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);
