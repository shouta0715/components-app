import { Provider } from "jotai";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider>{children}</Provider>;
}
