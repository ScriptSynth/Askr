import { MetadataRoute } from 'next'
import { getAllPseoPages } from '@/lib/pseo-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://askr.io'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/auth`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // pSEO pages
  const pseoPages = getAllPseoPages()
  const dynamicPages: MetadataRoute.Sitemap = pseoPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...dynamicPages]
}
