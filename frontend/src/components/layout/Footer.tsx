// src/components/layout/Footer.tsx
import { cn } from "@/lib/utils";
import Image from "next/image";

const footerLinks = {
  Producto: [
    { label: "Funcionalidades", href: "#funcionalidades" },
    { label: "Cómo funciona", href: "#como-funciona" },
    { label: "Precios", href: "#planes" },
    { label: "Demo gratuita", href: "#planes" },
  ],
  Empresa: [
    { label: "Sobre nosotros", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Casos de éxito", href: "#testimonios" },
    { label: "Contacto", href: "#" },
  ],
  Legal: [
    { label: "Política de privacidad", href: "#" },
    { label: "Términos de uso", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Top: brand + links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
            <Image
              src="/logo-saas.png"
              alt="FoodFlow logo"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
              <span className="font-display font-bold text-[var(--text-primary)] text-[17px]">
                FoodFlow
              </span>
            </div>
            <p className="text-sm font-body text-[var(--text-secondary)] leading-relaxed max-w-[220px]">
              Automatización de pedidos y gestión para restaurantes vía
              WhatsApp.
            </p>
            <p className="mt-4 text-xs text-[var(--text-muted)] font-body">
              Tingo María, Huánuco · Perú
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-display font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={cn(
                        "text-sm font-body text-[var(--text-secondary)]",
                        "hover:text-[var(--green)] transition-colors duration-150"
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-body text-[var(--text-muted)]">
            © {new Date().getFullYear()} FoodFlow. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
            <span className="text-xs font-body text-[var(--text-muted)]">
              Sistema operativo
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
