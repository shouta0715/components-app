import { redirect } from "next/navigation";
import { Params } from "@/types/next";

export default function Page({ params }: Params) {
  redirect(`/components/${params.slug}`);
}
