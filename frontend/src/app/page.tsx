"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LogosBand } from "@/components/sections/LogosBand";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { PricingCTA } from "@/components/sections/PricingCTA";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FakeDoorModal } from "@/components/sections/FakeDoorModal";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <Navbar onOpenModal={openModal} />
      <main>
        {/* 1. Hero: propuesta de valor + mockup WhatsApp */}
        <Hero onOpenModal={openModal} />

        {/* 2. Banda de restaurantes (social proof visual) */}
        <LogosBand />

        {/* 3. Features en bento grid */}
        <Features />

        {/* 4. Cómo funciona — 3 pasos */}
        <HowItWorks />

        {/* 5. Testimonios */}
        <Testimonials />

        {/* 6. Planes + CTAs trackables */}
        <PricingCTA onOpenModal={openModal} />

        {/* 7. FAQ acordeón */}
        <FAQ />

        {/* 8. CTA final de conversión */}
        <FinalCTA onOpenModal={openModal} />
      </main>
      <Footer />

      <FakeDoorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
