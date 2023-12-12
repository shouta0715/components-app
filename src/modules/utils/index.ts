import { Target } from "@/modules/types";
import { ExtensionType } from "@/types/file";

export const badCombinations: ExtensionType[][] = [
  ["html", "jsx"],
  ["html", "tsx"],
  ["jsx", "tsx"],
];

export function isBadCombination(targets: Target[]): boolean {
  const extensions = targets.map((t) => t.extension);

  return badCombinations.some((bad) => {
    return bad.every((b) => extensions.includes(b));
  });
}
