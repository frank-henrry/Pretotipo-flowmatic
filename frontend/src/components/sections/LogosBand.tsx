// src/components/sections/LogosBand.tsx
import { cn } from "@/lib/utils";

// Nombres de restaurantes ficticios (placeholder realista)
const restaurants = [
  "La Leña Parrilla",
  "Cevichería Don Marcos",
  "Bistró Sofía",
  "Burger Lab",
  "El Fogón Criollo",
  "Sushi & Roll",
  "Casa Andina Food",
  "Verde & Fresco",
  "Pollos Dorados",
  "La Mar de Sabores",
];

// Duplicamos para el loop infinito
const doubled = [...restaurants, ...restaurants];

export function LogosBand() {
  return (
    <section className="py-12 border-y border-[var(--border)] overflow-hidden relative">
      {/* Fades en los costados */}
      <div
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, var(--background), transparent)",
        }}
      />
      <div
        aria-hidden
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, var(--background), transparent)",
        }}
      />

      {/* Label */}
      <p className="text-center text-xs font-body text-[var(--text-muted)] uppercase tracking-widest mb-6">
        Restaurantes que ya automatizaron sus pedidos
      </p>

      {/* Scroll track */}
      <div className="flex gap-8 animate-scroll-x" style={{ width: "max-content" }}>
        {doubled.map((name, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap",
              "border border-[var(--border)] bg-[var(--surface)]",
              "text-sm font-body text-[var(--text-secondary)]"
            )}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: i % 3 === 0 ? "var(--green)" : i % 3 === 1 ? "var(--cyan)" : "var(--text-muted)",
              }}
            />
            {name}
          </div>
        ))}
      </div>
    </section>
  );
}
