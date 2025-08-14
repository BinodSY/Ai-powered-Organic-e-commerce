import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans } from "next/font/google"
import Script from "next/script"
import { ProductProvider } from "@/contexts/product-context"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Pure Extracts - Premium Botanical CO₂ Extraction",
  description:
    "Leading provider of supercritical CO₂ extraction services for premium botanical compounds, essential oils, and natural extracts for food, cosmetics, and pharmaceutical industries.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable} antialiased`}>
      {/* Google Analytics */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-HWP3CHCSRV" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HWP3CHCSRV');
        `}
      </Script>
      <body className="font-sans">
        <ProductProvider>{children}</ProductProvider>
      </body>
    </html>
  )
}
