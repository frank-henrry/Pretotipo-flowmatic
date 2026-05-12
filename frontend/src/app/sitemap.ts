import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://genviaya.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1, // Prioridad máxima para la landing page
    },
    // Si agregas más páginas en el futuro (ej. /blog o /precios), se agregan aquí.
  ]
}
