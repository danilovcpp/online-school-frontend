import type { Metadata } from "next";
import { PropsWithChildren } from "react";

import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "Online school",
  description: "Online school",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
