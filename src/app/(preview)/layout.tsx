import { PreviewLayout } from "@/layouts/root";

export default async function RootLayout({
  children,
  quick,
}: {
  children: React.ReactNode;
  quick: React.ReactNode;
}) {
  return (
    <PreviewLayout>
      {quick}
      {children}
    </PreviewLayout>
  );
}
