import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import { posts } from '@/data/blog';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isFr = locale === 'fr';

  const title = isFr
    ? 'Blog Coworking Essaouira | Rimal Network'
    : 'Coworking Essaouira Blog | Rimal Network';
  const description = isFr
    ? 'Articles sur le coworking, le surf, la vie de digital nomad et l\'histoire d\'Essaouira Mogador. Inspirez-vous et planifiez votre séjour.'
    : 'Articles on coworking, surfing, digital nomad life and the history of Essaouira Mogador. Get inspired and plan your stay.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isFr ? 'fr_FR' : 'en_US',
    },
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        fr: '/fr/blog',
        en: '/en/blog',
      },
    },
  };
}

function formatDate(dateStr: string, locale: string): string {
  return new Date(dateStr).toLocaleDateString(
    locale === 'fr' ? 'fr-FR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );
}

export default async function BlogListPage() {
  const locale = await getLocale();
  const isFr = locale === 'fr';

  const heading = isFr
    ? 'Coworking, surf & vie nomade à Essaouira'
    : 'Coworking, surf & nomad life in Essaouira';
  const subtitle = isFr
    ? 'Guides pratiques, récits inspirants et conseils d\'experts pour vivre et travailler au mieux depuis la cité bleue de l\'Atlantique.'
    : 'Practical guides, inspiring stories and expert tips for living and working at your best from the blue city of the Atlantic.';
  const badgeLabel = 'Blog';
  const readLabel = isFr ? 'Lire l\'article' : 'Read article';
  const minuteLabel = isFr ? 'min de lecture' : 'min read';

  return (
    <main className="overflow-x-hidden">
      {/* Page Header */}
      <section className="section-padding bg-cream-dark pt-32">
        <div className="container-max text-center">
          <span className="section-badge">{badgeLabel}</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-espresso mt-4 mb-5 leading-tight">
            {heading}
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section-padding bg-cream">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const content = isFr ? post.fr : post.en;
              const category = isFr ? post.category.fr : post.category.en;
              const alt = isFr ? post.imageAlt.fr : post.imageAlt.en;

              return (
                <article
                  key={post.slug}
                  className="group bg-white rounded-2xl overflow-hidden border border-cream-border shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  {/* Card image */}
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="block overflow-hidden aspect-video relative"
                    aria-label={content.title}
                  >
                    <Image
                      src={post.image}
                      alt={alt}
                      width={600}
                      height={315}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Category badge overlay */}
                    <span className="absolute top-3 left-3 bg-espresso/90 text-cream text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {category}
                    </span>
                  </Link>

                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-stone mb-3">
                      <time dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt, locale)}
                      </time>
                      <span className="w-1 h-1 rounded-full bg-stone inline-block" />
                      <span>{post.readTime} {minuteLabel}</span>
                    </div>

                    {/* Title */}
                    <h2 className="font-serif text-xl font-bold text-espresso mb-3 leading-snug group-hover:text-coffee transition-colors">
                      <Link href={`/${locale}/blog/${post.slug}`}>
                        {content.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-muted text-sm leading-relaxed flex-1 mb-5">
                      {content.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-coffee bg-coffee-mist px-2.5 py-1 rounded-full font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-espresso hover:text-coffee transition-colors group/link"
                    >
                      {readLabel}
                      <svg
                        className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
