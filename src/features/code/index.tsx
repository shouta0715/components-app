import { codeBundler } from "@/modules/code";
import { Code } from "@/types/drizzle";

export const Codes = async ({ codes }: { codes: Code[] }) => {
  const { result } = await codeBundler(codes);

  return (
    <iframe
      className="h-full w-full overflow-hidden"
      loading="lazy"
      sandbox="allow-scripts allow-same-origin"
      srcDoc={result}
      title={codes[0].id}
    />
  );
};
