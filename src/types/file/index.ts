import { Input, picklist } from "valibot";

export const extensions = picklist(["tsx", "html", "css", "js", "ts", "jsx"]);

export type ExtensionType = Input<typeof extensions>;
