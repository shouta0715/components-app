import React from "react";
import { Params } from "@/types/next";

export default function Page({ params }: Params) {
  return <div>Quick View {params.slug}</div>;
}
