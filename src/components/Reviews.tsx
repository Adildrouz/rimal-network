import { useTranslations } from 'next-intl';
import { Star, ExternalLink, Quote } from 'lucide-react';

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-coffee text-coffee" />
      ))}
    </div>
  );
}

const reviewers = [
  { key: 'r1', initials: 'SB', hue: '#C4955A' },
  { key: 'r2', initials: 'YA', hue: '#6B9A70' },
  { key: 'r3', initials: 'MD', hue: '#78716C' },
  { key: 'r4', initials: 'KM', hue: '#C4955A' },
];

export default function Reviews() {
  const t = useTranslations('reviews');

  return (
    <section id="reviews" className="section-padding bg-espresso">
      <div className="container-max">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-coffee bg-coffee/10 px-4 py-1.5 rounded-full mb-5">
              <Star className="w-3 h-3 fill-coffee" />
              {t('badge')}
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-cream leading-tight max-w-sm">
              {t('title')}
            </h2>
          </div>
          <p className="text-white/40 text-sm max-w-xs leading-relaxed">{t('subtitle')}</p>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {reviewers.map(({ key, initials, hue }) => (
            <div key={key} className="bg-espresso-light rounded-2xl p-6 border border-white/8 flex flex-col gap-5">
              <div className="flex items-start justify-between">
                <Stars />
                <Quote className="w-4 h-4 text-white/10" />
              </div>

              <p className="text-white/65 text-sm leading-relaxed flex-1">
                &ldquo;{t(`${key}_text` as Parameters<typeof t>[0])}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-white/8">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: hue + '40', color: hue }}
                >
                  {initials}
                </div>
                <div>
                  <div className="text-cream text-sm font-semibold">{t(`${key}_name` as Parameters<typeof t>[0])}</div>
                  <div className="text-white/35 text-xs">{t(`${key}_role` as Parameters<typeof t>[0])}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google CTA */}
        <div className="flex justify-center">
          <a
            href="https://share.google/eTopI3ogqbACkX4id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/15 text-white/60 hover:text-cream hover:border-white/30 px-6 py-3 rounded-full text-sm transition-all"
          >
            {t('google_cta')}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
