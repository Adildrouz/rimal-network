'use client';

import { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';

const WHATSAPP = '212639508372';

const MESSAGES = {
  fr: {
    tooltip: 'Discuter sur WhatsApp',
    bubble: 'Bonjour 👋 Comment puis-je vous aider ?',
    cta: 'Démarrer la conversation',
    close: 'Fermer',
  },
  en: {
    tooltip: 'Chat on WhatsApp',
    bubble: 'Hello 👋 How can I help you?',
    cta: 'Start conversation',
    close: 'Close',
  },
};

export default function WhatsAppButton({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const t = MESSAGES[locale as keyof typeof MESSAGES] ?? MESSAGES.fr;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const waUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    locale === 'fr'
      ? 'Bonjour, je souhaite avoir des informations sur Rimal Network.'
      : 'Hello, I would like to get information about Rimal Network.'
  )}`;

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup card */}
      {open && (
        <div
          role="dialog"
          aria-label={t.tooltip}
          className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-72 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          {/* Header */}
          <div className="bg-[#25D366] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Rimal Network</p>
                <p className="text-white/80 text-xs">Essaouira, Maroc</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label={t.close}
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Message bubble */}
          <div className="p-4 bg-[#ECE5DD]">
            <div className="bg-white rounded-xl rounded-tl-none px-4 py-3 shadow-sm max-w-[90%]">
              <p className="text-gray-800 text-sm leading-relaxed">{t.bubble}</p>
              <p className="text-gray-400 text-[10px] mt-1 text-right">Rimal Network</p>
            </div>
          </div>

          {/* CTA */}
          <div className="p-3 bg-white border-t border-gray-100">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.cta}
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-medium py-3 rounded-xl transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              {t.cta}
            </a>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={t.tooltip}
        aria-expanded={open}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative"
      >
        {open ? (
          <X className="w-6 h-6" aria-hidden="true" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" aria-hidden="true" />
            {/* Ping animation */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping" />
              <span className="text-[9px] text-white font-bold">1</span>
            </span>
          </>
        )}
      </button>
    </div>
  );
}
