import Image from 'next/image';
import Link from 'next/link';
import { posts } from '@/data/blog';

interface BlogSectionProps {
  locale: string;
}

function formatDate(dateStr: string, locale: string): string {
  return new Date(dateStr).toLocaleDateString(
    locale === 'fr' ? 'fr-FR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );
}

export default function BlogSection({ locale }: BlogSectionProps) {
  const isFr = locale === 'fr';
  const featured = posts.slice(0, 3);

  const badgeLabel = 'Blog';
  const heading = isFr
    ? 'Inspirations & guides pour nomades'
    : 'Inspiration & guides for nomads';
  const subtitle = isFr
    ? 'Conseils, récits et guides pratiques pour vivre et travailler depuis Essaouira.'
    : 'Tips, stories and practical guides for living and working from Essaouira.';
  const viewAllLabel = isFr ? 'Voir tous les articles' : 'View all articles';
  const readLabel = isFr ? 'Lire l\'article' : 'Read article';
  const minuteLabel = isFr ? 'min de lecture' : 'min read';

  return (
    <section className="section-padding bg-cream" id="blog" aria-labelledby="blog-section-heading">
      <div className="container-max">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="section-badge">{badgeLabel}</span>
            <h2
              id="blog-section-heading"
              className="font-serif text-3xl sm:text-4xl font-bold text-espresso mt-3 leading-tight"
            >
              {heading}
            </h2>
            <p className="text-muted mt-3 max-w-lg leading-relaxed">
              {subtitle}
            </p>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-espresso hover:text-coffee transition-colors flex-shrink-0"
          >
            {viewAllLabel}
            <svg
              className="w-4 h-4"
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

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((post) => {
            const content = isFr ? post.fr : post.en;
            const category = isFr ? post.category.fr : post.category.en;
            const imgAlt = isFr ? post.imageAlt.fr : post.imageAlt.en;

            return (
              <article
                key={post.slug}
                className="group bg-white rounded-2xl overflow-hidden border border-cream-border shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="block overflow-hidden aspect-video relative"
                  aria-label={content.title}
                >
                  <Image
                    src={post.image}
                    alt={imgAlt}
                    width={600}
                    height={315}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category badge */}
                  <span className="absolute top-3 left-3 bg-espresso/90 text-cream text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {category}
                  </span>
                </Link>

                {/* Body */}
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
                  <h3 className="font-serif text-lg font-bold text-espresso mb-3 leading-snug group-hover:text-coffee transition-colors">
                    <Link href={`/${locale}/blog/${post.slug}`}>
                      {content.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted text-sm leading-relaxed flex-1 mb-5">
                    {content.excerpt}
                  </p>

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
  );
}
