import { PreviewLayout } from "@/layouts/root";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PreviewLayout>{children}</PreviewLayout>;
}
