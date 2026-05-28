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
  title: "GenViaYA · Bot WhatsApp para Restaurantes - Automatiza Pedidos",
  description:
    "Convierte tu WhatsApp en un sistema de pedidos automáticos para tu restaurante. Bot inteligente, CRM de clientes, panel de despacho en tiempo real, gestión de reservas y análisis de ventas. Prueba gratis 14 días.",
  keywords: [
    "bot whatsapp restaurante",
    "automatizar pedidos restaurante",
    "chatbot pedidos whatsapp",
    "sistema pedidos whatsapp",
    "automatización restaurantes peru",
    "whatsapp bot pedidos",
    "menu interactivo whatsapp",
    "gestión pedidos restaurante",
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
  alternates: {
    canonical: "https://genviaya.com",
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://genviaya.com",
    title: "GenViaYA · Bot WhatsApp para Restaurantes — Automatiza Pedidos",
    description:
      "Bot de WhatsApp para restaurantes: pedidos automáticos, CRM, despacho en tiempo real y gestión de mesas. Empieza gratis 14 días.",
    siteName: "GenViaYA",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GenViaYA — Bot WhatsApp para automatizar pedidos de restaurante",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GenViaYA · Bot WhatsApp para Restaurantes",
    description:
      "Automatiza los pedidos de tu restaurante por WhatsApp. Bot inteligente + CRM + despacho en tiempo real.",
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

const jsonLdSoftware = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "GenViaYA",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "Sistema de automatización de pedidos para restaurantes vía WhatsApp. Bot inteligente con menú interactivo, CRM de clientes, panel de despacho en tiempo real, gestión de reservas y análisis de ventas.",
  "url": "https://genviaya.com",
  "inLanguage": "es-PE",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "PEN",
    "description": "Prueba gratuita 14 días sin tarjeta de crédito",
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "120",
    "bestRating": "5",
  },
  "featureList": [
    "Bot de pedidos por WhatsApp con menú interactivo",
    "CRM de clientes con historial de conversaciones",
    "Panel de despacho en tiempo real con estados",
    "Gestión de reservas por WhatsApp",
    "Análisis y dashboard de ventas",
    "Configuración de productos y reglas del bot",
    "Notificaciones automáticas de estado al cliente",
  ],
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "GenViaYA",
  "url": "https://genviaya.com",
  "logo": "https://genviaya.com/logo-saas.png",
  "description": "Empresa de automatización para restaurantes mediante WhatsApp Business.",
  "areaServed": {
    "@type": "Country",
    "name": "Peru",
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "availableLanguage": "Spanish",
  },
};

const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Necesito WhatsApp Business para usar GenViaYA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, necesitas una cuenta de WhatsApp Business API. Te ayudamos a configurarla durante la incorporación.",
      },
    },
    {
      "@type": "Question",
      "name": "¿El bot puede tomar pedidos de mis clientes existentes de WhatsApp?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. Cualquier cliente que escriba a tu número de WhatsApp Business recibirá el menú interactivo del bot y podrá hacer su pedido de forma automática.",
      },
    },
    {
      "@type": "Question",
      "name": "¿Cómo automatiza GenViaYA los pedidos de mi restaurante por WhatsApp?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cuando un cliente escribe a tu número de WhatsApp, el bot les muestra un menú interactivo creado con WhatsApp Flows. El cliente selecciona sus productos, indica dirección y método de pago, y el pedido aparece automáticamente en tu panel de control en tiempo real.",
      },
    },
    {
      "@type": "Question",
      "name": "¿Puedo seguir atendiendo yo mismo a los clientes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. Puedes activar el modo humano en cualquier momento desde el CRM para tomar la conversación. El bot se retira automáticamente y vuelve cuando lo desees.",
      },
    },
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta GenViaYA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ofrecemos una prueba gratuita de 14 días sin necesidad de tarjeta de crédito. Después del período de prueba existen planes mensuales adaptados al tamaño de tu restaurante.",
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
        />
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
        <GoogleAnalytics gaId="G-V3FF8EMJSY" />
      </body>
    </html>
  );
}
