import { PreviewLayout } from "@/layouts/root";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PreviewLayout>{children}</PreviewLayout>;
}
