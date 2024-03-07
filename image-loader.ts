import { ImageProps } from "next/image";

export default function imageLoader({ src, width, quality }: ImageProps) {
  const isRelative = src.toString().startsWith("/");

  if (isRelative) return src;

  const url = new URL(src.toString());

  const query = new URLSearchParams(url.search);

  if (width) query.set("width", width.toString());

  query.set("quality", (quality || 70).toString());

  return `${url.origin}${url.pathname}?${query.toString()}`;
}
