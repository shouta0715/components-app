import I from "next/image";
import { ComponentProps } from "react";

type ImagesProps = ComponentProps<typeof I>;

export const Image = (props: ImagesProps) => {
  return <I {...props} />;
};
