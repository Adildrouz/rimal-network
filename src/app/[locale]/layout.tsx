import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://rimalnetwork.com';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta' });
  const canonical = `${BASE}/${params.locale}`;
  const ogImage = `${BASE}/images/gallery/photo1.jpg`;

  return {
    metadataBase: new URL(BASE),
    title: {
      default: t('title'),
      template: `%s | Rimal Network`,
    },
    description: t('description'),
    keywords: [
      'café coworking Essaouira',
      'coworking Essaouira',
      'espace de travail Essaouira',
      'coworking space Essaouira Morocco',
      'digital nomad Essaouira',
      'wifi Essaouira',
      'télétravail Essaouira',
      'Rimal Network',
      'café travail Essaouira',
      'coworking Maroc',
      'espace coworking Essaouira Maroc',
      'coworking cafe Essaouira',
    ],
    authors: [{ name: 'Rimal Network' }],
    creator: 'Rimal Network',
    publisher: 'Rimal Network',
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
    },
    alternates: {
      canonical,
      languages: {
        'fr': `${BASE}/fr`,
        'en': `${BASE}/en`,
        'x-default': `${BASE}/fr`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: canonical,
      siteName: 'Rimal Network',
      locale: params.locale === 'fr' ? 'fr_MA' : 'en_US',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 800,
          alt: 'Rimal Network — Café Coworking Essaouira',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [ogImage],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function buildJsonLd(locale: string) {
  const isFr = locale !== 'en';
  const canonical = `${BASE}/${locale}`;

  const business = {
    '@type': ['LocalBusiness', 'CafeOrCoffeeShop'],
    '@id': `${BASE}/#business`,
    name: 'Rimal Network',
    alternateName: isFr ? 'Café Coworking Essaouira' : 'Coworking Café Essaouira',
    description: isFr
      ? "Café-coworking professionnel à Essaouira, Maroc. WiFi fibre optique 200 Mbps, café d'exception, espaces de travail flexibles — espace ouvert, bureau privé et phone booth. Idéal pour freelances, digital nomads et entrepreneurs."
      : 'Professional café-coworking space in Essaouira, Morocco. 200 Mbps fiber optic WiFi, premium coffee, flexible workspaces — open space, private office and phone booth. Perfect for freelancers, digital nomads and entrepreneurs.',
    url: canonical,
    logo: `${BASE}/images/logo.png`,
    image: [
      `${BASE}/images/gallery/photo1.jpg`,
      `${BASE}/images/gallery/photo2.jpg`,
      `${BASE}/images/gallery/photo3.jpg`,
      `${BASE}/images/gallery/photo4.jpg`,
      `${BASE}/images/gallery/photo5.jpg`,
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'El Raounak, 355',
      addressLocality: 'Essaouira',
      postalCode: '44000',
      addressCountry: 'MA',
      addressRegion: 'Marrakech-Safi',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 31.5085,
      longitude: -9.7595,
    },
    telephone: '+212639508372',
    email: 'rimalnetwork@gmail.com',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:30',
        closes: '21:00',
      },
    ],
    priceRange: '25–1000 MAD',
    currenciesAccepted: 'MAD',
    paymentAccepted: 'Cash',
    servesCuisine: ['Coffee', 'Tea', 'Fresh Juice', 'Brunch'],
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Free WiFi 200 Mbps', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Fiber Optic Internet', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Coworking Space', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Private Office', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Phone Booth', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Filtered Water Included', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Coffee Included', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Ergonomic Seating', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Natural Light', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'USB Outlets', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Lockers', value: true },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1',
    },
    hasMap: 'https://share.google/eTopI3ogqbACkX4id',
    sameAs: [
      'https://www.instagram.com/rimal_network/',
      'https://share.google/eTopI3ogqbACkX4id',
    ],
  };

  const faq = {
    '@type': 'FAQPage',
    '@id': `${canonical}/#faq`,
    mainEntity: isFr
      ? [
          {
            '@type': 'Question',
            name: 'Quel est le prix du coworking à Rimal Network Essaouira ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "L'Espace Ouvert est à 25 DH (2h), 40 DH (mi-journée) ou 70 DH (journée). L'Espace Privé est à 20 DH/h, 60 DH (mi-journée) ou 90 DH/jour. Le Phone Booth est à 35 DH/h. Le pass étudiant est à 250 DH/semaine.",
            },
          },
          {
            '@type': 'Question',
            name: 'Le café est-il inclus avec la location coworking ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Oui, l\'eau filtrée, le café noir ou le thé est inclus avec tout pass horaire ou journalier chez Rimal Network Essaouira.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quels sont les horaires du café coworking Rimal Network ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Rimal Network est ouvert du lundi au samedi de 9h30 à 21h00. Fermé le dimanche.',
            },
          },
          {
            '@type': 'Question',
            name: 'Y a-t-il une bonne connexion WiFi à Rimal Network Essaouira ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Oui, Rimal Network dispose d\'une connexion fibre optique 200 Mbps, stable et rapide, parfaite pour le télétravail, les visioconférences et les digital nomads.',
            },
          },
          {
            '@type': 'Question',
            name: 'Où se trouve Rimal Network à Essaouira ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Rimal Network est situé El Raounak, 355, Essaouira 44000, Maroc. Pour réserver, contactez-nous sur WhatsApp au +212 6 39 50 83 72 ou par email à rimalnetwork@gmail.com.',
            },
          },
          {
            '@type': 'Question',
            name: 'Rimal Network propose-t-il des abonnements coworking ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Oui, Rimal Network propose : un abonnement étudiant à 250 DH/semaine, un pass semaine Co-Workers à 350 DH (8h/jour + boisson quotidienne + 1 repas/semaine), et un abonnement mensuel à 1000 DH avec bureau dédié et casier privatif.',
            },
          },
        ]
      : [
          {
            '@type': 'Question',
            name: 'What are the prices at Rimal Network coworking Essaouira?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Open Space: 25 DH (2h), 40 DH (half day), 70 DH (full day). Private Space: 20 DH/h, 60 DH (half day), 90 DH/day. Phone Booth: 35 DH/h. Student weekly pass: 250 DH/week.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is coffee included with a coworking pass at Rimal Network?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, filtered water, black coffee or tea is included with every hourly or daily pass at Rimal Network Essaouira.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the opening hours of Rimal Network café coworking?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Rimal Network is open Monday to Saturday from 9:30 AM to 9:00 PM. Closed on Sunday.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is there fast WiFi at Rimal Network Essaouira?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, Rimal Network has a 200 Mbps fiber optic connection, stable and fast — ideal for remote work, video calls and digital nomads.',
            },
          },
          {
            '@type': 'Question',
            name: 'Where is Rimal Network located in Essaouira?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Rimal Network is located at El Raounak, 355, Essaouira 44000, Morocco. Book via WhatsApp at +212 6 39 50 83 72 or email rimalnetwork@gmail.com.',
            },
          },
        ],
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${BASE}/#website`,
    url: BASE,
    name: 'Rimal Network',
    description: isFr ? 'Café Coworking à Essaouira, Maroc' : 'Café Coworking in Essaouira, Morocco',
    inLanguage: isFr ? 'fr-MA' : 'en',
    publisher: { '@id': `${BASE}/#business` },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [business, faq, website],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(params.locale as 'fr' | 'en')) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={params.locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(params.locale)) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
