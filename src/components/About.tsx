'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Heart, Wifi, Users, Coffee } from 'lucide-react';

function AboutImage() {
  const [err, setErr] = useState(false);
  return (
    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-cream-dark border border-cream-border flex items-center justify-center">
      {err ? (
        <div className="flex flex-col items-center justify-center gap-3 text-center p-8 w-full h-full">
          <Coffee className="w-12 h-12 text-cream-border" />
          <p className="text-stone text-xs">Ajoutez<br /><code>/public/images/about.jpg</code></p>
        </div>
      ) : (
        <Image
          src="/images/about.jpg"
          alt="Rimal Network — espace de coworking café à Essaouira"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          onError={() => setErr(true)}
        />
      )}
    </div>
  );
}

export default function About() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <section id="about" className="section-padding bg-cream">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: image placeholder */}
          <div className="relative order-2 lg:order-1">
            <AboutImage />

            {/* Floating quote card */}
            <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-espresso text-cream rounded-2xl p-5 max-w-[220px] shadow-2xl">
              <Heart className="w-4 h-4 text-coffee mb-2" />
              <p className="text-sm leading-snug font-serif italic">
                &ldquo;{locale === 'fr'
                  ? 'Votre environnement peut tout changer.'
                  : 'Your environment can change everything.'}&rdquo;
              </p>
            </div>

            {/* Decorative dot */}
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-coffee-mist -z-10" />
          </div>

          {/* Right: text */}
          <div className="order-1 lg:order-2">
            <span className="section-badge mb-6 block w-fit">{t('badge')}</span>

            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-espresso leading-tight mb-6">
              {t('title')}
            </h2>

            <p className="text-muted leading-relaxed text-base mb-4">{t('description')}</p>
            <p className="text-muted leading-relaxed text-base mb-10">{t('description2')}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-cream-border">
              {[
                { Icon: Users, v: t('stat1_value'), l: t('stat1_label') },
                { Icon: Wifi,  v: t('stat2_value'), l: t('stat2_label') },
                { Icon: Coffee, v: t('stat3_value'), l: t('stat3_label') },
              ].map(({ Icon, v, l }) => (
                <div key={l} className="text-center">
                  <Icon className="w-4 h-4 text-coffee mx-auto mb-2" />
                  <div className="font-serif font-bold text-xl text-espresso">{v}</div>
                  <div className="text-muted text-xs mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
