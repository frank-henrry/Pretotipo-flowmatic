import { MetadataRoute } from 'next'

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://genviaya.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1, // Prioridad máxima para la landing page
    },
    {
      url: 'https://genviaya.com/privacidad/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://genviaya.com/terminos/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://genviaya.com/eliminacion-datos/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    // Si agregas más páginas en el futuro (ej. /blog o /precios), se agregan aquí.
  ]
}
