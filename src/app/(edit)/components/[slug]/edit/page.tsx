import { checkEditRedirect } from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/redirect";
import { Params } from "@/types/next";

export default async function Page({ params }: Params) {
  return checkEditRedirect(params.slug, "Home");
}
