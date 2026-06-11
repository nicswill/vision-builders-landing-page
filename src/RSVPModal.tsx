import { useState, useEffect, useRef } from 'react';
import { X, Utensils, Handshake, DollarSign, CheckCircle, Loader2, ChevronDown } from 'lucide-react';

const FORMSPREE = {
  attendee: 'https://formspree.io/f/xdavgndl',
  mentor:   'https://formspree.io/f/meewgjrw',
  sponsor:  'https://formspree.io/f/mgobkwng',
};

export type ModalType = 'attendee' | 'mentor' | 'sponsor';

interface Props {
  initialType: ModalType;
  onClose: () => void;
}

const TABS: { type: ModalType; label: string; icon: React.ReactNode }[] = [
  { type: 'attendee', label: 'RSVP / Attendee', icon: <Utensils size={15} /> },
  { type: 'mentor',   label: 'Become a Mentor', icon: <Handshake size={15} /> },
  { type: 'sponsor',  label: 'Become a Partner', icon: <DollarSign size={15} /> },
];

const HEARD_FROM = ['Social Media', 'Friend / Family', 'Church', 'Work', 'Flyer / Poster', 'Email', 'Other'];
const FOCUS_AREAS = ['Leadership', 'Career & Finance', 'Character Development', 'Fatherhood', 'Health & Fitness', 'Faith & Spirituality'];
const PARTNER_LEVELS = ['Founding Partner', 'Gold Sponsor', 'Silver Sponsor', 'Community Partner', 'Other'];

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-black tracking-widest uppercase text-[#f5f0e8]/50 mb-1.5">
        {label}{required && <span className="text-[#2aabbb] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = 'w-full bg-[#111] border border-[#f5f0e8]/10 text-[#f5f0e8] text-sm px-4 py-3 outline-none focus:border-[#2aabbb]/60 transition-colors placeholder-[#f5f0e8]/20';
const selectCls = inputCls + ' appearance-none';

function AttendeeForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '',
    bringing_a_bro: false, bro_name: '', heard_from: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.email) { setError('Please fill in all required fields.'); return; }
    setLoading(true); setError('');
    const res = await fetch(FORMSPREE.attendee, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
        bringing_a_bro: form.bringing_a_bro ? 'Yes' : 'No',
        bro_name: form.bringing_a_bro ? form.bro_name : '',
        heard_from: form.heard_from,
      }),
    });
    setLoading(false);
    if (!res.ok) { setError('Something went wrong. Please try again.'); return; }
    onSuccess();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field label="First Name" required>
          <input className={inputCls} placeholder="Marcus" value={form.first_name} onChange={e => set('first_name', e.target.value)} />
        </Field>
        <Field label="Last Name" required>
          <input className={inputCls} placeholder="Johnson" value={form.last_name} onChange={e => set('last_name', e.target.value)} />
        </Field>
      </div>
      <Field label="Email" required>
        <input type="email" className={inputCls} placeholder="marcus@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
      </Field>
      <Field label="Phone">
        <input type="tel" className={inputCls} placeholder="(555) 000-0000" value={form.phone} onChange={e => set('phone', e.target.value)} />
      </Field>

      <div className="border border-[#2aabbb]/20 bg-[#2aabbb]/5 p-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={() => set('bringing_a_bro', !form.bringing_a_bro)}
            className={`w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 transition-colors ${form.bringing_a_bro ? 'bg-[#2aabbb] border-[#2aabbb]' : 'border-[#f5f0e8]/30'}`}
          >
            {form.bringing_a_bro && <CheckCircle size={12} className="text-[#0a0a0a]" />}
          </div>
          <div>
            <p className="text-[#f5f0e8] text-sm font-bold">I'm bringing a bro!</p>
            <p className="text-[#f5f0e8]/40 text-xs mt-0.5">Bring a Bro. Build a Legacy.</p>
          </div>
        </label>
        {form.bringing_a_bro && (
          <div className="mt-3">
            <input className={inputCls} placeholder="Your bro's name" value={form.bro_name} onChange={e => set('bro_name', e.target.value)} />
          </div>
        )}
      </div>

      <Field label="How did you hear about us?">
        <div className="relative">
          <select className={selectCls} value={form.heard_from} onChange={e => set('heard_from', e.target.value)}>
            <option value="">Select one...</option>
            {HEARD_FROM.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#f5f0e8]/30 pointer-events-none" />
        </div>
      </Field>

      {error && <p className="text-red-400 text-xs font-bold">{error}</p>}
      <button type="submit" disabled={loading} className="w-full bg-[#2aabbb] hover:bg-[#1d8f9e] disabled:opacity-50 text-[#0a0a0a] font-black text-xs tracking-widest uppercase py-4 transition-all duration-200 flex items-center justify-center gap-2">
        {loading ? <Loader2 size={16} className="animate-spin" /> : null}
        {loading ? 'Submitting...' : 'Reserve My Seat'}
      </button>
    </form>
  );
}

function MentorForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '',
    city_state: '', profession: '', why_mentor: '', focus_areas: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const toggleArea = (area: string) => setForm(f => ({
    ...f,
    focus_areas: f.focus_areas.includes(area) ? f.focus_areas.filter(a => a !== area) : [...f.focus_areas, area],
  }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.email || !form.profession || !form.why_mentor) {
      setError('Please fill in all required fields.'); return;
    }
    setLoading(true); setError('');
    const res = await fetch(FORMSPREE.mentor, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
        city_state: form.city_state,
        profession: form.profession,
        focus_areas: form.focus_areas.join(', '),
        why_mentor: form.why_mentor,
      }),
    });
    setLoading(false);
    if (!res.ok) { setError('Something went wrong. Please try again.'); return; }
    onSuccess();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field label="First Name" required>
          <input className={inputCls} placeholder="Marcus" value={form.first_name} onChange={e => set('first_name', e.target.value)} />
        </Field>
        <Field label="Last Name" required>
          <input className={inputCls} placeholder="Johnson" value={form.last_name} onChange={e => set('last_name', e.target.value)} />
        </Field>
      </div>
      <Field label="Email" required>
        <input type="email" className={inputCls} placeholder="marcus@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Phone">
          <input type="tel" className={inputCls} placeholder="(555) 000-0000" value={form.phone} onChange={e => set('phone', e.target.value)} />
        </Field>
        <Field label="City / State">
          <input className={inputCls} placeholder="Atlanta, GA" value={form.city_state} onChange={e => set('city_state', e.target.value)} />
        </Field>
      </div>
      <Field label="Profession / Occupation" required>
        <input className={inputCls} placeholder="e.g. Engineer, Pastor, Entrepreneur..." value={form.profession} onChange={e => set('profession', e.target.value)} />
      </Field>
      <Field label="Focus Areas">
        <div className="grid grid-cols-2 gap-2">
          {FOCUS_AREAS.map(area => (
            <label key={area} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => toggleArea(area)}
                className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors ${form.focus_areas.includes(area) ? 'bg-[#c9972c] border-[#c9972c]' : 'border-[#f5f0e8]/25 group-hover:border-[#c9972c]/50'}`}
              >
                {form.focus_areas.includes(area) && <CheckCircle size={10} className="text-[#0a0a0a]" />}
              </div>
              <span className="text-[#f5f0e8]/60 text-xs font-semibold group-hover:text-[#f5f0e8]/80 transition-colors">{area}</span>
            </label>
          ))}
        </div>
      </Field>
      <Field label="Why do you want to mentor?" required>
        <textarea
          className={inputCls + ' resize-none h-24'}
          placeholder="Share your heart for mentorship..."
          value={form.why_mentor}
          onChange={e => set('why_mentor', e.target.value)}
        />
      </Field>
      {error && <p className="text-red-400 text-xs font-bold">{error}</p>}
      <button type="submit" disabled={loading} className="w-full bg-[#c9972c] hover:bg-[#e0aa34] disabled:opacity-50 text-[#0a0a0a] font-black text-xs tracking-widest uppercase py-4 transition-all duration-200 flex items-center justify-center gap-2">
        {loading ? <Loader2 size={16} className="animate-spin" /> : null}
        {loading ? 'Submitting...' : 'Apply to Mentor'}
      </button>
    </form>
  );
}

function SponsorForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    first_name: '', last_name: '', organization: '', email: '', phone: '',
    partnership_level: '', message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.organization || !form.email) {
      setError('Please fill in all required fields.'); return;
    }
    setLoading(true); setError('');
    const res = await fetch(FORMSPREE.sponsor, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        first_name: form.first_name,
        last_name: form.last_name,
        organization: form.organization,
        email: form.email,
        phone: form.phone,
        partnership_level: form.partnership_level,
        message: form.message,
      }),
    });
    setLoading(false);
    if (!res.ok) { setError('Something went wrong. Please try again.'); return; }
    onSuccess();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field label="First Name" required>
          <input className={inputCls} placeholder="Marcus" value={form.first_name} onChange={e => set('first_name', e.target.value)} />
        </Field>
        <Field label="Last Name" required>
          <input className={inputCls} placeholder="Johnson" value={form.last_name} onChange={e => set('last_name', e.target.value)} />
        </Field>
      </div>
      <Field label="Organization / Company" required>
        <input className={inputCls} placeholder="Your organization..." value={form.organization} onChange={e => set('organization', e.target.value)} />
      </Field>
      <Field label="Email" required>
        <input type="email" className={inputCls} placeholder="marcus@company.com" value={form.email} onChange={e => set('email', e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Phone">
          <input type="tel" className={inputCls} placeholder="(555) 000-0000" value={form.phone} onChange={e => set('phone', e.target.value)} />
        </Field>
        <Field label="Partnership Level">
          <div className="relative">
            <select className={selectCls} value={form.partnership_level} onChange={e => set('partnership_level', e.target.value)}>
              <option value="">Select level...</option>
              {PARTNER_LEVELS.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#f5f0e8]/30 pointer-events-none" />
          </div>
        </Field>
      </div>
      <Field label="Message / How would you like to partner?">
        <textarea
          className={inputCls + ' resize-none h-24'}
          placeholder="Tell us how you'd like to get involved..."
          value={form.message}
          onChange={e => set('message', e.target.value)}
        />
      </Field>
      {error && <p className="text-red-400 text-xs font-bold">{error}</p>}
      <button type="submit" disabled={loading} className="w-full bg-[#f5f0e8] hover:bg-white disabled:opacity-50 text-[#0a0a0a] font-black text-xs tracking-widest uppercase py-4 transition-all duration-200 flex items-center justify-center gap-2">
        {loading ? <Loader2 size={16} className="animate-spin" /> : null}
        {loading ? 'Submitting...' : 'Submit Partnership Interest'}
      </button>
    </form>
  );
}

function SuccessScreen({ type, onClose }: { type: ModalType; onClose: () => void }) {
  const messages: Record<ModalType, { title: string; body: string }> = {
    attendee: { title: "You're on the list!", body: "We'll send you a confirmation email with event details. See you at Bros Brunch!" },
    mentor:   { title: 'Application Received!', body: "Thank you for your heart to serve. We'll be in touch soon about next steps." },
    sponsor:  { title: 'Thank You!', body: "We appreciate your interest in partnering with Vision Builders. Our team will reach out shortly." },
  };
  const { title, body } = messages[type];
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 rounded-full bg-[#2aabbb]/15 flex items-center justify-center mb-6">
        <CheckCircle size={32} className="text-[#2aabbb]" />
      </div>
      <h3 className="text-[#f5f0e8] text-2xl font-black tracking-tight mb-3">{title}</h3>
      <p className="text-[#f5f0e8]/55 text-sm leading-relaxed max-w-xs">{body}</p>
      <button onClick={onClose} className="mt-8 bg-[#2aabbb]/15 border border-[#2aabbb]/30 text-[#2aabbb] font-black text-xs tracking-widest uppercase px-8 py-3 hover:bg-[#2aabbb]/25 transition-colors">
        Close
      </button>
    </div>
  );
}

export function RSVPModal({ initialType, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<ModalType>(initialType);
  const [success, setSuccess] = useState(false);
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

  const handleTabChange = (type: ModalType) => {
    setActiveTab(type);
    setSuccess(false);
  };

  const tabColor: Record<ModalType, string> = {
    attendee: 'border-[#2aabbb] text-[#2aabbb]',
    mentor:   'border-[#c9972c] text-[#c9972c]',
    sponsor:  'border-[#f5f0e8] text-[#f5f0e8]',
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(4,4,4,0.88)', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="relative w-full max-w-lg bg-[#0e0e0e] border border-[#f5f0e8]/8 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#0e0e0e] border-b border-[#f5f0e8]/8 z-10">
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <img src="/nav.jpeg" alt="Vision Builders™" className="h-8 w-auto" />
            <button onClick={onClose} className="text-[#f5f0e8]/30 hover:text-[#f5f0e8] transition-colors p-1">
              <X size={20} />
            </button>
          </div>
          {/* Tabs */}
          <div className="flex">
            {TABS.map(tab => (
              <button
                key={tab.type}
                onClick={() => handleTabChange(tab.type)}
                className={`flex-1 flex items-center justify-center gap-1.5 text-[10px] font-black tracking-widest uppercase py-3 border-b-2 transition-all duration-200 ${
                  activeTab === tab.type
                    ? tabColor[tab.type]
                    : 'border-transparent text-[#f5f0e8]/25 hover:text-[#f5f0e8]/50'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {success ? (
            <SuccessScreen type={activeTab} onClose={onClose} />
          ) : (
            <>
              {activeTab === 'attendee' && (
                <>
                  <div className="mb-5">
                    <h2 className="text-[#f5f0e8] text-xl font-black tracking-tight mb-1">RSVP for Bros Brunch</h2>
                    <p className="text-[#f5f0e8]/40 text-xs leading-relaxed">Secure your seat at the table. Bring a Bro. Build a Legacy.</p>
                  </div>
                  <AttendeeForm onSuccess={() => setSuccess(true)} />
                </>
              )}
              {activeTab === 'mentor' && (
                <>
                  <div className="mb-5">
                    <h2 className="text-[#f5f0e8] text-xl font-black tracking-tight mb-1">Become a Mentor</h2>
                    <p className="text-[#f5f0e8]/40 text-xs leading-relaxed">You don't have to be perfect. You just have to be present.</p>
                  </div>
                  <MentorForm onSuccess={() => setSuccess(true)} />
                </>
              )}
              {activeTab === 'sponsor' && (
                <>
                  <div className="mb-5">
                    <h2 className="text-[#f5f0e8] text-xl font-black tracking-tight mb-1">Become a Founding Partner</h2>
                    <p className="text-[#f5f0e8]/40 text-xs leading-relaxed">Invest in the next generation of leaders and community builders.</p>
                  </div>
                  <SponsorForm onSuccess={() => setSuccess(true)} />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
