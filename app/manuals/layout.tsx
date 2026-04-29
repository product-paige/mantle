import type { ReactNode } from "react";
import { CompassHeader } from "@/components/CompassHeader";

/**
 * Manual route layout — loads the same CSS the static manual pages use
 * so MDX-rendered manuals match the existing visual system exactly.
 */
export default function ManualsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin=""
      />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@400;500&display=swap"
      />
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link
        rel="stylesheet"
        href="/manuals/get-to-real-demand/manual-base.css"
      />
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href="/manuals/get-to-real-demand/manual.css" />
      <CompassHeader />
      {children}
    </>
  );
}
