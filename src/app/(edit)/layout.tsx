import React from "react";
import { EditLayout } from "@/layouts/root";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <EditLayout>{children}</EditLayout>;
}
