import React from "react";

export default function Layout({
  children,
  quick,
}: {
  children: React.ReactNode;
  quick: React.ReactNode;
}) {
  return (
    <>
      {quick}
      {children}
    </>
  );
}
