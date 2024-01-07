import fs from "fs";
import path from "path";

export const getMarkdownText = (name: string = "index"): string => {
  const baseFolder = `${process.cwd()}/prisma/seed/fixtures/assets/files`;

  const filePath = path.join(baseFolder, `${name}.md`);

  return fs.readFileSync(filePath, "utf8");
};
