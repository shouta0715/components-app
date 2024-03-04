import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function AuthLink() {
  return (
    <Link className={buttonVariants()} href="/auth/login" scroll={false}>
      LogIn
    </Link>
  );
}
