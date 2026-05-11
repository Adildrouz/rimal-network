import { useTranslations, useLocale } from 'next-intl';
import { ArrowDown, MapPin, Clock, Wifi, MessageCircle } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="relative min-h-screen bg-cream overflow-hidden flex flex-col">
      {/* Subtle warm texture */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
      }} />

      {/* Subtle radial glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-coffee-mist/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-sage-mist/40 blur-3xl pointer-events-none" />

      {/* Main content */}
      <div className="relative flex-1 flex flex-col justify-center pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">

            {/* Left: Editorial text (3/5) */}
            <div className="lg:col-span-3">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 border border-cream-border text-muted text-xs font-medium px-4 py-1.5 rounded-full mb-10 tracking-widest uppercase bg-cream-dark">
                <MapPin className="w-3 h-3 text-coffee" />
                {t('badge')}
              </div>

              {/* Large title */}
              <h1 className="font-serif font-bold text-espresso leading-[1.05] mb-6" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
                {locale === 'fr' ? (
                  <>
                    Travaillez<br />
                    au rythme<br />
                    de{' '}
                    <span className="text-coffee">l&rsquo;Atlantique.</span>
                  </>
                ) : (
                  <>
                    Work to<br />
                    the rhythm<br />
                    of{' '}
                    <span className="text-coffee">the Atlantic.</span>
                  </>
                )}
              </h1>

              {/* Thin divider */}
              <div className="w-16 h-px bg-coffee/40 mb-6" />

              <p className="text-muted text-lg leading-relaxed max-w-md mb-10">
                {t('subtitle')}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <a href="#contact" className="btn-coffee">
                  {t('cta_reserve')}
                </a>
                <a href="#about" className="inline-flex items-center gap-2 border border-cream-border text-espresso/70 hover:text-espresso hover:border-espresso/30 bg-cream-dark px-7 py-3.5 rounded-full text-sm font-medium transition-all">
                  {t('cta_discover')}
                </a>
              </div>
            </div>

            {/* Right: Info card (2/5) */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-cream-border rounded-3xl p-7 space-y-5 shadow-sm">
                {/* Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-coffee-mist rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-coffee" />
                  </div>
                  <div>
                    <div className="text-stone text-xs uppercase tracking-widest mb-1">
                      {locale === 'fr' ? 'Horaires' : 'Hours'}
                    </div>
                    <div className="text-espresso text-sm font-medium">
                      {locale === 'fr' ? 'Lun – Sam : 9h30 – 21h00' : 'Mon – Sat: 9:30 – 21:00'}
                    </div>
                    <div className="text-stone text-xs mt-0.5">
                      {locale === 'fr' ? 'Dimanche fermé' : 'Sunday closed'}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-cream-border" />

                {/* WiFi */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-sage-mist rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Wifi className="w-4 h-4 text-sage" />
                  </div>
                  <div>
                    <div className="text-stone text-xs uppercase tracking-widest mb-1">WiFi</div>
                    <div className="text-espresso text-sm font-medium">Fibre Optique 200 Mbps</div>
                    <div className="text-stone text-xs mt-0.5">
                      {locale === 'fr' ? 'Connexion stable & rapide' : 'Stable & fast connection'}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-cream-border" />

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-cream-dark rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-muted" />
                  </div>
                  <div>
                    <div className="text-stone text-xs uppercase tracking-widest mb-1">
                      {locale === 'fr' ? 'Adresse' : 'Address'}
                    </div>
                    <div className="text-espresso text-sm font-medium">El Raounak, 355</div>
                    <div className="text-stone text-xs mt-0.5">Essaouira 44000</div>
                  </div>
                </div>

                <div className="h-px bg-cream-border" />

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/212639508372"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold py-3.5 rounded-2xl transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  {locale === 'fr' ? 'Réserver sur WhatsApp' : 'Book on WhatsApp'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom stats bar */}
      <div className="relative border-t border-cream-border bg-cream-dark/50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 flex flex-wrap justify-between items-center gap-4">
          {[
            { v: '200 Mbps', l: locale === 'fr' ? 'Fibre Optique' : 'Fiber Optic' },
            { v: '100+', l: locale === 'fr' ? 'Membres' : 'Members' },
            { v: '4.9 ★', l: 'Google Maps' },
            { v: '250 DH', l: locale === 'fr' ? 'Students Membership' : 'Students Plan' },
          ].map((s) => (
            <div key={s.v} className="flex items-center gap-3">
              <span className="text-espresso font-serif font-bold text-xl">{s.v}</span>
              <span className="text-stone text-xs uppercase tracking-wider">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#gallery"
        className="absolute bottom-24 left-1/2 lg:left-auto lg:right-8 -translate-x-1/2 lg:translate-x-0 flex flex-col items-center gap-1.5 text-espresso/25 hover:text-espresso/50 transition-colors"
      >
        <span className="text-[10px] uppercase tracking-widest rotate-0">scroll</span>
        <ArrowDown className="w-3 h-3 animate-bounce" />
      </a>
    </section>
  );
}
