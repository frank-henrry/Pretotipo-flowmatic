// src/components/layout/LegalDocument.tsx
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Badge } from "@/components/ui/Badge";
import type { LegalSection } from "@/data/legal";
import { cn } from "@/lib/utils";

interface LegalDocumentProps {
  section: LegalSection;
  badge: string;
  title: React.ReactNode;
  intro: string;
  related: { label: string; href: string };
}

export function LegalDocument({ section, badge, title, intro, related }: LegalDocumentProps) {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--background)]/85 backdrop-blur-xl border-b border-[var(--border)]">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5" aria-label="GenViaYA inicio">
            <Image
              src="/logo-icon.png"
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
          <div className="flex items-center gap-2">
            <a
              href="/"
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-body text-[var(--text-secondary)]",
                "hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)]",
                "transition-all duration-150"
              )}
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Volver al inicio</span>
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Hero */}
        <div className="max-w-3xl mb-14">
          <Badge>{badge}</Badge>
          <h1 className="mt-4 font-display font-bold text-[var(--text-primary)] text-4xl sm:text-5xl tracking-[-0.03em] leading-[1.1]">
            {title}
          </h1>
          <p className="mt-5 text-base font-body text-[var(--text-secondary)] leading-relaxed">
            {intro}
          </p>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-10 lg:gap-14">
          {/* Índice */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24" aria-label="Índice">
              <p className="text-xs font-display font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-3">
                Contenido
              </p>
              <ul className="space-y-2 border-l border-[var(--border)]">
                {section.clauses.map((clause) => (
                  <li key={clause.id}>
                    <a
                      href={`#clausula-${clause.id}`}
                      className={cn(
                        "block pl-3 -ml-px border-l border-transparent text-[13px] font-body text-[var(--text-secondary)] leading-snug",
                        "hover:text-[var(--green)] hover:border-[var(--green)] transition-colors duration-150"
                      )}
                    >
                      {clause.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Contenido */}
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-9 h-9 rounded-lg flex items-center justify-center bg-[var(--green-dim)] text-[var(--green)] font-display font-bold text-sm">
                {section.number}
              </span>
              <h2 className="font-display font-bold text-[var(--text-primary)] text-2xl sm:text-3xl tracking-[-0.02em]">
                {section.title}
              </h2>
            </div>

            <div className="space-y-4">
              {section.clauses.map((clause) => (
                <article
                  key={clause.id}
                  id={`clausula-${clause.id}`}
                  className="card-glow scroll-mt-24 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7"
                >
                  <h3 className="font-display font-semibold text-[var(--text-primary)] text-base sm:text-lg mb-3">
                    <span className="text-[var(--green)] mr-2">{clause.id}</span>
                    {clause.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] font-body text-[var(--text-secondary)] leading-relaxed">
                    {clause.body}
                  </p>
                </article>
              ))}
            </div>

            {/* Documento relacionado */}
            <a
              href={related.href}
              className={cn(
                "mt-10 flex items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-6 py-5",
                "text-sm font-body text-[var(--text-secondary)] hover:text-[var(--green)] hover:border-[var(--green)]/40",
                "transition-colors duration-150"
              )}
            >
              <span>
                Consulta también:{" "}
                <span className="font-semibold text-[var(--text-primary)]">{related.label}</span>
              </span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
