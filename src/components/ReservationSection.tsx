'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Clock, Phone, Mail, CheckCircle, MessageCircle } from 'lucide-react';

const WHATSAPP = '212639508372';
const EMAIL = 'rimalnetwork@gmail.com';

export default function ReservationSection() {
  const t = useTranslations('reservation');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', plan: '', message: '' });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const waText = () =>
    encodeURIComponent(
      `*Réservation — Rimal Network*\n\n👤 ${form.name}\n📧 ${form.email}\n📱 ${form.phone}\n📅 ${form.date}\n📦 ${form.plan}${form.message ? `\n💬 ${form.message}` : ''}`
    );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    window.open(`https://wa.me/${WHATSAPP}?text=${waText()}`, '_blank');
    setLoading(false);
    setSent(true);
  };

  return (
    <section id="contact" className="section-padding bg-cream">
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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Form */}
          <div className="lg:col-span-3 bg-cream-dark rounded-3xl p-8 border border-cream-border">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 gap-5 text-center">
                <div className="w-16 h-16 bg-sage-mist rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-sage" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-espresso">{t('success_title')}</h3>
                <p className="text-muted text-sm">{t('success_msg')}</p>
                <button onClick={() => setSent(false)} className="text-coffee text-sm hover:underline mt-2">
                  {t('name_placeholder') !== '' && 'Nouvelle réservation'}
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'name', label: t('name_label'), placeholder: t('name_placeholder'), type: 'text' },
                    { name: 'email', label: t('email_label'), placeholder: t('email_placeholder'), type: 'email' },
                  ].map((f) => (
                    <div key={f.name}>
                      <label htmlFor={`field-${f.name}`} className="block text-xs font-semibold text-espresso/60 uppercase tracking-wider mb-1.5">{f.label}</label>
                      <input
                        id={`field-${f.name}`}
                        type={f.type}
                        name={f.name}
                        required
                        value={form[f.name as keyof typeof form]}
                        onChange={onChange}
                        placeholder={f.placeholder}
                        className="w-full bg-cream border border-cream-border rounded-xl px-4 py-3 text-sm text-espresso placeholder:text-stone focus:outline-none focus:border-coffee transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'phone', label: t('phone_label'), placeholder: t('phone_placeholder'), type: 'tel' },
                    { name: 'date',  label: t('date_label'),  placeholder: '',                      type: 'date' },
                  ].map((f) => (
                    <div key={f.name}>
                      <label htmlFor={`field-${f.name}`} className="block text-xs font-semibold text-espresso/60 uppercase tracking-wider mb-1.5">{f.label}</label>
                      <input
                        id={`field-${f.name}`}
                        type={f.type}
                        name={f.name}
                        required
                        value={form[f.name as keyof typeof form]}
                        onChange={onChange}
                        placeholder={f.placeholder}
                        min={f.name === 'date' ? new Date().toISOString().split('T')[0] : undefined}
                        className="w-full bg-cream border border-cream-border rounded-xl px-4 py-3 text-sm text-espresso placeholder:text-stone focus:outline-none focus:border-coffee transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="field-plan" className="block text-xs font-semibold text-espresso/60 uppercase tracking-wider mb-1.5">{t('plan_label')}</label>
                  <select
                    id="field-plan"
                    name="plan"
                    required
                    value={form.plan}
                    onChange={onChange}
                    className="w-full bg-cream border border-cream-border rounded-xl px-4 py-3 text-sm text-espresso focus:outline-none focus:border-coffee transition-colors"
                  >
                    <option value="">{t('plan_placeholder')}</option>
                    <option>{t('plan_day')}</option>
                    <option>{t('plan_week')}</option>
                    <option>{t('plan_month')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="field-message" className="block text-xs font-semibold text-espresso/60 uppercase tracking-wider mb-1.5">{t('message_label')}</label>
                  <textarea
                    id="field-message"
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={onChange}
                    placeholder={t('message_placeholder')}
                    className="w-full bg-cream border border-cream-border rounded-xl px-4 py-3 text-sm text-espresso placeholder:text-stone focus:outline-none focus:border-coffee transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-espresso hover:bg-espresso-light text-cream font-medium py-4 rounded-xl transition-colors disabled:opacity-50 text-sm"
                >
                  {loading ? t('submitting') : t('submit')}
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-cream-border" />
                  <span className="text-stone text-xs">{t('or')}</span>
                  <div className="flex-1 h-px bg-cream-border" />
                </div>

                <button
                  type="button"
                  onClick={() => window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Bonjour, je souhaite réserver un espace au Rimal Network.')}`, '_blank')}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-medium py-4 rounded-xl transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t('whatsapp_btn')}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: MapPin, label: t('info_address_label'), value: t('info_address'), color: 'text-coffee' },
              { icon: Clock,  label: t('info_hours_label'),   value: t('info_hours'),   color: 'text-sage' },
              { icon: Phone,  label: t('info_phone_label'),   value: '06 39 50 83 72',  color: 'text-[#25D366]', href: `https://wa.me/${WHATSAPP}` },
              { icon: Mail,   label: t('info_email_label'),   value: EMAIL,             color: 'text-coffee', href: `mailto:${EMAIL}` },
            ].map(({ icon: Icon, label, value, color, href }) => (
              <div key={label} className="bg-cream-dark rounded-2xl p-5 border border-cream-border flex items-start gap-4">
                <div className="w-9 h-9 bg-cream rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-0.5">{label}</div>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className={`text-sm font-medium ${color} hover:underline`}>{value}</a>
                  ) : (
                    <div className="text-sm text-espresso whitespace-pre-line">{value}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Google Maps embed */}
            <div className="rounded-2xl overflow-hidden border border-cream-border aspect-video">
              <iframe
                src="https://maps.google.com/maps?q=Rimal+Network+Essaouira&output=embed&hl=fr&z=16"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Rimal Network — Essaouira"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
