'use client';

import { Instagram } from 'lucide-react';

const POSTS = [
  {
    url: 'https://www.instagram.com/p/DUvTZTCCGRm/',
    img: 'https://images.unsplash.com/photo-1624802746702-60ca95bdb605?w=540&h=540&fit=crop&auto=format&q=75',
    alt: 'Rimal Network coworking Essaouira',
  },
  {
    url: 'https://www.instagram.com/p/DWl0NH2CO8Y/',
    img: 'https://images.unsplash.com/photo-1565985482571-03a42ea59d80?w=540&h=540&fit=crop&auto=format&q=75',
    alt: 'Bateaux bleus Essaouira — Rimal Network',
  },
];

export default function InstagramSection() {
  return (
    <section className="section-padding bg-cream-dark">
      <div className="container-max">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-[#E1306C]/10 text-[#E1306C] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            <Instagram className="w-3.5 h-3.5" aria-hidden="true" />
            Instagram
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-espresso mb-4">
            Suivez notre actualité
          </h2>
          <a
            href="https://www.instagram.com/rimal_network/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Voir le profil Instagram @rimal_network"
            className="inline-flex items-center gap-2 text-[#E1306C] font-medium hover:underline"
          >
            <Instagram className="w-4 h-4" aria-hidden="true" />
            @rimal_network
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
          {POSTS.map((post) => (
            <a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Voir la publication Instagram : ${post.alt}`}
              className="w-full max-w-[540px] rounded-2xl overflow-hidden border border-cream-border shadow-sm hover:shadow-md transition-shadow block relative aspect-square group"
            >
              <img
                src={post.img}
                alt={post.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/20 transition-colors flex items-center justify-center">
                <Instagram className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
