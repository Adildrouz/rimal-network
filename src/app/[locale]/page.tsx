import dynamic from 'next/dynamic';
import { getLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PhotoGallery from '@/components/PhotoGallery';
import About from '@/components/About';
import Services from '@/components/Services';
import Amenities from '@/components/Amenities';
import Footer from '@/components/Footer';
import BlogSection from '@/components/BlogSection';

// Split below-fold interactive components into separate JS chunks
const CafeMenu = dynamic(() => import('@/components/CafeMenu'), {
  ssr: false,
  loading: () => <div className="section-padding bg-cream" aria-hidden="true" />,
});
const InstagramSection = dynamic(() => import('@/components/InstagramSection'), {
  ssr: false,
  loading: () => <div className="section-padding bg-cream-dark" aria-hidden="true" />,
});
const Reviews = dynamic(() => import('@/components/Reviews'), {
  ssr: false,
  loading: () => <div className="section-padding bg-espresso" aria-hidden="true" />,
});
const ReservationSection = dynamic(() => import('@/components/ReservationSection'), {
  ssr: false,
  loading: () => <div className="section-padding bg-cream" aria-hidden="true" />,
});

export default async function HomePage() {
  const locale = await getLocale();
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <PhotoGallery />
      <About />
      <Services locale={locale} />
      <CafeMenu />
      <Amenities />
      <InstagramSection />
      <Reviews />
      <ReservationSection />
      <BlogSection locale={locale} />
      <Footer />
    </main>
  );
}
