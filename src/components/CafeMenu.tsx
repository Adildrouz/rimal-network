'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Coffee, Sparkles, Droplets, UtensilsCrossed, Cake, Info } from 'lucide-react';

type Item = { name: string; desc?: string; price: string };

const menuData = {
  fr: {
    drinks: [
      { name: 'Espresso', price: '15' }, { name: 'Americano', price: '15' },
      { name: 'Double Espresso', price: '20' }, { name: 'Nos-Nos', price: '18' },
      { name: 'Cappuccino', price: '18' }, { name: 'Flat White', price: '25' },
      { name: 'Café Latte', price: '25' }, { name: 'Matcha Latte', price: '30' },
      { name: 'Chocolat Chaud', price: '25' }, { name: 'Americano Glacé', price: '30' },
      { name: 'Latte Glacé', price: '30' }, { name: 'Matcha Latte Glacé', price: '35' },
      { name: 'Thé à la Menthe', price: '15' }, { name: 'Eau Pétillante', price: '10' },
      { name: 'Eau Minérale', price: '8' },
    ] as Item[],
    special: [
      { name: 'Latte à l\'Ube', price: '30' },
      { name: 'Spring Iced Latte (Ube + Matcha)', price: '35' },
      { name: 'Décembre (Ube + Café Glacé)', price: '35' },
      { name: 'Matcha à la Fraise Glacé', price: '30' },
      { name: 'Américano Crème Mousseuse', price: '35' },
      { name: 'Latte Glacé Cannelle Vanille', price: '35' },
    ] as Item[],
    juices: [
      { name: 'Orange Pressée', price: '20' }, { name: 'Citron Menthe', price: '20' },
      { name: 'Mangue Douce', price: '30' }, { name: 'Mélange Vert', price: '25' },
      { name: 'Gingembre Carotte Orange', price: '25' },
    ] as Item[],
    food: [
      { name: 'Rimal Brunch', desc: 'Toast avocat, œufs, yaourt, pancakes, jus d\'orange, café', price: '70' },
      { name: 'Bagel au Saumon', price: '55' },
      { name: 'Brioche Façon Pain Perdu', desc: 'Nutella/Pistache, beurre/miel, fruits de saison', price: '45' },
      { name: 'Pancakes', desc: 'Nutella/Pistache, beurre/miel, fruits de saison', price: '45' },
      { name: 'Bol de Yaourt', desc: 'Fruits de saison et granola maison', price: '40' },
      { name: 'Sandwich au Thon Fondant', price: '50' },
      { name: 'Feta Salad', desc: 'Feta, salade, quinoa, betterave', price: '60' },
      { name: 'Sandwich au Poulet Pesto', desc: 'Poulet, pesto, mozzarella, tomates, cornichons', price: '55' },
    ] as Item[],
    desserts: [
      { name: 'Cookie', price: '20–25' }, { name: 'Muffins', price: '20–25' },
      { name: 'Carrot Cake', price: '25' }, { name: 'Cake au Citron', price: '25' },
      { name: 'Cheesecake', price: '30' },
    ] as Item[],
  },
  en: {
    drinks: [
      { name: 'Espresso', price: '15' }, { name: 'Americano', price: '15' },
      { name: 'Double Espresso', price: '20' }, { name: 'Nos-Nos', price: '18' },
      { name: 'Cappuccino', price: '18' }, { name: 'Flat White', price: '25' },
      { name: 'Café Latte', price: '25' }, { name: 'Matcha Latte', price: '30' },
      { name: 'Hot Chocolate', price: '25' }, { name: 'Iced Americano', price: '30' },
      { name: 'Iced Latte', price: '30' }, { name: 'Iced Matcha Latte', price: '35' },
      { name: 'Mint Tea', price: '15' }, { name: 'Sparkling Water', price: '10' },
      { name: 'Mineral Water', price: '8' },
    ] as Item[],
    special: [
      { name: 'Ube Latte', price: '30' },
      { name: 'Spring Iced Latte (Ube + Matcha)', price: '35' },
      { name: 'December (Ube + Iced Coffee)', price: '35' },
      { name: 'Iced Strawberry Matcha Latte', price: '30' },
      { name: 'Americano Cold Foam', price: '35' },
      { name: 'Cinnamon Vanilla Iced Latte', price: '35' },
    ] as Item[],
    juices: [
      { name: 'Fresh Orange Juice', price: '20' }, { name: 'Mint Lemon', price: '20' },
      { name: 'Mango Smoothie', price: '30' }, { name: 'Green Boost', price: '25' },
      { name: 'Orange Carrot Ginger', price: '25' },
    ] as Item[],
    food: [
      { name: 'Rimal Brunch', desc: 'Avocado toast, eggs, yogurt, pancakes, OJ, coffee', price: '70' },
      { name: 'Salmon Bagel Sandwich', price: '55' },
      { name: 'French Toast', desc: 'Nutella/Pistachio, butter/honey, seasonal fruits', price: '45' },
      { name: 'Pancakes', desc: 'Nutella/Pistachio, butter/honey, seasonal fruits', price: '45' },
      { name: 'Yogurt Bowl', desc: 'Seasonal fruits and homemade granola', price: '40' },
      { name: 'Melt Tuna Sandwich', price: '50' },
      { name: 'Feta Salad', desc: 'Feta cheese, salad, quinoa, beetroot', price: '60' },
      { name: 'Chicken Pesto Sandwich', desc: 'Chicken, pesto, mozzarella, tomatoes, pickles', price: '55' },
    ] as Item[],
    desserts: [
      { name: 'Cookie', price: '20–25' }, { name: 'Muffins', price: '20–25' },
      { name: 'Carrot Cake', price: '25' }, { name: 'Lemon Cake', price: '25' },
      { name: 'Cheesecake', price: '30' },
    ] as Item[],
  },
};

const tabs = [
  { key: 'drinks' as const,  Icon: Coffee,          labelFr: 'Boissons',          labelEn: 'Drinks' },
  { key: 'special' as const, Icon: Sparkles,         labelFr: 'Spéciales',         labelEn: 'Special' },
  { key: 'juices' as const,  Icon: Droplets,         labelFr: 'Jus',               labelEn: 'Juices' },
  { key: 'food' as const,    Icon: UtensilsCrossed,  labelFr: 'Brunch & Déjeuner', labelEn: 'Brunch & Lunch' },
  { key: 'desserts' as const, Icon: Cake,            labelFr: 'Desserts',          labelEn: 'Desserts' },
];

export default function CafeMenu() {
  const t = useTranslations('menu');
  const locale = useLocale();
  const lang = locale === 'en' ? 'en' : 'fr';
  const data = menuData[lang];
  const [active, setActive] = useState<keyof typeof data>('drinks');

  return (
    <section id="menu" className="section-padding bg-cream">
      <div className="container-max">

        {/* Header */}
        <div className="mb-14">
          <span className="section-badge mb-5 block w-fit">{t('badge')}</span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-espresso leading-tight max-w-sm">
              {t('title')}
            </h2>
            <p className="text-muted text-sm max-w-xs leading-relaxed">{t('subtitle')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Tabs sidebar */}
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            {tabs.map(({ key, Icon, labelFr, labelEn }) => {
              const label = lang === 'fr' ? labelFr : labelEn;
              return (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-medium transition-all whitespace-nowrap text-left flex-shrink-0 ${
                    active === key
                      ? 'bg-espresso text-cream'
                      : 'bg-cream-dark text-muted hover:text-espresso border border-cream-border'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${active === key ? 'text-coffee' : 'text-stone'}`} />
                  {label}
                </button>
              );
            })}
          </div>

          {/* Items */}
          <div className="lg:col-span-2">
            {/* Alt milk note */}
            {(active === 'drinks' || active === 'special') && (
              <div className="flex items-center gap-2 bg-coffee-mist border border-coffee/20 rounded-2xl px-5 py-3 mb-5 text-sm text-coffee-dark">
                <Info className="w-3.5 h-3.5 flex-shrink-0" />
                <span><strong>{t('alt_milk_label')}</strong> {t('alt_milk_price')} DH</span>
              </div>
            )}

            <div className="space-y-0">
              {data[active].map((item, i) => (
                <div
                  key={item.name}
                  className={`flex items-start justify-between gap-4 py-4 ${
                    i < data[active].length - 1 ? 'border-b border-cream-border' : ''
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-espresso text-sm">{item.name}</div>
                    {item.desc && <div className="text-muted text-xs mt-0.5 leading-snug">{item.desc}</div>}
                  </div>
                  <div className="font-serif font-bold text-espresso text-sm flex-shrink-0 whitespace-nowrap">
                    {item.price} <span className="text-stone font-sans font-normal text-xs">DH</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desserts note */}
            {active === 'desserts' && (
              <div className="mt-5 flex items-start gap-2 text-xs text-muted italic border-t border-cream-border pt-4">
                <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-coffee" />
                <span>{t('bakery_note')}</span>
              </div>
            )}

            {/* Membership note */}
            <div className="mt-8 flex items-center gap-3 bg-sage-mist border border-sage/20 rounded-2xl px-5 py-3.5">
              <Coffee className="w-4 h-4 text-sage flex-shrink-0" />
              <p className="text-sage text-sm font-medium">{t('note')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
