import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/style/tailwind.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: {
    default: "UI Trade",
    template: "%s - UI Trade",
  },

  description: "UI Trade",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
