import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Wifi, MapPin, Clock, Phone, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const locale = useLocale();
  const year = new Date().getFullYear();

  const links = [
    { href: '#about',    label: nav('home') },
    { href: '#services', label: nav('services') },
    { href: '#menu',     label: nav('menu') },
    { href: '#reviews',  label: nav('reviews') },
    { href: '#contact',  label: nav('contact') },
  ];

  return (
    <footer className="bg-espresso text-cream/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-coffee rounded-lg flex items-center justify-center flex-shrink-0">
                <Wifi className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif font-bold text-cream text-base">Rimal Network</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">{t('tagline')}</p>
            <div className="flex gap-2.5">
              <a
                href="https://www.instagram.com/rimal_network/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 bg-white/8 hover:bg-coffee rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-cream" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 bg-white/8 hover:bg-coffee rounded-lg flex items-center justify-center transition-colors"
              >
                <Facebook className="w-3.5 h-3.5 text-cream" />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4">{t('nav_title')}</h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm hover:text-cream transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4">{t('contact_title')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-3.5 h-3.5 text-coffee flex-shrink-0 mt-0.5" />
                {t('address')}
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Clock className="w-3.5 h-3.5 text-coffee flex-shrink-0 mt-0.5" />
                {t('hours_value')}
              </li>
              <li>
                <a href="https://wa.me/212639508372" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-cream transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#25D366] flex-shrink-0" />
                  06 39 50 83 72
                </a>
              </li>
            </ul>
          </div>

          {/* Language */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4">Langue</h4>
            <div className="flex gap-2">
              {(['fr', 'en'] as const).map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors uppercase tracking-wider ${
                    locale === loc ? 'bg-coffee text-white' : 'bg-white/8 text-cream/60 hover:bg-white/15'
                  }`}
                >
                  {loc}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            © {year} Rimal Network. {t('rights')}
          </p>
          <p className="text-white/20 text-xs">Essaouira, Maroc 🇲🇦</p>
        </div>
      </div>
    </footer>
  );
}
