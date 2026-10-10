// src/app/eliminacion-datos/page.tsx
import type { Metadata } from "next";
import { LegalDocument } from "@/components/layout/LegalDocument";
import { legalSections } from "@/data/legal";

export const metadata: Metadata = {
  title: "Eliminación de Datos · GenViaYA",
  description:
    "Cómo solicitar la eliminación de tus datos personales en GenViaYA, como restaurante afiliado o consumidor final, conforme a la Ley N° 29733 del Perú.",
  alternates: {
    canonical: "https://genviaya.com/eliminacion-datos/",
  },
};

export default function EliminacionDatosPage() {
  return (
    <LegalDocument
      section={legalSections.find((s) => s.id === "eliminacion")!}
      badge="Tus datos"
      title={
        <>
          Eliminación de <span className="text-gradient-brand">Datos</span>
        </>
      }
      intro="Tienes control sobre tu información. Aquí te explicamos cómo solicitar la eliminación de tus datos y en qué plazos la atendemos."
      related={{ label: "Política de Privacidad", href: "/privacidad/" }}
    />
  );
}
