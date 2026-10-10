// src/app/terminos/page.tsx
import type { Metadata } from "next";
import { LegalDocument } from "@/components/layout/LegalDocument";
import { legalSections } from "@/data/legal";

export const metadata: Metadata = {
  title: "Términos y Condiciones · GenViaYA",
  description:
    "Términos y condiciones de uso de GenViaYA, plataforma SaaS de pedidos por WhatsApp para restaurantes en Perú.",
  alternates: {
    canonical: "https://genviaya.com/terminos/",
  },
};

export default function TerminosPage() {
  return (
    <LegalDocument
      section={legalSections.find((s) => s.id === "terminos")!}
      badge="Términos de uso"
      title={
        <>
          Términos y <span className="text-gradient-brand">Condiciones</span>
        </>
      }
      intro="Las condiciones que rigen el uso de GenViaYA: naturaleza del servicio, pagos, responsabilidades y uso aceptable de la plataforma."
      related={{ label: "Eliminación de Datos", href: "/eliminacion-datos/" }}
    />
  );
}
