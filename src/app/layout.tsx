import type { Metadata } from "next";
import { Bricolage_Grotesque, Caveat, DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BackToTop } from "@/components/BackToTop";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · Small-group guided tours`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} · Small-group guided tours`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} · Small-group guided tours`,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${dmSans.variable} ${caveat.variable}`}
    >
      <body className="flex min-h-screen flex-col overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2 focus:text-[15px] focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <Providers>
          <div className="fixed inset-x-0 top-0 z-[80]">
            <TopBar />
            <SiteHeader />
          </div>
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
