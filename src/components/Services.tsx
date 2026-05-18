import { useTranslations } from 'next-intl';
import { Monitor, Lock, Phone, GraduationCap, Briefcase, CalendarCheck, Check } from 'lucide-react';

const hourlyRates = {
  fr: [
    { icon: Monitor, title: 'Espace Ouvert', subtitle: 'Eau filtrée, café noir ou thé inclus',
      rates: [{ l: '2 Heures', p: '25' }, { l: 'Mi-Journée', p: '40' }, { l: 'Journée Complète', p: '70' }] },
    { icon: Lock, title: 'Espace Privé', subtitle: 'Eau filtrée, café noir ou thé inclus',
      rates: [{ l: '1 Heure', p: '20' }, { l: 'Mi-Journée', p: '60' }, { l: 'Jour Entier', p: '90' }] },
    { icon: Phone, title: 'Phone Booth', subtitle: 'Eau filtrée, café noir ou thé inclus',
      rates: [{ l: '1 Heure', p: '35' }] },
  ],
  en: [
    { icon: Monitor, title: 'Open Space', subtitle: 'Filtered water, black coffee or tea included',
      rates: [{ l: '2 Hours', p: '25' }, { l: 'Mid Day', p: '40' }, { l: 'Full Day', p: '70' }] },
    { icon: Lock, title: 'Private Space', subtitle: 'Filtered water, black coffee or tea included',
      rates: [{ l: '1 Hour', p: '20' }, { l: 'Mid Day', p: '60' }, { l: 'Full Day', p: '90' }] },
    { icon: Phone, title: 'Phone Booth', subtitle: 'Filtered water, black coffee or tea included',
      rates: [{ l: '1 Hour', p: '35' }] },
  ],
};

const memberships = {
  fr: [
    { icon: GraduationCap, title: 'Students', price: '250', period: '/ sem.', highlight: false,
      desc: 'Tarif étudiant. Accès espace ouvert.',
      features: ['Espace ouvert', 'WiFi Fibre 200 Mbps', 'Eau filtrée incluse'] },
    { icon: Briefcase, title: 'Co-Workers', price: '350', period: '/ sem.', highlight: true,
      desc: '8h/jour, boisson chaque jour + 1 repas/semaine.',
      features: ['8h par jour', 'Boisson quotidienne', '1 repas/semaine', 'Accès prioritaire'] },
    { icon: CalendarCheck, title: 'Monthly', price: '1000', period: '/ mois', highlight: false,
      desc: '8h/jour, boisson chaque jour + 1 repas/semaine.',
      features: ['8h par jour', 'Boisson quotidienne', '1 repas/semaine', 'Bureau dédié', 'Casier privatif'] },
  ],
  en: [
    { icon: GraduationCap, title: 'Students', price: '250', period: '/ week', highlight: false,
      desc: 'Student rate. Open space access.',
      features: ['Open space', '200 Mbps WiFi', 'Filtered water'] },
    { icon: Briefcase, title: 'Co-Workers', price: '350', period: '/ week', highlight: true,
      desc: '8h/day, daily drink + 1 meal per week.',
      features: ['8h per day', 'Daily drink', '1 meal/week', 'Priority access'] },
    { icon: CalendarCheck, title: 'Monthly', price: '1000', period: '/ mo.', highlight: false,
      desc: '8h/day, daily drink + 1 meal per week.',
      features: ['8h per day', 'Daily drink', '1 meal/week', 'Dedicated desk', 'Private locker'] },
  ],
};

export default function Services({ locale = 'fr' }: { locale?: string }) {
  const t = useTranslations('services');
  const lang = locale === 'en' ? 'en' : 'fr';
  const rates = hourlyRates[lang];
  const plans = memberships[lang];
  const popular = lang === 'fr' ? 'Populaire' : 'Popular';

  return (
    <section id="services" className="section-padding bg-cream-dark">
      <div className="container-max">

        {/* Header */}
        <div className="mb-16">
          <span className="section-badge mb-5 block w-fit">{t('badge')}</span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-espresso leading-tight max-w-sm">
              {t('title')}
            </h2>
            <p className="text-muted text-sm max-w-xs leading-relaxed">{t('subtitle')}</p>
          </div>
        </div>

        {/* — Hourly rates — */}
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-stone mb-4">
            {lang === 'fr' ? 'Taux Horaire' : 'Hourly Rates'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {rates.map((s) => (
              <div key={s.title} className="bg-cream rounded-2xl p-6 border border-cream-border">
                <div className="flex items-center gap-2.5 mb-5">
                  <s.icon className="w-4 h-4 text-coffee" />
                  <div>
                    <div className="font-semibold text-espresso text-sm">{s.title}</div>
                    <div className="text-muted text-xs">{s.subtitle}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {s.rates.map((r) => (
                    <div key={r.l} className="flex justify-between items-center">
                      <span className="text-muted text-sm">{r.l}</span>
                      <span className="font-bold text-espresso text-sm">{r.p} <span className="text-stone font-normal text-xs">DH</span></span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* — Memberships — */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-stone mb-4">Rimal Membership</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((p) => (
              <div
                key={p.title}
                className={`relative rounded-2xl p-7 transition-transform hover:-translate-y-0.5 ${
                  p.highlight
                    ? 'bg-espresso text-cream'
                    : 'bg-cream border border-cream-border'
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-6">
                    <span className="bg-coffee text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {popular}
                    </span>
                  </div>
                )}

                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-4 ${p.highlight ? 'bg-white/10' : 'bg-coffee-mist'}`}>
                  <p.icon className={`w-4 h-4 ${p.highlight ? 'text-coffee' : 'text-coffee'}`} />
                </div>

                <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${p.highlight ? 'text-white/40' : 'text-muted'}`}>
                  {p.title}
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`font-serif font-bold text-3xl ${p.highlight ? 'text-cream' : 'text-espresso'}`}>{p.price}</span>
                  <span className={`text-xs ${p.highlight ? 'text-white/40' : 'text-muted'}`}>DH {p.period}</span>
                </div>

                <p className={`text-xs leading-relaxed mb-5 ${p.highlight ? 'text-white/55' : 'text-muted'}`}>{p.desc}</p>

                <ul className="space-y-2 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className={`w-3 h-3 flex-shrink-0 ${p.highlight ? 'text-coffee' : 'text-sage'}`} strokeWidth={3} />
                      <span className={`text-xs ${p.highlight ? 'text-white/70' : 'text-muted'}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`block text-center text-sm font-medium py-2.5 rounded-xl transition-all ${
                    p.highlight
                      ? 'bg-coffee text-white hover:bg-coffee-dark'
                      : 'border border-cream-border text-espresso hover:bg-espresso hover:text-cream hover:border-espresso'
                  }`}
                >
                  {t('cta')}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
