import { Input, picklist } from "valibot";

export const extensions = picklist(["tsx", "html", "css", "js", "ts", "jsx"]);

export type Extension = Input<typeof extensions>;

export const imageExtensions = picklist(["png", "jpg", "jpeg", "gif", "webp"]);
