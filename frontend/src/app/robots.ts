import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'], // Evitamos que Google indexe el panel de control o APIs
    },
    sitemap: 'https://genviaya.com/sitemap.xml',
  }
}
