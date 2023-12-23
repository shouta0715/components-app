import { VariantProps } from "class-variance-authority";
import NLink from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";

export type LinkProps = Omit<VariantProps<typeof buttonVariants>, "variant"> & {
  href: string;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link = ({
  href,
  size,
  radius,
  className,
  ...props
}: LinkProps) => {
  return (
    <NLink
      className={cn(
        buttonVariants({ variant: "link", size, className, radius })
      )}
      href={href}
      {...props}
    />
  );
};
