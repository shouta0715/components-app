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

const BendAnchor = ({ href }: { href: string }) => {
  return <Link className="absolute inset-0 z-10" href={href} />;
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
        "pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-4 transition-all duration-300 group-hover:-translate-y-10",
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
        "font-semibold text-popover-foreground md:text-xl",
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
      {asLink && <BendAnchor href={href} />}
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
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-black/[.]" />
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
