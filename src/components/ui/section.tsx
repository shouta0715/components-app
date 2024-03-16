import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";

const SectionTitle = React.forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-2xl font-bold text-primary sm:text-3xl", className)}
    {...props}
  >
    {children}
  </h2>
));

function SectionMoreLink({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <Link
      className={buttonVariants({
        variant: "link",
        className: cn("font-semibold text-lg", className),
      })}
      href={href}
    >
      {children}
      <ChevronRightIcon className="ml-2 h-5 w-5" />
    </Link>
  );
}

function Content({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

function Root({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("grid gap-32", className)}>{children}</div>;
}

function SectionDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("text-muted-foreground", className)}>{children}</p>;
}

function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("space-y-8 relative", className)}>
      {children}
    </section>
  );
}

Section.Title = SectionTitle;
Section.MoreLink = SectionMoreLink;
Section.Content = Content;
Section.Root = Root;
Section.Description = SectionDescription;

export { Section };
