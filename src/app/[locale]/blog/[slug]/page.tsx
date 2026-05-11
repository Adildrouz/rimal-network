import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { posts } from '@/data/blog';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://rimalnetwork.ma';
const LOCALES = ['fr', 'en'];

/* ─── Static params ─────────────────────────────────────────────────────── */
export async function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug }))
  );
}

/* ─── Metadata ───────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return {};

  const isFr = params.locale === 'fr';
  const content = isFr ? post.fr : post.en;
  const canonicalUrl = `${BASE}/${params.locale}/blog/${params.slug}`;

  return {
    title: `${content.title} | Rimal Network`,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      type: 'article',
      publishedTime: post.publishedAt,
      locale: isFr ? 'fr_FR' : 'en_US',
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: isFr ? post.imageAlt.fr : post.imageAlt.en,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
      images: [post.image],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: `${BASE}/fr/blog/${params.slug}`,
        en: `${BASE}/en/blog/${params.slug}`,
      },
    },
  };
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function formatDate(dateStr: string, locale: string): string {
  return new Date(dateStr).toLocaleDateString(
    locale === 'fr' ? 'fr-FR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function ArticlePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const isFr = params.locale === 'fr';
  const content = isFr ? post.fr : post.en;
  const category = isFr ? post.category.fr : post.category.en;
  const alt = isFr ? post.imageAlt.fr : post.imageAlt.en;
  const locale = params.locale;

  /* Related posts: same category, excluding current */
  const related = posts
    .filter(
      (p) =>
        p.slug !== post.slug &&
        (p.category.fr === post.category.fr ||
          p.category.en === post.category.en)
    )
    .slice(0, 2);

  /* Fallback if no same-category posts */
  const relatedPosts =
    related.length >= 2
      ? related
      : posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const backLabel = isFr ? '← Retour au blog' : '← Back to blog';
  const minuteLabel = isFr ? 'min de lecture' : 'min read';
  const relatedLabel = isFr ? 'Articles similaires' : 'Related articles';
  const readLabel = isFr ? 'Lire l\'article' : 'Read article';
  const ctaTitle = isFr
    ? 'Venez travailler chez Rimal Network'
    : 'Come work at Rimal Network';
  const ctaBody = isFr
    ? 'Espace de coworking & café à Essaouira — fibre 200 Mbps, bureaux ergonomiques, ambiance chaleureuse à deux pas de la médina UNESCO et de l\'Atlantique.'
    : 'Coworking space & café in Essaouira — 200 Mbps fibre, ergonomic desks, warm atmosphere steps from the UNESCO medina and the Atlantic.';
  const whatsappLabel = isFr ? 'Nous contacter sur WhatsApp' : 'Contact us on WhatsApp';
  const contactLabel = isFr ? 'En savoir plus' : 'Learn more';

  /* Article JSON-LD */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: content.title,
    description: content.description,
    image: post.image,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Rimal Network',
      url: BASE,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rimal Network',
      url: BASE,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE}/${locale}/blog/${post.slug}`,
    },
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="overflow-x-hidden bg-cream">
        {/* Hero image */}
        <div className="w-full aspect-video max-h-[520px] overflow-hidden relative">
          <Image
            src={post.image}
            alt={alt}
            width={1200}
            height={630}
            priority
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
        </div>

        {/* Article container */}
        <div className="container-max px-5 sm:px-8 lg:px-12 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center text-sm text-muted hover:text-espresso transition-colors mb-8 font-medium"
            >
              {backLabel}
            </Link>

            {/* Article header */}
            <header className="mb-10">
              <span className="section-badge mb-4 inline-block">{category}</span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso leading-tight mb-6">
                {content.title}
              </h1>
              {/* Meta bar */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-stone pb-8 border-b border-cream-border">
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt, locale)}
                </time>
                <span className="w-1 h-1 rounded-full bg-stone inline-block" />
                <span>{post.readTime} {minuteLabel}</span>
                <span className="w-1 h-1 rounded-full bg-stone inline-block" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-coffee bg-coffee-mist px-2.5 py-1 rounded-full font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </header>

            {/* Article body */}
            <article className="prose-custom">
              {/* Intro */}
              <p className="text-muted text-lg leading-relaxed mb-10 font-medium">
                {content.intro}
              </p>

              {/* Sections */}
              {content.sections.map((section, i) => (
                <section key={i} className="mb-10">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-espresso mb-4 leading-snug">
                    {section.heading}
                  </h2>
                  <p className="text-muted leading-relaxed text-base sm:text-lg">
                    {section.body}
                  </p>
                </section>
              ))}

              {/* Conclusion */}
              <div className="border-l-4 border-coffee pl-6 mb-12">
                <p className="text-muted leading-relaxed text-base sm:text-lg italic">
                  {content.conclusion}
                </p>
              </div>
            </article>

            {/* CTA Box */}
            <div className="bg-espresso rounded-2xl p-8 sm:p-10 mb-16 text-center">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream mb-4">
                {ctaTitle}
              </h3>
              <p className="text-cream/80 leading-relaxed mb-8 max-w-lg mx-auto">
                {ctaBody}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://wa.me/212XXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-sage text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  {whatsappLabel}
                </a>
                <Link
                  href={`/${locale}/#contact`}
                  className="inline-flex items-center gap-2 border border-cream text-cream font-semibold px-6 py-3 rounded-full hover:bg-cream hover:text-espresso transition-all"
                >
                  {contactLabel}
                </Link>
              </div>
            </div>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <section>
                <h2 className="font-serif text-2xl font-bold text-espresso mb-8">
                  {relatedLabel}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedPosts.map((related) => {
                    const rc = isFr ? related.fr : related.en;
                    const rCat = isFr ? related.category.fr : related.category.en;
                    const rAlt = isFr ? related.imageAlt.fr : related.imageAlt.en;
                    return (
                      <article
                        key={related.slug}
                        className="group bg-white rounded-2xl overflow-hidden border border-cream-border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                      >
                        <Link
                          href={`/${locale}/blog/${related.slug}`}
                          className="block overflow-hidden aspect-video relative"
                          aria-label={rc.title}
                        >
                          <Image
                            src={related.image}
                            alt={rAlt}
                            width={600}
                            height={315}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-3 left-3 bg-espresso/90 text-cream text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                            {rCat}
                          </span>
                        </Link>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center gap-2 text-xs text-stone mb-2">
                            <time dateTime={related.publishedAt}>
                              {formatDate(related.publishedAt, locale)}
                            </time>
                            <span className="w-1 h-1 rounded-full bg-stone inline-block" />
                            <span>{related.readTime} {minuteLabel}</span>
                          </div>
                          <h3 className="font-serif text-base font-bold text-espresso mb-3 leading-snug group-hover:text-coffee transition-colors flex-1">
                            <Link href={`/${locale}/blog/${related.slug}`}>
                              {rc.title}
                            </Link>
                          </h3>
                          <Link
                            href={`/${locale}/blog/${related.slug}`}
                            className="inline-flex items-center gap-1 text-sm font-semibold text-espresso hover:text-coffee transition-colors"
                          >
                            {readLabel}
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
                      </article>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
