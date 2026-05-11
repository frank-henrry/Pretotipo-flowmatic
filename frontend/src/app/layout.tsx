// src/app/layout.tsx
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Syne, DM_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GenViaYA · Automatiza pedidos de tu restaurante por WhatsApp",
  description:
    "GenViaYA convierte tu WhatsApp Business en un sistema de pedidos, CRM y logística. Menú interactivo, despacho inteligente y gestión de mesas en un solo panel.",
  keywords: [
    "automatización restaurantes",
    "pedidos por WhatsApp",
    "CRM restaurantes",
    "gestión de mesas",
    "delivery automatizado",
    "WhatsApp Business restaurante",
    "software restaurantes Perú",
    "GenViaYA",
  ],
  authors: [{ name: "GenViaYA" }],
  creator: "GenViaYA",
  metadataBase: new URL("https://genviaya.com"),
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://genviaya.com",
    title: "GenViaYA · Automatiza pedidos de tu restaurante por WhatsApp",
    description:
      "Pedidos automáticos, CRM, logística y mesas — todo desde WhatsApp. Empieza gratis 14 días.",
    siteName: "GenViaYA",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GenViaYA — Automatización de pedidos por WhatsApp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GenViaYA · Automatiza pedidos de tu restaurante por WhatsApp",
    description:
      "Pedidos automáticos, CRM, logística y mesas — todo desde WhatsApp.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${syne.variable} ${dmSans.variable}`}
    >
      <head>
        <link rel="icon" href="/logo-saas.png" type="image/png" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        {/* Reemplaza G-XXXXXXXXXX con tu ID real de Google Analytics */}
        <GoogleAnalytics gaId="G-8MKZQ5J1JR" />
      </body>
    </html>
  );
}