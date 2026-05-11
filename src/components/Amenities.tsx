import { useTranslations } from 'next-intl';
import { Wifi, Coffee, Printer, Users, Lock, Thermometer, Plug, Globe, Armchair, Sun } from 'lucide-react';

const items = [
  { key: 'wifi',      Icon: Wifi },
  { key: 'coffee',    Icon: Coffee },
  { key: 'printer',   Icon: Printer },
  { key: 'meeting',   Icon: Users },
  { key: 'locker',    Icon: Lock },
  { key: 'aircon',    Icon: Thermometer },
  { key: 'outlet',    Icon: Plug },
  { key: 'community', Icon: Globe },
  { key: 'ergonomic', Icon: Armchair },
  { key: 'natural',   Icon: Sun },
];

export default function Amenities() {
  const t = useTranslations('amenities');

  return (
    <section id="amenities" className="section-padding bg-cream-dark">
      <div className="container-max">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="section-badge mb-5 block w-fit">{t('badge')}</span>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-espresso leading-tight">
              {t('title')}
            </h2>
          </div>
          <p className="text-muted text-sm max-w-xs leading-relaxed">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {items.map(({ key, Icon }) => (
            <div
              key={key}
              className="group bg-cream rounded-2xl p-5 border border-cream-border hover:border-coffee/30 hover:bg-coffee-mist transition-all text-center"
            >
              <div className="w-10 h-10 bg-cream-dark group-hover:bg-coffee/10 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
                <Icon className="w-5 h-5 text-muted group-hover:text-coffee transition-colors" />
              </div>
              <span className="text-xs font-medium text-muted group-hover:text-espresso transition-colors leading-snug">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(t as any)(key)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
