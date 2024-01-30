import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/shared/Navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Blanked",
  description: "Blanked app for your ideas",
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html lang="en">
      <body className={cn("my-4 mx-2 md:m-4 bg-background font-sans antialiased", inter.className)}>
        <ConvexClientProvider>
          <Navigation />
          {children}
          <Toaster />
        </ConvexClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;