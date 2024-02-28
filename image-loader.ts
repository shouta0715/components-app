import { ImageProps } from "next/image";

export default function imageLoader({ src, width, quality }: ImageProps) {
  const query = new URLSearchParams();

  if (width) query.set("width", width.toString());

  query.set("quality", (quality || 70).toString());

  return `${src}?${query.toString()}`;
}
