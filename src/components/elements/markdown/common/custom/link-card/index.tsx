import { LinkIcon } from "lucide-react";
import type { RootContentMap } from "mdast";
import Image from "next/image";
import { cache, use } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getOGImageUrl } from "@/utils";

type Metadata = {
  url: string;
  site_name?: string;
  title?: string;
  description?: string;
  image?: string;
};

const fetchMetadata = async (url: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STORAGE_URL}/metadata?url=${url}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch metadata");
  }

  const metadata = (await response.json()) as Metadata;

  return metadata;
};

const NoImageNode = ({
  node,
  title,
  description,
}: {
  node: RootContentMap["link-card"];
  title?: string;
  description?: string;
}) => {
  return (
    <Card className="group w-full">
      <a
        className="flex h-36 w-full items-center break-words rounded-md border border-border transition-colors duration-200 ease-in-out group-hover:bg-accent/20 group-hover:text-accent-foreground"
        href={node.url}
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="min-w-0 flex-1  p-4">
          <p className="line-clamp-2 w-full flex-1 break-words text-sm font-semibold text-primary sm:text-xl">
            {title}
          </p>
          <CardContent className="my-2 line-clamp-1 flex-1 p-0 text-sm text-muted-foreground">
            {description}
          </CardContent>
          <span className="mt-auto flex overflow-hidden text-xs">
            <LinkIcon className="mr-1 inline-block min-w-4" size={16} />
            <span className="truncate">{node.url}</span>
          </span>
        </div>

        <div className="relative h-36 w-32 border-l border-border sm:w-52">
          <Skeleton className="h-full w-full " />
        </div>
      </a>
    </Card>
  );
};

export const ErrorLinkCard = ({
  node,
}: {
  node: RootContentMap["link-card"];
}) => {
  return (
    <a
      className="underline underline-offset-4"
      href={node.url}
      rel="noreferrer"
      target="_blank"
    >
      {node.url}
    </a>
  );
};

export const LoadingLinkCard = ({
  node,
}: {
  node: RootContentMap["link-card"];
}) => {
  return (
    <Card className="group w-full">
      <a
        className="flex h-36 w-full items-center break-words rounded-md border border-border transition-colors duration-200 ease-in-out group-hover:bg-accent/20 group-hover:text-accent-foreground"
        href={node.url}
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="min-w-0 flex-1  p-4">
          <Skeleton className="h-10 w-full" />
          <CardContent className="my-2 line-clamp-1 flex-1 p-0 text-sm text-muted-foreground">
            <Skeleton className="h-4 w-full max-w-sm" />
          </CardContent>
          <span className="mt-auto flex overflow-hidden text-xs">
            <LinkIcon className="mr-1 inline-block min-w-4" size={16} />
            <span className="truncate">{node.url}</span>
          </span>
        </div>

        <div className="relative h-36 w-32 sm:w-52">
          <Skeleton className="h-full w-full " />
        </div>
      </a>
    </Card>
  );
};

const cacheFetchMetadata = cache(fetchMetadata);

export const LinkCard = ({ node }: { node: RootContentMap["link-card"] }) => {
  const { image, title, description } = use(cacheFetchMetadata(node.url));

  if (!image) {
    return <NoImageNode description={description} node={node} title={title} />;
  }

  return (
    <Card className="group w-full">
      <a
        className="flex h-36 w-full items-center break-words rounded-md border border-border transition-colors duration-200 ease-in-out group-hover:bg-accent group-hover:text-accent-foreground"
        href={node.url}
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="min-w-0 flex-1  p-4">
          <p className="line-clamp-2 w-full flex-1 break-words text-sm font-semibold text-primary sm:text-xl">
            {title}
          </p>
          <CardContent className="my-2 line-clamp-1 flex-1 p-0 text-sm text-muted-foreground">
            {description}
          </CardContent>
          <span className="mt-auto flex overflow-hidden text-xs">
            <LinkIcon className="mr-1 inline-block min-w-4" size={16} />
            <span className="truncate">{node.url}</span>
          </span>
        </div>

        <div className="relative h-36 w-32 sm:w-52">
          <Image
            alt={title || "No title"}
            className="h-full w-full object-cover"
            fill
            src={getOGImageUrl(image)}
          />
        </div>
      </a>
    </Card>
  );
};
