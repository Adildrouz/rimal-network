import type { MetadataRoute } from 'next'
import { posts } from '@/data/blog'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://rimalnetwork.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const homeEntries: MetadataRoute.Sitemap = [
    { url: `${BASE}/fr`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/en`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
  ]

  const blogIndexEntries: MetadataRoute.Sitemap = [
    { url: `${BASE}/fr/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/en/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ]

  const blogPostEntries: MetadataRoute.Sitemap = posts.flatMap((post) => [
    {
      url: `${BASE}/fr/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE}/en/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ])

  return [...homeEntries, ...blogIndexEntries, ...blogPostEntries]
}
