import { LangIcons } from "@/components/icons/LangIcons";
import { Extension } from "@/types/file";

export function LangIcon({
  extension,
  name,
}: {
  extension: Extension;
  name: string;
}) {
  const Icon = LangIcons[extension];

  return (
    <div className="flex items-center">
      <Icon className="mr-2 mt-0.5 h-4 w-4" />
      <span>
        {name}.{extension}
      </span>
    </div>
  );
}
