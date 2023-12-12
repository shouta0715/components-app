import { minify as Minify } from "minify";
import { MinifyError } from "@/lib/errors";
import { Target } from "@/modules/types";

export function minify({ target, extension }: Target) {
  if (extension === "html") {
    return Minify.html(target);
  }

  if (extension === "css") {
    return Minify.css(target);
  }

  if (
    extension === "js" ||
    extension === "ts" ||
    extension === "tsx" ||
    extension === "jsx"
  ) {
    return target;
  }

  throw new MinifyError();
}
