// src/app/privacidad/page.tsx
import type { Metadata } from "next";
import { LegalDocument } from "@/components/layout/LegalDocument";
import { legalSections } from "@/data/legal";

export const metadata: Metadata = {
  title: "Política de Privacidad · GenViaYA",
  description:
    "Política de privacidad de GenViaYA: cómo protegemos los datos de tu restaurante y de tus comensales, en cumplimiento con la Ley N° 29733 del Perú.",
  alternates: {
    canonical: "https://genviaya.com/privacidad/",
  },
};

export default function PrivacidadPage() {
  return (
    <LegalDocument
      section={legalSections.find((s) => s.id === "privacidad")!}
      badge="Privacidad"
      title={
        <>
          Política de <span className="text-gradient-brand">Privacidad</span>
        </>
      }
      intro="Transparencia sobre cómo recopilamos, usamos y protegemos los datos de tu restaurante y de tus comensales."
      related={{ label: "Términos y Condiciones", href: "/terminos/" }}
    />
  );
}
