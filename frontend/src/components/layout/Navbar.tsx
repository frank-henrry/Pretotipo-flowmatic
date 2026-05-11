// src/components/layout/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navLinks = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Preguntas", href: "#preguntas" },
];

interface NavbarProps {
  onOpenModal: (e?: React.MouseEvent) => void;
}

export function Navbar({ onOpenModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú al cambiar tamaño de pantalla
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--background)]/85 backdrop-blur-xl border-b border-[var(--border)]"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group"
          aria-label="GenViaYA inicio"
        >
        <Image
          src="/logo-saas.png"
          alt="GenViaYA logo"
          width={32}
          height={32}
          className="w-8 h-8 object-contain"
          priority
        />
      <span className="font-display font-bold text-[var(--text-primary)] text-[18px] tracking-[-0.03em]">
        GenVia<span style={{ color: "var(--green)" }}>YA</span>
      </span>
        </a>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-sm font-body text-[var(--text-secondary)]",
                  "hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)]",
                  "transition-all duration-150"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Acciones desktop */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={onOpenModal}
            id="cta-nav-demo"
            data-event="nav_cta_click"
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium font-body",
              "bg-[var(--green)] text-white",
              "hover:bg-[var(--green-hover)] hover:shadow-[0_0_16px_var(--green-glow)]",
              "transition-all duration-200"
            )}
          >
            Solicitar demo
          </button>
        </div>

        {/* Mobile: toggle + theme */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menú"
            className={cn(
              "w-9 h-9 rounded-lg flex items-center justify-center",
              "border border-[var(--border)] bg-[var(--surface)]",
              "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
              "transition-colors duration-150"
            )}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          "border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-xl",
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "px-3 py-2.5 rounded-lg text-sm font-body text-[var(--text-secondary)]",
                "hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)]",
                "transition-all duration-150"
              )}
            >
              {link.label}
            </a>
          ))}
          <button
            id="cta-nav-demo-mobile"
            data-event="nav_cta_click_mobile"
            onClick={(e) => { setMobileOpen(false); onOpenModal(e); }}
            className={cn(
              "mt-2 px-4 py-2.5 rounded-lg text-sm font-medium font-body text-center",
              "bg-[var(--green)] text-white",
              "hover:bg-[var(--green-hover)]",
              "transition-all duration-200"
            )}
          >
            Solicitar demo gratis
          </button>
        </div>
      </div>
    </header>
  );
}
