import type { MetadataRoute } from 'next'
import { posts } from '@/data/blog'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://rimalnetwork.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const homepageEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/fr`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages: { fr: `${BASE}/fr`, en: `${BASE}/en` } },
    },
    {
      url: `${BASE}/en`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: { fr: `${BASE}/fr`, en: `${BASE}/en` } },
    },
  ]

  const blogIndexEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/fr/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: { fr: `${BASE}/fr/blog`, en: `${BASE}/en/blog` } },
    },
    {
      url: `${BASE}/en/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: { fr: `${BASE}/fr/blog`, en: `${BASE}/en/blog` } },
    },
  ]

  const blogPostEntries: MetadataRoute.Sitemap = posts.flatMap((post) => [
    {
      url: `${BASE}/fr/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          fr: `${BASE}/fr/blog/${post.slug}`,
          en: `${BASE}/en/blog/${post.slug}`,
        },
      },
    },
    {
      url: `${BASE}/en/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          fr: `${BASE}/fr/blog/${post.slug}`,
          en: `${BASE}/en/blog/${post.slug}`,
        },
      },
    },
  ])

  return [...homepageEntries, ...blogIndexEntries, ...blogPostEntries]
}
