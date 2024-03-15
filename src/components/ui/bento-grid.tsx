import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/utils";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={cn(className)}>{children}</div>;
};

const BentoAnchor = ({ href, name }: { href: string; name: string }) => {
  return (
    <Link className="absolute inset-0 z-20" href={href}>
      <span className="sr-only">{name}の詳細を見る</span>
    </Link>
  );
};

const BentoBackground = ({ children }: { children: ReactNode }) => {
  return children;
};

const BentoHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <CardHeader
      className={cn(
        "pointer-events-none p-4 z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 group-hover:-translate-y-12",
        className
      )}
    >
      {children}
    </CardHeader>
  );
};

const BentoTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <CardTitle
      className={cn(
        "font-semibold text-popover-foreground text-lg md:text-xl",
        className
      )}
    >
      {children}
    </CardTitle>
  );
};

const BentoDescription = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <CardDescription className={cn("max-w-lg", className)}>
      {children}
    </CardDescription>
  );
};

const BentoCard = ({
  name,
  className,
  children,
  href,
  cta,
  asLink,
}: {
  name: string;
  className?: string;
  href: string;
  cta: string;
  asLink?: boolean;
  children: ReactNode;
}) => {
  return (
    <Card
      key={name}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl bg-background",
        className
      )}
    >
      {asLink && <BentoAnchor href={href} name={name} />}
      {children}
      <CardContent className="p-0">
        <div
          className={cn(
            "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center px-1 pb-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          )}
        >
          <Button
            asChild
            className="pointer-events-auto group-hover:text-destructive"
            size="sm"
            variant="ghost"
          >
            <Link href={href}>
              {cta}
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.02] group-hover:dark:bg-black/[.1]" />
    </Card>
  );
};

export {
  BentoCard,
  BentoGrid,
  BentoBackground,
  BentoHeader,
  BentoTitle,
  BentoDescription,
};
