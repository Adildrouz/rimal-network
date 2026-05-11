'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Wifi } from 'lucide-react';

function LogoMark() {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-espresso">
        <Wifi className="w-4 h-4 text-cream" />
      </div>
    );
  }
  return (
    <Image
      src="/images/logo.png"
      alt="Rimal Network logo"
      width={32}
      height={32}
      className="object-contain rounded-lg flex-shrink-0"
      onError={() => setErr(true)}
      priority
    />
  );
}

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const other = locale === 'fr' ? 'en' : 'fr';

  const links = [
    { href: '#about',              label: t('home') },
    { href: '#services',           label: t('services') },
    { href: '#menu',               label: t('menu') },
    { href: '#reviews',            label: t('reviews') },
    { href: `/${locale}/blog`,     label: locale === 'fr' ? 'Blog' : 'Blog' },
    { href: '#contact',            label: t('contact') },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-cream-border py-3'
          : 'bg-cream/80 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <LogoMark />
          <span className="font-serif font-bold text-base tracking-tight text-espresso transition-colors">
            Rimal Network
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted hover:text-espresso transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Right controls */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href={`/${other}`}
            className="text-xs font-bold uppercase tracking-widest text-muted hover:text-espresso transition-colors px-2 py-1 rounded"
          >
            {other}
          </Link>
          <a href="#contact" className="text-sm font-medium px-5 py-2 rounded-full bg-espresso text-cream hover:bg-espresso-light transition-all">
            {t('reserve')}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-espresso transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-cream border-t border-cream-border px-5 py-5 space-y-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 text-muted hover:text-espresso text-sm transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-4 flex items-center gap-3">
            <Link href={`/${other}`} className="text-xs font-bold uppercase tracking-widest text-muted hover:text-espresso">
              {other}
            </Link>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center bg-espresso text-cream text-sm font-medium py-2.5 rounded-full"
            >
              {t('reserve')}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
