// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Exportar como sitio estático para Nginx
  trailingSlash: true, // Asegura que cada ruta tenga su propio index.html
  images: {
    unoptimized: true, // Requerido para output: export
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
