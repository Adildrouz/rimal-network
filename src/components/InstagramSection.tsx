'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { Instagram } from 'lucide-react';

const POSTS = [
  'https://www.instagram.com/p/DUvTZTCCGRm/',
  'https://www.instagram.com/p/DWl0NH2CO8Y/',
];

export default function InstagramSection() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  }, []);

  return (
    <section className="section-padding bg-cream-dark">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge bg-[#E1306C]/10 text-[#E1306C] mb-4">
            <Instagram className="w-3.5 h-3.5" />
            Instagram
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
            Suivez notre actualité
          </h2>
          <a
            href="https://www.instagram.com/rimal_network/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#E1306C] font-medium hover:underline"
          >
            <Instagram className="w-4 h-4" />
            @rimal_network
          </a>
        </div>

        {/* Embeds grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
          {POSTS.map((url) => (
            <div key={url} className="w-full max-w-[540px]">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{
                  background: '#FFF',
                  border: '0',
                  borderRadius: '12px',
                  boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
                  margin: '0',
                  maxWidth: '540px',
                  minWidth: '326px',
                  padding: '0',
                  width: '100%',
                }}
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center py-16 text-[#E1306C] gap-2"
                >
                  <Instagram className="w-8 h-8" />
                  <span className="font-medium">Voir sur Instagram</span>
                </a>
              </blockquote>
            </div>
          ))}
        </div>

        <Script
          src="https://www.instagram.com/embed.js"
          strategy="lazyOnload"
          onLoad={() => {
            if ((window as any).instgrm) {
              (window as any).instgrm.Embeds.process();
            }
          }}
        />
      </div>
    </section>
  );
}
