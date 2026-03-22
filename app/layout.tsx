import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AZ Laundry Service | Laundry Pickup & Delivery for ASU Students",
  description:
    "Wash-and-fold laundry pickup & delivery for ASU students in Tempe. $1.50/lb, $20 minimum. Free pickup & delivery. Book online.",
  openGraph: {
    title: "AZ Laundry Service | Laundry Pickup & Delivery for ASU Students",
    description:
      "Wash-and-fold laundry pickup & delivery for ASU students in Tempe. $1.50/lb, $20 minimum. Free pickup & delivery. Book online.",
    type: "website",
    locale: "en_US",
    siteName: "AZ Laundry Service",
  },
  twitter: {
    card: "summary_large_image",
    title: "AZ Laundry Service | Laundry Pickup & Delivery for ASU Students",
    description:
      "Wash-and-fold laundry pickup & delivery for ASU students in Tempe. $1.50/lb, $20 minimum. Free pickup & delivery. Book online.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans antialiased">
        {children}

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VWWJRFK4EQ"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VWWJRFK4EQ');
          `}
        </Script>
      </body>
    </html>
  );
}
