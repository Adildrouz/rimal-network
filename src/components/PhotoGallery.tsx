'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';

const photos = [
  { src: '/images/gallery/photo1.jpg', alt: 'Rimal Network — Décor marocain authentique' },
  { src: '/images/gallery/photo2.jpg', alt: 'Rimal Network — Café latte & ambiance lecture' },
  { src: '/images/gallery/photo3.jpg', alt: 'Rimal Network — Espace de travail' },
  { src: '/images/gallery/photo4.jpg', alt: 'Rimal Network — Coworking vue sur la rue' },
  { src: '/images/gallery/photo5.jpg', alt: 'Rimal Network — Iced latte & cookie maison' },
];

function SlideImage({ src, alt, active, priority }: { src: string; alt: string; active: boolean; priority?: boolean }) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ${active ? 'opacity-100' : 'opacity-0'}`}
    >
      {errored ? (
        <div className="w-full h-full bg-gradient-to-br from-espresso via-espresso-light to-espresso-subtle flex flex-col items-center justify-center gap-3">
          <ImageOff className="w-10 h-10 text-white/30" />
          <p className="text-white/40 text-sm text-center px-4">
            <code className="text-white/60 text-xs">{src}</code>
          </p>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          sizes="100vw"
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}

export default function PhotoGallery() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (transitioning) return;
      setTransitioning(true);
      setTimeout(() => {
        setCurrent((index + photos.length) % photos.length);
        setTransitioning(false);
      }, 200);
    },
    [transitioning]
  );

  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), 4500);
    return () => clearInterval(timer);
  }, [current, goTo]);

  return (
    <section
      id="gallery"
      className="relative w-full overflow-hidden bg-espresso"
      style={{ height: '70vh', minHeight: '400px', maxHeight: '700px' }}
    >
      {photos.map((photo, i) => (
        <SlideImage key={photo.src} src={photo.src} alt={photo.alt} active={i === current} priority={i === 0} />
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

      {/* Arrows */}
      <button
        onClick={() => goTo(current - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10"
        aria-label="Photo précédente"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => goTo(current + 1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10"
        aria-label="Photo suivante"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Photo ${i + 1}`}
            className={`rounded-full transition-all ${
              i === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm text-white/80 text-xs px-3 py-1 rounded-full z-10">
        {current + 1} / {photos.length}
      </div>
    </section>
  );
}
