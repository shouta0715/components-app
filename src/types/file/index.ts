import { $Enums } from "@prisma/client";
import { picklist } from "valibot";

export type Extension = $Enums.Extension;

export const extensions = picklist(["tsx", "html", "css", "js", "ts", "jsx"]);
