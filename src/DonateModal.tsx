import { useState, useRef, useEffect } from 'react';
import { X, Heart, CheckCircle } from 'lucide-react';

interface Props {
  onClose: () => void;
}

type Method = 'cashapp' | 'venmo' | 'zelle';

const METHODS: { id: Method; label: string; handle: string; accent: string; bg: string; emoji: string }[] = [
  { id: 'cashapp', label: 'Cash App',  handle: '$MFTK12',             accent: '#00c853', bg: '#001508', emoji: '💚' },
  { id: 'venmo',   label: 'Venmo',     handle: '@Kennita-Williams-1', accent: '#3d9df3', bg: '#00112b', emoji: '💙' },
  { id: 'zelle',   label: 'Zelle',     handle: '850-499-3261',        accent: '#9b59f5', bg: '#0d0520', emoji: '💜' },
];

export function DonateModal({ onClose }: Props) {
  const [copied, setCopied] = useState<Method | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const copy = async (id: Method, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const el = document.createElement('textarea');
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(id);
    setTimeout(() => setCopied(null), 2500);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(4,4,4,0.92)', backdropFilter: 'blur(8px)' }}
      onClick={e => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="relative w-full max-w-md bg-[#0e0e0e] border border-[#c9972c]/35 shadow-2xl shadow-[#c9972c]/10 max-h-[90vh] overflow-y-auto">
        {/* Gold top bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c9972c] to-transparent" />

        {/* Header */}
        <div className="flex items-start justify-between px-7 pt-8 pb-5 border-b border-[#f5f0e8]/8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Heart size={15} className="text-[#c9972c]" />
              <span className="text-[#c9972c] text-[10px] font-black tracking-[0.25em] uppercase">Community Impact</span>
            </div>
            <h2 className="text-[#f5f0e8] text-2xl font-black tracking-tight">Support the Vision</h2>
            <p className="text-[#f5f0e8]/45 text-xs mt-1 leading-relaxed max-w-xs">
              Thank you for helping us build the next generation of leaders.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#f5f0e8]/30 hover:text-[#f5f0e8] transition-colors p-1 mt-1 flex-shrink-0"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-7 py-6">
          {/* Impact list */}
          <div className="bg-[#0d1a1c] border border-[#2aabbb]/15 p-5 mb-6 rounded-sm">
            <p className="text-[#f5f0e8]/50 text-[10px] font-black tracking-widest uppercase mb-3">
              Your contribution directly supports:
            </p>
            <ul className="space-y-2">
              {[
                'Mentorship opportunities',
                'Leadership development',
                'Educational resources',
                'Community impact initiatives',
                'Future Vision Builders programs',
              ].map(item => (
                <li key={item} className="flex items-center gap-2.5 text-[#f5f0e8]/65 text-sm">
                  <CheckCircle size={13} className="text-[#2aabbb] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Payment methods */}
          <p className="text-[#f5f0e8]/35 text-[10px] font-black tracking-[0.2em] uppercase mb-3">
            Choose a payment method
          </p>
          <div className="space-y-3">
            {METHODS.map(m => (
              <div
                key={m.id}
                style={{ backgroundColor: m.bg, borderColor: m.accent + '35' }}
                className="border p-4 flex items-center justify-between gap-4 transition-all duration-200 hover:border-opacity-60"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xl leading-none flex-shrink-0" aria-hidden="true">{m.emoji}</span>
                  <div className="min-w-0">
                    <p style={{ color: m.accent }} className="font-black text-[10px] uppercase tracking-widest mb-0.5">
                      {m.label}
                    </p>
                    <p className="text-[#f5f0e8] font-mono font-bold text-sm truncate">{m.handle}</p>
                  </div>
                </div>
                <button
                  onClick={() => copy(m.id, m.handle)}
                  style={{
                    borderColor: copied === m.id ? m.accent : m.accent + '55',
                    color: copied === m.id ? m.accent : m.accent + 'aa',
                  }}
                  className="border text-[10px] font-black tracking-wider uppercase px-4 py-2 flex-shrink-0 transition-all duration-200 hover:opacity-100 whitespace-nowrap"
                  aria-label={`Copy ${m.label} handle`}
                >
                  {copied === m.id ? (
                    <span className="flex items-center gap-1.5">
                      <CheckCircle size={11} /> Copied!
                    </span>
                  ) : (
                    `Copy ${m.label}`
                  )}
                </button>
              </div>
            ))}
          </div>

          <p className="text-[#f5f0e8]/22 text-xs text-center mt-5 leading-relaxed">
            Every gift — no matter the size — helps us build stronger leaders and stronger communities.
          </p>
        </div>
      </div>
    </div>
  );
}
