import { useState, useEffect, useRef } from 'react';
import {
  Hammer,
  Target,
  Heart,
  Star,
  Shield,
  Users,
  BookOpen,
  Award,
  ChevronDown,
  Menu,
  X,
  Flame,
  Utensils,
  Trophy,
  MessageSquare,
  Handshake,
  CheckCircle,
  TrendingUp,
  Globe,
  Zap,
  DollarSign,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
} from 'lucide-react';
import { RSVPModal, ModalType } from './RSVPModal';
import { DonateModal } from './DonateModal';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState<ModalType | null>(null);
  const [donateOpen, setDonateOpen] = useState(false);

  const openModal = (type: ModalType) => { setModal(type); setMenuOpen(false); };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-[#f5f0e8] font-sans overflow-x-hidden">
      {modal && <RSVPModal initialType={modal} onClose={() => setModal(null)} />}
      {donateOpen && <DonateModal onClose={() => setDonateOpen(false)} />}

      {/* ── NAV ─────────────────────────────────────────── */}
      {/* Announcement bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#c9972c] text-[#0a0a0a] py-1.5 flex items-center justify-center gap-2 text-[11px] font-black tracking-[0.18em] uppercase">
        <Calendar size={11} />
        <span>Bros Brunch &mdash; June 20 &nbsp;·&nbsp; 10 AM – 1 PM &nbsp;·&nbsp; Valparaiso Community Center</span>
        <button
          onClick={() => openModal('attendee')}
          className="ml-3 bg-[#0a0a0a] text-[#c9972c] px-2.5 py-0.5 text-[10px] font-black tracking-widest uppercase hover:bg-[#1a1a1a] transition-colors duration-150"
        >
          RSVP
        </button>
      </div>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ${scrolled ? 'bg-[#080808]/96 backdrop-blur shadow-xl shadow-black/50' : 'bg-transparent'}`} style={{ top: '32px' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <img src="/vb_logo_horizontal.png" alt="Vision Builders™" className="h-12 md:h-14 w-auto -ml-1" />
          <div className="hidden lg:flex items-center gap-8">
            {[['About', '#about'], ['Blueprint', '#blueprint'], ['Brunch', '#brunch'], ['Mission', '#mission'], ['Partners', '#partners']].map(([label, href]) => (
              <a key={label} href={href} className="text-[#f5f0e8]/60 hover:text-[#2aabbb] text-xs font-bold tracking-widest uppercase transition-colors duration-200">{label}</a>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => openModal('mentor')} className="text-[#2aabbb] border border-[#2aabbb]/50 hover:border-[#2aabbb] text-xs font-black tracking-wider uppercase px-4 py-2.5 transition-all duration-200 hover:bg-[#2aabbb]/10">Become a Mentor</button>
            <div className="relative">
              <span className="absolute -inset-0.5 rounded-sm bg-[#c9972c]/40 animate-ping" />
              <button onClick={() => openModal('attendee')} className="relative bg-[#c9972c] hover:bg-[#e0aa34] text-[#0a0a0a] text-xs font-black tracking-wider uppercase px-5 py-2.5 transition-all duration-200 flex items-center gap-1.5">
                <Utensils size={12} /> RSVP &middot; Jun 20
              </button>
            </div>
          </div>
          <button className="lg:hidden text-[#f5f0e8] p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-[#080808] border-t border-[#2aabbb]/15 px-6 py-7 flex flex-col gap-5">
            {[['About', '#about'], ['Blueprint', '#blueprint'], ['Brunch', '#brunch'], ['Mission', '#mission'], ['Partners', '#partners']].map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)} className="text-[#f5f0e8]/70 hover:text-[#2aabbb] font-bold tracking-widest uppercase text-sm transition-colors">{label}</a>
            ))}
            <div className="pt-2 flex flex-col gap-3 border-t border-[#f5f0e8]/10">
              <button onClick={() => openModal('attendee')} className="bg-[#c9972c] text-[#0a0a0a] font-black tracking-wider uppercase text-sm px-5 py-3.5 text-center">RSVP for Bros Brunch</button>
              <button onClick={() => openModal('mentor')} className="border border-[#2aabbb]/50 text-[#2aabbb] font-black tracking-wider uppercase text-sm px-5 py-3.5 text-center">Become a Mentor</button>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-between text-center px-6 pt-36 pb-16 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/13f4f830-bc45-469a-a979-de4d3ce705e1.jpeg"
            alt=""
            className="w-full h-full object-cover object-top"
          />
          {/* Minimal top vignette — nav area only */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/30 via-transparent to-transparent" style={{ backgroundSize: '100% 30%', backgroundRepeat: 'no-repeat' }} />
          {/* Bottom darkness — buries "5 WAYS", never touches faces */}
          <div className="absolute inset-x-0 bottom-0 h-[52%]" style={{ background: 'linear-gradient(to top, #0a0a0a 0%, #0a0a0a 22%, rgba(10,10,10,0.95) 42%, rgba(10,10,10,0.55) 68%, transparent 100%)' }} />
          {/* Subtle side vignettes */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/15 via-transparent to-[#0a0a0a]/15" />
        </div>

        {/* Ambient glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] bg-[#c9972c]/6 rounded-full blur-[100px] pointer-events-none" />

        {/* Spacer — keeps faces as the visual focus in the upper portion */}
        <div className="relative z-10 w-full" aria-hidden="true" />

        {/* Lower cluster — headline + card + buttons sit in the dark bottom band */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-5">
          {/* Headline — below the background "Bring a Bro. Build a Legacy." text */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wide text-white leading-snug drop-shadow-md mb-1">
            Building Men.{' '}
            <span className="text-[#2aabbb]">Building Futures.</span>{' '}
            <span className="whitespace-nowrap">Building Communities.</span>
          </h1>

          {/* Mission card */}
          <div className="max-w-xl w-full mx-auto bg-black/80 backdrop-blur-sm border-l-4 border-[#2aabbb] rounded-lg px-6 py-4 text-left">
            <p className="text-[#f5f0e8] text-sm font-bold mb-1">This isn't just a brunch.</p>
            <p className="text-[#f5f0e8]/65 text-sm leading-relaxed">
              It's the launch of a leadership and mentorship movement dedicated to helping men and young men build stronger futures through mentorship, leadership, service, and community.
            </p>
          </div>

          {/* Event details strip */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-1.5 text-[#f5f0e8]/70 text-xs font-semibold tracking-wide">
              <Calendar size={12} className="text-[#2aabbb]" />
              June 20, 2025
            </span>
            <span className="flex items-center gap-1.5 text-[#f5f0e8]/70 text-xs font-semibold tracking-wide">
              <Clock size={12} className="text-[#2aabbb]" />
              10:00 AM – 1:00 PM &nbsp;<span className="text-[#f5f0e8]/40">(Doors 9:30 AM)</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#f5f0e8]/70 text-xs font-semibold tracking-wide">
              <MapPin size={12} className="text-[#2aabbb]" />
              Valparaiso Community Center · 268 Glenview Ave, Valparaiso, FL
            </span>
          </div>

          {/* Buttons — single row on desktop */}
          <div className="flex flex-row flex-wrap justify-center gap-4">
            <button onClick={() => openModal('attendee')} className="bg-[#2aabbb] hover:bg-[#1d8f9e] text-[#0a0a0a] font-black text-xs tracking-widest uppercase px-6 py-3 transition-all duration-200 hover:scale-105 shadow-lg shadow-[#2aabbb]/20 flex items-center gap-2 justify-center">
              <Utensils size={14} /> RSVP for Bros Brunch
            </button>
            <button onClick={() => openModal('mentor')} className="bg-transparent border-2 border-[#c9972c] text-[#c9972c] hover:bg-[#c9972c] hover:text-[#0a0a0a] font-black text-xs tracking-widest uppercase px-6 py-3 transition-all duration-200 hover:scale-105 flex items-center gap-2 justify-center">
              <Handshake size={14} /> Become a Mentor
            </button>
            <button onClick={() => openModal('sponsor')} className="bg-transparent border-2 border-[#f5f0e8]/25 text-[#f5f0e8] hover:border-[#f5f0e8]/60 font-black text-xs tracking-widest uppercase px-6 py-3 transition-all duration-200 hover:scale-105 flex items-center gap-2 justify-center">
              <Star size={14} /> Become a Founding Partner
            </button>
          </div>

          {/* Launch badge */}
          <div className="inline-flex items-center gap-2 bg-[#c9972c]/15 border border-[#c9972c]/40 text-[#c9972c] text-[10px] font-black tracking-[0.18em] uppercase px-4 py-2 rounded-sm">
            <Flame size={11} />
            Launching This Father's Day Season
            <Flame size={11} />
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={20} className="text-[#f5f0e8]/20" />
        </div>
      </section>

      {/* ── STAT STRIP ───────────────────────────────────── */}
      <section className="bg-[#2aabbb] py-8 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-3 divide-x divide-[#0a0a0a]/20">
          {[
            { value: 'Building', label: 'Men' },
            { value: 'Building', label: 'Leaders' },
            { value: 'Building', label: 'Community' },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center px-6 py-2 text-center">
              <span className="text-[#0a0a0a] font-black text-lg md:text-2xl tracking-wide uppercase">{s.value}</span>
              <span className="text-[#0a1a1c]/60 font-bold text-xs tracking-widest uppercase">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY VISION BUILDERS MATTERS ──────────────────── */}
      <section id="about" className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0c1a1c] to-[#0a0a0a]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.035] pointer-events-none select-none">
          <img src="/vb_only_silouette.png" alt="" className="h-[600px] w-auto" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <p className="text-[#2aabbb] text-[11px] font-black tracking-[0.25em] uppercase mb-5">Why We Exist</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#f5f0e8] leading-none mb-6">
              Why Vision Builders<br /><span className="text-[#2aabbb]">Matters</span>
            </h2>
            <div className="w-14 h-1 bg-[#c9972c] mb-8" />
            <p className="text-[#f5f0e8] text-2xl md:text-3xl font-black leading-tight mb-10">
              Every Young Man Is Building Something.
            </p>
            <div className="space-y-4 mb-10">
              {[
                'Some are building confidence.',
                'Some are building a future.',
                'Some are building resilience after disappointment.',
                'Some are building a dream no one else can yet see.',
              ].map((line, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c9972c] mt-2.5 flex-shrink-0" />
                  <p className="text-[#f5f0e8]/75 text-base md:text-lg">{line}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#0d1a1c] border border-[#2aabbb]/20 p-7 mb-8">
              <p className="text-[#f5f0e8]/80 text-base md:text-lg leading-relaxed">
                The question is not whether they are building.<br />
                <span className="text-[#f5f0e8] font-bold">The question is who is helping them build.</span>
              </p>
            </div>
            <p className="text-[#f5f0e8]/65 text-sm md:text-base leading-relaxed">
              Vision Builders™ exists to connect men and young men through mentorship, leadership, service, and community so that <span className="text-[#2aabbb] font-bold">no one has to build alone.</span>
            </p>
          </FadeIn>

          <FadeIn delay={150}>
            <div>
              <div className="relative">
                <img
                  src="/5b768d9c-b925-4746-89ef-c06e1335755e.jpeg"
                  alt="Mentorship"
                  className="w-full h-[500px] object-cover object-top"
                />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#c9972c]" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#2aabbb]" />
              </div>
              <div className="border-l-4 border-[#c9972c] pl-6 pt-5">
                <p className="text-[#f5f0e8]/80 text-base italic mb-2">Because builders don't just talk about change.</p>
                <p className="text-[#c9972c] text-xl md:text-2xl font-black uppercase tracking-wide">Builders Leave Evidence.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── BLUEPRINT ────────────────────────────────────── */}
      <section id="blueprint" className="py-32 px-6 bg-[#060606]">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-[#c9972c] text-[11px] font-black tracking-[0.25em] uppercase mb-4">Our Framework</p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#f5f0e8] mb-4">
                The Vision Builders<span className="text-[#2aabbb]">™</span> Blueprint
              </h2>
              <div className="w-14 h-1 bg-[#c9972c] mx-auto" />
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: <Hammer size={44} />,
                emoji: '🛠️',
                title: 'Build Me',
                accent: '#2aabbb',
                border: 'border-[#2aabbb]/20 hover:border-[#2aabbb]/60',
                items: ['Character', 'Confidence', 'Discipline', 'Accountability', 'Mental Strength'],
              },
              {
                icon: <Target size={44} />,
                emoji: '🎯',
                title: 'Build My Future',
                accent: '#c9972c',
                border: 'border-[#c9972c]/20 hover:border-[#c9972c]/60',
                items: ['Education', 'Career', 'Leadership', 'Purpose', 'Financial Literacy'],
                featured: true,
              },
              {
                icon: <Heart size={44} />,
                emoji: '❤️',
                title: 'Build My Community',
                accent: '#2aabbb',
                border: 'border-[#2aabbb]/20 hover:border-[#2aabbb]/60',
                items: ['Service', 'Impact', 'Teamwork', 'Civic Responsibility', 'Legacy'],
              },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className={`relative bg-[#0c0c0c] border ${card.border} p-10 group transition-all duration-300 hover:-translate-y-2 h-full flex flex-col`}>
                  {card.featured && (
                    <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c9972c] to-transparent" />
                  )}
                  <div style={{ color: card.accent }} className="mb-6 transition-transform duration-300 group-hover:scale-110 origin-left">
                    {card.icon}
                  </div>
                  <h3 className="text-[#f5f0e8] text-2xl font-black uppercase tracking-wide mb-2">{card.title}</h3>
                  <div style={{ backgroundColor: card.accent }} className="w-10 h-0.5 mb-8" />
                  <ul className="space-y-3 flex-grow">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <CheckCircle size={15} style={{ color: card.accent }} className="flex-shrink-0" />
                        <span className="text-[#f5f0e8]/65 font-medium text-sm tracking-wide">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="text-center border-t border-[#f5f0e8]/8 pt-14">
              <p className="text-[#f5f0e8]/40 text-sm font-bold tracking-widest uppercase mb-3">Three Areas. One Blueprint.</p>
              <p className="text-[#c9972c] text-2xl md:text-3xl font-black uppercase tracking-wide">A Lifetime of Building.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── BROS BRUNCH ──────────────────────────────────── */}
      <section id="brunch" className="relative py-24 px-6 overflow-hidden bg-[#080808]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c9972c] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2aabbb]/30 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[2fr_3fr] gap-10 xl:gap-16 items-start">

            {/* LEFT — Flyer */}
            <FadeIn>
              <div className="relative group">
                {/* Outer glow frame */}
                <div className="absolute -inset-1 bg-gradient-to-br from-[#c9972c]/30 via-transparent to-[#2aabbb]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative border border-[#c9972c]/25 shadow-2xl shadow-black/60 overflow-hidden">
                  <img
                    src="/11b35728-6ced-4250-a8a0-5ff1f8cb46f6.jpeg"
                    alt="Vision Builders™ Bros Brunch event flyer"
                    className="w-full h-auto block object-contain cursor-zoom-in transition-transform duration-500 group-hover:scale-[1.02]"
                    onClick={() => {
                      const overlay = document.createElement('div');
                      overlay.style.cssText = 'position:fixed;inset:0;z-index:999;background:rgba(4,4,4,0.95);display:flex;align-items:center;justify-content:center;padding:1rem;cursor:zoom-out;backdrop-filter:blur(4px)';
                      const img = document.createElement('img');
                      img.src = '/11b35728-6ced-4250-a8a0-5ff1f8cb46f6.jpeg';
                      img.style.cssText = 'max-width:100%;max-height:90vh;object-fit:contain;box-shadow:0 0 60px rgba(0,0,0,0.8)';
                      overlay.appendChild(img);
                      overlay.addEventListener('click', () => document.body.removeChild(overlay));
                      document.body.appendChild(overlay);
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-[#0a0a0a]/80 border border-[#f5f0e8]/15 px-2.5 py-1.5 flex items-center gap-1.5 pointer-events-none">
                    <ArrowRight size={11} className="text-[#f5f0e8]/50 rotate-45 -scale-x-100" />
                    <span className="text-[#f5f0e8]/40 text-[9px] font-bold tracking-widest uppercase">Click to enlarge</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* RIGHT — Event details */}
            <FadeIn delay={120}>
              <div className="flex flex-col h-full">

                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-px bg-[#c9972c]" />
                  <p className="text-[#c9972c] text-[11px] font-black tracking-[0.25em] uppercase">Official Launch Event</p>
                </div>

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#f5f0e8] leading-none mb-1">
                  Vision Builders<span className="text-[#2aabbb]">™</span>
                </h2>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#c9972c] leading-none mb-5">
                  Bros Brunch
                </h2>

                {/* Tagline */}
                <p className="text-[#f5f0e8]/55 font-bold tracking-[0.2em] uppercase text-xs mb-6">
                  Bring a Bro. Build a Legacy.
                </p>

                <div className="w-12 h-0.5 bg-[#2aabbb] mb-7" />

                {/* Event logistics */}
                <div className="grid sm:grid-cols-3 gap-3 mb-7">
                  {[
                    { icon: <Calendar size={16} />, label: 'Date', value: 'June 20, 2025' },
                    { icon: <Clock size={16} />,    label: 'Time', value: '10:00 AM – 1:00 PM', sub: 'Doors open 9:30 AM' },
                    { icon: <MapPin size={16} />,   label: 'Location', value: 'Valparaiso Community Center', sub: '268 Glenview Ave, Valparaiso, FL 32580' },
                  ].map(({ icon, label, value, sub }) => (
                    <div key={label} className="flex flex-col gap-1 bg-[#0d1a1c] border border-[#2aabbb]/15 rounded px-4 py-3.5">
                      <div className="flex items-center gap-2 text-[#2aabbb] mb-0.5">{icon}<span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#f5f0e8]/35">{label}</span></div>
                      <p className="text-[#f5f0e8] text-sm font-bold leading-snug">{value}</p>
                      {sub && <p className="text-[#f5f0e8]/45 text-[11px] leading-snug">{sub}</p>}
                    </div>
                  ))}
                </div>

                {/* Descriptions */}
                <p className="text-[#f5f0e8]/85 text-base md:text-lg font-semibold leading-relaxed mb-3">
                  Join us for the official launch of Vision Builders™, a movement dedicated to mentorship, leadership development, character building, and legacy creation.
                </p>
                <p className="text-[#f5f0e8]/55 text-sm md:text-base leading-relaxed mb-8">
                  Enjoy a morning of fellowship, networking, leadership conversations, mentor connections, and community building while helping launch a vision that will impact generations.
                </p>

                {/* Event highlights — 2-column grid */}
                <p className="text-[#f5f0e8]/35 text-[10px] font-black tracking-[0.2em] uppercase mb-4">Event Highlights</p>
                <div className="grid grid-cols-2 gap-2.5 mb-9">
                  {[
                    { icon: <Utensils size={15} />, label: 'Breakfast Burritos' },
                    { icon: <Star size={15} />,    label: 'Sweet Treats' },
                    { icon: <Users size={15} />,   label: 'Fellowship' },
                    { icon: <MessageSquare size={15} />, label: 'Leadership Conversations' },
                    { icon: <Handshake size={15} />, label: 'Mentor Connections' },
                    { icon: <Globe size={15} />,   label: 'Community Networking' },
                  ].map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-[#0d1a1c] border border-[#2aabbb]/12 hover:border-[#2aabbb]/40 px-4 py-3.5 transition-all duration-200 group"
                    >
                      <div className="text-[#2aabbb] flex-shrink-0 group-hover:scale-110 transition-transform duration-200">{feat.icon}</div>
                      <span className="text-[#f5f0e8]/75 font-semibold text-xs group-hover:text-[#f5f0e8] transition-colors duration-200">{feat.label}</span>
                    </div>
                  ))}
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <button
                    onClick={() => openModal('attendee')}
                    className="inline-flex items-center justify-center gap-2 bg-[#c9972c] hover:bg-[#e0aa34] text-[#0a0a0a] font-black text-sm tracking-widest uppercase px-10 py-4 transition-all duration-200 hover:scale-105 shadow-xl shadow-[#c9972c]/25"
                  >
                    <Utensils size={15} /> RSVP Now
                  </button>
                  <button
                    onClick={() => openModal('mentor')}
                    className="inline-flex items-center justify-center gap-2 border-2 border-[#2aabbb] text-[#2aabbb] hover:bg-[#2aabbb] hover:text-[#0a0a0a] font-black text-sm tracking-widest uppercase px-10 py-4 transition-all duration-200 hover:scale-105"
                  >
                    <Handshake size={15} /> Become a Mentor
                  </button>
                </div>
                <p className="text-[#f5f0e8]/25 text-xs mt-4 tracking-wide">
                  Seats are limited — secure yours and bring your bro today.
                </p>

              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ── MISSION FIRST ────────────────────────────────── */}
      <section id="mission" className="relative py-32 px-6 overflow-hidden bg-[#06080a]">
        {/* Military diagonal pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #2aabbb 0, #2aabbb 1px, transparent 0, transparent 50%)' , backgroundSize: '30px 30px' }} />
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-transparent via-[#2aabbb] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-transparent via-[#c9972c] to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="flex items-center gap-3 mb-6">
                <Shield size={18} className="text-[#2aabbb]" />
                <span className="text-[#2aabbb] text-[11px] font-black tracking-[0.25em] uppercase">Military-Inspired Initiative</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#f5f0e8] leading-none mb-2">Mission First</h2>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#2aabbb] leading-none mb-8">Initiative™</h2>
              <div className="w-14 h-1 bg-[#c9972c] mb-8" />
              <p className="text-[#f5f0e8]/70 text-base md:text-lg leading-relaxed mb-10">
                Connecting veterans, active-duty military members, community leaders, and young men through mentorship, service, leadership, and legacy.
              </p>
              <div className="space-y-4 mb-12">
                {[
                  { icon: <BookOpen size={20} />, label: 'Veteran Storytelling', desc: 'Real stories. Real impact. Real lives changed.' },
                  { icon: <Heart size={20} />, label: 'Community Service', desc: 'Action over words. Service as a way of life.' },
                  { icon: <TrendingUp size={20} />, label: 'Leadership Development', desc: 'Lead by example. Grow through service.' },
                  { icon: <Shield size={20} />, label: 'Military Mentorship', desc: 'Mission-driven guidance for the next generation.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-11 h-11 bg-[#0d1a1c] border border-[#2aabbb]/20 group-hover:border-[#2aabbb]/60 flex items-center justify-center flex-shrink-0 transition-colors duration-200 text-[#2aabbb]">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[#f5f0e8] font-black text-sm uppercase tracking-wide mb-0.5">{item.label}</p>
                      <p className="text-[#f5f0e8]/40 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-[#0d1a1c] border border-[#c9972c]/25 p-7">
                <p className="text-[#c9972c] font-black text-sm uppercase tracking-widest mb-1">Honoring Service.</p>
                <p className="text-[#f5f0e8] font-black text-sm uppercase tracking-widest mb-1">Building Leaders.</p>
                <p className="text-[#f5f0e8]/60 font-bold text-sm uppercase tracking-widest">Strengthening Communities.</p>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="relative">
                <img
                  src="/a3a763e6-47d7-43b7-99d9-452f7e445f60.jpeg"
                  alt="Military mentorship"
                  className="w-full h-[560px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080a]/70 to-transparent" />
                <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-[#c9972c]" />
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-[#2aabbb]" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── WHAT WE'RE BUILDING TOGETHER ─────────────────── */}
      <section className="relative py-32 px-6 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#2aabbb]/30 to-transparent" />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="relative">
              <img
                src="/1d76c411-7ff1-4dda-837d-b8cc10bf563e.jpeg"
                alt="Building together"
                className="w-full h-[520px] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/30" />
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[#2aabbb]" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-[#c9972c]" />
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <p className="text-[#2aabbb] text-[11px] font-black tracking-[0.25em] uppercase mb-5">Year-Round Impact</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#f5f0e8] leading-tight mb-6">
              What We're Building <span className="text-[#2aabbb]">Together</span>
            </h2>
            <div className="w-14 h-1 bg-[#c9972c] mb-8" />
            <p className="text-[#f5f0e8]/65 text-base mb-10 leading-relaxed">
              Throughout the year, participants work alongside mentors to:
            </p>
            <div className="space-y-4">
              {[
                { icon: <Target size={18} />, text: 'Set personal growth goals' },
                { icon: <TrendingUp size={18} />, text: 'Create future success plans' },
                { icon: <Globe size={18} />, text: 'Complete community impact projects' },
                { icon: <Award size={18} />, text: 'Develop leadership skills' },
                { icon: <Users size={18} />, text: 'Build meaningful relationships' },
                { icon: <Star size={18} />, text: 'Celebrate milestones' },
                { icon: <Heart size={18} />, text: 'Create lasting legacies' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group border-b border-[#f5f0e8]/5 pb-4 last:border-0">
                  <div className="w-9 h-9 bg-[#0d1a1c] border border-[#2aabbb]/20 group-hover:border-[#2aabbb]/60 flex items-center justify-center flex-shrink-0 transition-colors duration-200 text-[#2aabbb]">
                    {item.icon}
                  </div>
                  <span className="text-[#f5f0e8]/70 group-hover:text-[#f5f0e8] font-semibold text-sm transition-colors duration-200">{item.text}</span>
                  <ArrowRight size={14} className="text-[#2aabbb]/0 group-hover:text-[#2aabbb]/60 ml-auto transition-all duration-200" />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── LEGACY SHOWCASE ──────────────────────────────── */}
      <section className="relative py-32 px-6 overflow-hidden bg-[#060606]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#0c1a1c] to-[#060606]" />
        <div className="absolute left-0 top-0 right-0 bottom-0 opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
          <img src="/vb_only_silouette.png" alt="" className="h-[700px] w-auto" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="text-[#c9972c] text-[11px] font-black tracking-[0.25em] uppercase mb-5">End of Year Celebration</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#f5f0e8] mb-2">
              The Vision Builders
            </h2>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#2aabbb] mb-8">
              Legacy Showcase™
            </h2>
            <div className="w-14 h-1 bg-[#c9972c] mx-auto mb-12" />
          </FadeIn>

          <FadeIn delay={100}>
            <div className="bg-[#0d1a1c] border border-[#2aabbb]/20 p-10 md:p-14 mb-12">
              <p className="text-[#f5f0e8]/75 text-lg md:text-xl leading-relaxed mb-8">
                At the end of the year, participants stand beside their mentors and present what they built.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-10">
                {['Families Attend.', 'Sponsors Attend.', 'Community Leaders Attend.'].map((line, i) => (
                  <div key={i} className="text-center">
                    <div className="w-px h-8 bg-[#c9972c]/40 mx-auto mb-3" />
                    <p className="text-[#f5f0e8]/60 text-sm font-bold">{line}</p>
                  </div>
                ))}
              </div>
              <p className="text-[#f5f0e8]/75 text-base leading-relaxed">
                Mentors stand proudly beside the young men they invested in.
              </p>
            </div>

            <div className="mb-8">
              <p className="text-[#f5f0e8]/40 text-sm tracking-widest uppercase font-bold mb-4">Featured Question</p>
              <p className="text-3xl md:text-5xl font-black text-[#f5f0e8] leading-tight">
                "What Did You Build <span className="text-[#2aabbb]">This Year?</span>"
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px flex-1 bg-[#c9972c]/30" />
              <p className="text-[#c9972c] font-black text-lg uppercase tracking-widest">Because builders leave evidence.</p>
              <div className="h-px flex-1 bg-[#c9972c]/30" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOUNDING PARTNER OPPORTUNITIES ───────────────── */}
      <section id="partners" className="relative py-32 px-6 overflow-hidden bg-[#0a0a0a]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9972c]/50 to-transparent" />
        {/* Background image */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src="/733fd0a5-813f-4e4f-aeb6-adee36fba2f5.jpeg" alt="" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        </div>

        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-[#c9972c] text-[11px] font-black tracking-[0.25em] uppercase mb-4">Investment Opportunity</p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#f5f0e8] mb-4">
                Become a <span className="text-[#c9972c]">Founding Partner</span>
              </h2>
              <div className="w-14 h-1 bg-[#2aabbb] mx-auto mb-8" />
              <p className="text-[#f5f0e8]/70 text-base max-w-2xl mx-auto mb-6 leading-relaxed">
                Invest in the next generation of leaders and help build stronger communities through mentorship, leadership development, educational opportunities, and life-changing experiences.
              </p>
              <div className="max-w-2xl mx-auto bg-[#0d1a1c] border border-[#c9972c]/20 px-7 py-5 text-left">
                <p className="text-[#f5f0e8]/60 text-sm leading-relaxed">
                  <span className="text-[#c9972c] font-black">Not ready for a sponsorship level?</span>{' '}
                  You can still support the Vision Builders mission with a one-time gift of any amount. Every contribution helps us mentor young men, develop future leaders, and create opportunities that change lives.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Sponsorship tier cards — existing four */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
            {[
              { tier: 'Presenting Partner', amount: '$2,500+', icon: <Zap size={28} />, accent: '#c9972c', featured: true, perks: ['Top-tier recognition', 'Event naming rights', 'Premier branding'] },
              { tier: 'Legacy Partner', amount: '$1,000+', icon: <Star size={28} />, accent: '#2aabbb', perks: ['Featured recognition', 'Event branding', 'VIP access'] },
              { tier: 'Community Partner', amount: '$500+', icon: <Users size={28} />, accent: '#2aabbb', perks: ['Program recognition', 'Social features', 'Event tickets'] },
              { tier: 'Future Builder Sponsor', amount: '$250+', icon: <TrendingUp size={28} />, accent: '#2aabbb', perks: ['Sponsor recognition', 'Program listing', 'Community thanks'] },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className={`relative border p-8 flex flex-col h-full group transition-all duration-300 hover:-translate-y-1 ${
                  p.featured
                    ? 'bg-[#1a1000] border-[#c9972c]/50 hover:border-[#c9972c]'
                    : 'bg-[#0c0c0c] border-[#f5f0e8]/8 hover:border-[#2aabbb]/40'
                }`}>
                  {p.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c9972c] text-[#0a0a0a] text-[10px] font-black tracking-widest uppercase px-3 py-1 whitespace-nowrap">
                      Most Impact
                    </div>
                  )}
                  <div style={{ color: p.accent }} className="mb-5">{p.icon}</div>
                  <p style={{ color: p.featured ? '#c9972c' : '#f5f0e8' }} className="font-black text-base uppercase tracking-wide mb-2">{p.tier}</p>
                  <p className="text-[#f5f0e8]/40 text-2xl font-black mb-6">{p.amount}</p>
                  <ul className="space-y-2 flex-grow mb-6">
                    {p.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2 text-[#f5f0e8]/50 text-xs">
                        <div style={{ backgroundColor: p.accent }} className="w-1 h-1 rounded-full flex-shrink-0" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* 5th card — Support the Mission */}
          <FadeIn delay={80}>
            <div className="relative bg-[#1a1000] border border-[#c9972c]/50 hover:border-[#c9972c] p-8 md:p-10 group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#c9972c]/10 mb-14 mt-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c9972c] text-[#0a0a0a] text-[10px] font-black tracking-widest uppercase px-4 py-1 whitespace-nowrap">
                Community Impact
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="text-[#c9972c] mb-5 transition-transform duration-300 group-hover:scale-110 origin-left">
                    <Heart size={40} />
                  </div>
                  <p className="text-[#c9972c] font-black text-2xl uppercase tracking-wide mb-2">Support the Mission</p>
                  <p className="text-[#f5f0e8]/40 text-4xl font-black mb-5">Any Amount</p>
                  <p className="text-[#f5f0e8]/60 text-sm leading-relaxed">
                    Support Vision Builders at any level and help provide mentorship opportunities, leadership development experiences, educational resources, and community impact initiatives.
                  </p>
                </div>
                <div>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Support mentorship programs',
                      'Help fund leadership experiences',
                      'Invest in future leaders',
                      'Every gift makes a difference',
                    ].map(perk => (
                      <li key={perk} className="flex items-center gap-3 text-[#f5f0e8]/65 text-sm">
                        <CheckCircle size={15} className="text-[#c9972c] flex-shrink-0" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setDonateOpen(true)}
                    className="inline-flex items-center gap-3 bg-[#c9972c] hover:bg-[#e0aa34] text-[#0a0a0a] font-black text-sm tracking-widest uppercase px-10 py-4 transition-all duration-200 hover:scale-105 shadow-lg shadow-[#c9972c]/25"
                  >
                    <Heart size={16} /> Donate Now
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="text-center mb-14">
              <button onClick={() => openModal('sponsor')} className="inline-flex items-center gap-3 bg-[#c9972c] hover:bg-[#e0aa34] text-[#0a0a0a] font-black text-sm tracking-widest uppercase px-12 py-5 transition-all duration-200 hover:scale-105 shadow-xl shadow-[#c9972c]/25">
                <Star size={16} /> Become a Founding Partner
              </button>
            </div>
          </FadeIn>

          {/* Founding Partner image */}
          <FadeIn delay={150}>
            <div className="relative overflow-hidden">
              <img
                src="/733fd0a5-813f-4e4f-aeb6-adee36fba2f5.jpeg"
                alt="Become a Founding Partner"
                className="w-full max-h-[480px] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                <p className="text-[#c9972c] font-black text-2xl md:text-3xl uppercase tracking-widest">Building a Legacy That Lasts.</p>
              </div>
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[#c9972c]" />
              <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-[#c9972c]" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── COMMUNITY SUPPORT ────────────────────────────── */}
      <section className="relative py-24 px-6 bg-[#0c1a1c] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #2aabbb 0, #2aabbb 1px, transparent 0, transparent 50%)', backgroundSize: '30px 30px' }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2aabbb]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2aabbb]/20 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="text-[#2aabbb] text-[11px] font-black tracking-[0.25em] uppercase mb-5">Get Involved</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#f5f0e8] mb-6 leading-tight">
              There Are Many Ways to <span className="text-[#2aabbb]">Build the Vision</span>
            </h2>
            <div className="w-14 h-1 bg-[#c9972c] mx-auto mb-8" />
            <p className="text-[#f5f0e8]/65 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-4">
              Whether you choose to sponsor, mentor, partner, volunteer, or donate, your involvement helps shape the next generation of leaders.
            </p>
            <p className="text-[#f5f0e8]/45 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-12">
              Vision Builders exists because people believe that every young man deserves guidance, opportunity, accountability, and a community that believes in his future.
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <button
                onClick={() => openModal('mentor')}
                className="inline-flex items-center justify-center gap-2 bg-[#2aabbb] hover:bg-[#1d8f9e] text-[#0a0a0a] font-black text-sm tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:scale-105"
              >
                <Handshake size={16} /> Become a Mentor
              </button>
              <button
                onClick={() => openModal('sponsor')}
                className="inline-flex items-center justify-center gap-2 border-2 border-[#c9972c] text-[#c9972c] hover:bg-[#c9972c] hover:text-[#0a0a0a] font-black text-sm tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:scale-105"
              >
                <Star size={16} /> Become a Founding Partner
              </button>
              <button
                onClick={() => openModal('attendee')}
                className="inline-flex items-center justify-center gap-2 border-2 border-[#f5f0e8]/25 text-[#f5f0e8] hover:border-[#f5f0e8]/60 font-black text-sm tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:scale-105"
              >
                <Utensils size={16} /> RSVP for Bros Brunch
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── IMPACT STATEMENT ─────────────────────────────── */}
      <section className="relative py-32 px-6 bg-[#060606] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#0a1010] to-[#060606]" />
        <div className="relative z-10 max-w-6xl mx-auto">

          {/* Section header */}
          <FadeIn>
            <div className="text-center mb-6">
              <p className="text-[#c9972c] text-[11px] font-black tracking-[0.25em] uppercase mb-4">Creating Lasting Change</p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#f5f0e8] mb-4">
                Your Investment <span className="text-[#2aabbb]">Creates Impact</span>
              </h2>
              <div className="w-14 h-1 bg-[#c9972c] mx-auto mb-8" />
              <p className="text-[#f5f0e8]/55 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                We are building the foundation now — and every sponsor, mentor, donor, and partner helps bring this vision to life.
              </p>
            </div>
          </FadeIn>

          {/* Two-column: checklist left, cards right */}
          <div className="grid lg:grid-cols-2 gap-14 items-start mt-16 mb-16">
            <FadeIn>
              <p className="text-[#f5f0e8]/45 text-[11px] font-black tracking-[0.2em] uppercase mb-7">
                Every investment in Vision Builders helps us:
              </p>
              <div className="space-y-4">
                {[
                  'Connect young men with mentors',
                  'Create leadership development experiences',
                  'Expand educational opportunities',
                  'Build confidence and character',
                  'Strengthen families and communities',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 border-b border-[#f5f0e8]/5 pb-4 last:border-0 group">
                    <div className="w-8 h-8 bg-[#0d1a1c] border border-[#c9972c]/30 group-hover:border-[#c9972c]/70 flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                      <CheckCircle size={15} className="text-[#c9972c]" />
                    </div>
                    <span className="text-[#f5f0e8]/70 group-hover:text-[#f5f0e8] font-semibold text-base transition-colors duration-200">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Impact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  title: 'Mentorship Access',
                  text: 'Creating meaningful connections between young men and mentors who can guide, encourage, and inspire their future.',
                  accent: '#2aabbb',
                  icon: <Users size={22} />,
                  delay: 80,
                },
                {
                  title: 'Leadership Development',
                  text: 'Providing opportunities for young men to develop confidence, character, communication skills, and leadership capacity.',
                  accent: '#c9972c',
                  icon: <TrendingUp size={22} />,
                  delay: 160,
                },
                {
                  title: 'Community Partnership',
                  text: 'Bringing together businesses, organizations, families, and community leaders to invest in the next generation.',
                  accent: '#2aabbb',
                  icon: <Globe size={22} />,
                  delay: 240,
                },
                {
                  title: 'Legacy Building',
                  text: 'Helping young men create a vision for their lives and build a legacy that impacts their families and communities.',
                  accent: '#c9972c',
                  icon: <Award size={22} />,
                  delay: 320,
                },
              ].map((card, i) => (
                <FadeIn key={i} delay={card.delay}>
                  <div
                    style={{ borderColor: card.accent + '22' }}
                    className="bg-[#0d1a1c] border hover:border-opacity-80 p-6 flex flex-col h-full group transition-all duration-300 hover:-translate-y-1"
                  >
                    <div style={{ color: card.accent }} className="mb-4 transition-transform duration-300 group-hover:scale-110 origin-left">
                      {card.icon}
                    </div>
                    <p style={{ color: card.accent }} className="font-black text-sm uppercase tracking-widest mb-3 leading-tight">
                      {card.title}
                    </p>
                    <div style={{ backgroundColor: card.accent }} className="w-8 h-0.5 mb-4" />
                    <p className="text-[#f5f0e8]/60 text-sm leading-relaxed flex-grow group-hover:text-[#f5f0e8]/80 transition-colors duration-200">
                      {card.text}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Quote block */}
          <FadeIn delay={100}>
            <div className="relative text-center py-14 px-6">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#c9972c] to-transparent mx-auto mb-10" />
              <p className="text-[#f5f0e8] text-xl md:text-2xl lg:text-3xl font-black leading-relaxed max-w-2xl mx-auto">
                "Every young man deserves someone who believes in his future."
              </p>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#c9972c] to-transparent mx-auto mt-10" />
            </div>
          </FadeIn>

          {/* Join the Movement CTA */}
          <FadeIn delay={120}>
            <div className="bg-[#0d1a1c] border border-[#2aabbb]/15 p-10 md:p-14 text-center">
              <p className="text-[#2aabbb] text-[11px] font-black tracking-[0.25em] uppercase mb-4">Take Action</p>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#f5f0e8] mb-4">
                Join the <span className="text-[#c9972c]">Movement</span>
              </h3>
              <div className="w-12 h-0.5 bg-[#c9972c] mx-auto mb-7" />
              <p className="text-[#f5f0e8]/60 text-base leading-relaxed max-w-2xl mx-auto mb-10">
                Whether you choose to mentor, sponsor, donate, volunteer, or partner with us, you become part of a movement committed to building stronger leaders, stronger families, and stronger communities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
                <button
                  onClick={() => openModal('mentor')}
                  className="inline-flex items-center justify-center gap-2 bg-[#2aabbb] hover:bg-[#1d8f9e] text-[#0a0a0a] font-black text-sm tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:scale-105 shadow-lg shadow-[#2aabbb]/20"
                >
                  <Handshake size={16} /> Become a Mentor
                </button>
                <button
                  onClick={() => openModal('sponsor')}
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#c9972c] text-[#c9972c] hover:bg-[#c9972c] hover:text-[#0a0a0a] font-black text-sm tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:scale-105"
                >
                  <Star size={16} /> Become a Founding Partner
                </button>
                <button
                  onClick={() => setDonateOpen(true)}
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#f5f0e8]/20 text-[#f5f0e8] hover:border-[#f5f0e8]/55 font-black text-sm tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:scale-105"
                >
                  <Heart size={16} /> Support the Mission
                </button>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* ── BECOME A MENTOR ──────────────────────────────── */}
      <section className="relative py-32 px-6 overflow-hidden bg-[#060606]">
        <div className="absolute inset-0">
          <img
            src="/5b768d9c-b925-4746-89ef-c06e1335755e.jpeg"
            alt=""
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-[#060606]/90" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <p className="text-[#2aabbb] text-[11px] font-black tracking-[0.25em] uppercase mb-5">Make an Impact</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#f5f0e8] leading-none mb-6">
              Become a <span className="text-[#2aabbb]">Mentor</span>
            </h2>
            <div className="w-14 h-1 bg-[#c9972c] mb-8" />
            <p className="text-[#f5f0e8] text-2xl md:text-3xl font-black mb-6 leading-tight">
              One conversation can change a life.
            </p>
            <p className="text-[#f5f0e8]/65 text-base leading-relaxed mb-10">
              Help young men build confidence, character, purpose, and leadership skills. You don't have to be perfect. You just have to be present.
            </p>
            <button onClick={() => openModal('mentor')} className="inline-flex items-center gap-3 bg-[#2aabbb] hover:bg-[#1d8f9e] text-[#0a0a0a] font-black text-sm tracking-widest uppercase px-10 py-5 transition-all duration-200 hover:scale-105 shadow-lg shadow-[#2aabbb]/25">
              <Handshake size={18} /> Become a Mentor
            </button>
          </FadeIn>

          <FadeIn delay={150}>
            <div>
              <div className="relative">
                <img
                  src="/5cd895b3-31d3-4359-a7b6-4821aaf61fe9.jpeg"
                  alt="Mentor and young man"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#2aabbb]" />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#c9972c]" />
              </div>
              <div className="border-l-4 border-[#2aabbb] pl-6 pt-5">
                <p className="text-[#f5f0e8]/80 text-sm italic">You don't have to be perfect.</p>
                <p className="text-[#2aabbb] font-black text-base uppercase tracking-wide">You just have to be present.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── QUOTE BAND ───────────────────────────────────── */}
      <section className="relative py-20 px-6 bg-[#2aabbb] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none select-none">
          <img src="/vb_only_silouette.png" alt="" className="h-72 w-auto" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-[#0a0a0a]/50 font-bold tracking-[0.2em] uppercase text-xs mb-6">Vision Builders™</p>
          <p className="text-[#0a0a0a] text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight">
            "Builders don't just talk about change.
          </p>
          <p className="text-[#0a1a1c]/70 text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight mt-2 leading-tight">
            Builders leave evidence."
          </p>
        </div>
      </section>

      {/* ── AWARENESS MATERIALS ──────────────────────────── */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-[960px] mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-[#2aabbb] text-[11px] font-black tracking-[0.25em] uppercase mb-3">Learn More</p>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#f5f0e8]">
                The Vision Builders<span className="text-[#2aabbb]">™</span> Story
              </h2>
              <div className="w-10 h-0.5 bg-[#c9972c] mx-auto mt-5" />
            </div>
          </FadeIn>

          <div className="flex flex-col items-center gap-16 md:gap-20">
            {[
              {
                src: '/vb_mission_vision.jpeg',
                alt: 'Vision Builders Mission and Vision',
                title: 'Mission & Vision',
                desc: 'The foundation of Vision Builders™ and the purpose behind the movement.',
                delay: 0,
                accent: '#2aabbb',
              },
              {
                src: '/sponsorship.jpeg',
                alt: 'Vision Builders Sponsorship Opportunities',
                title: 'Sponsorship Opportunities',
                desc: 'Ways partners and sponsors can invest in building future leaders.',
                delay: 80,
                accent: '#c9972c',
              },
              {
                src: '/initiative.jpeg',
                alt: 'Vision Builders Community Initiatives',
                title: 'Community Initiatives',
                desc: 'Programs and experiences that help young men build character, leadership, and legacy.',
                delay: 160,
                accent: '#2aabbb',
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={item.delay}>
                <div className="w-full flex flex-col items-center">
                  <div className="w-full border border-[#f5f0e8]/8 hover:border-[#2aabbb]/30 transition-colors duration-300 overflow-hidden shadow-2xl shadow-black/50">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-auto block"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div className="mt-6 text-center">
                    <p style={{ color: item.accent }} className="font-black text-sm uppercase tracking-widest mb-2">
                      {item.title}
                    </p>
                    <div style={{ backgroundColor: item.accent }} className="w-8 h-0.5 mx-auto mb-3" />
                    <p className="text-[#f5f0e8]/55 text-sm leading-relaxed max-w-lg mx-auto">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="bg-[#040404] border-t border-[#f5f0e8]/5 pt-20 pb-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-5">
              <img src="/footer.jpeg" alt="Vision Builders™" className="h-44 w-auto mb-6 opacity-90" />
              <div className="space-y-1 mb-6">
                <p className="text-[#f5f0e8]/50 text-sm font-semibold">Building Men.</p>
                <p className="text-[#f5f0e8]/50 text-sm font-semibold">Building Futures.</p>
                <p className="text-[#f5f0e8]/50 text-sm font-semibold">Building Communities.</p>
              </div>
              <p className="text-[#c9972c] font-black text-sm uppercase tracking-widest">Bring a Bro. Build a Legacy.</p>
            </div>

            {/* Links */}
            <div className="md:col-span-3">
              <p className="text-[#f5f0e8] font-black text-xs tracking-widest uppercase mb-6 pb-3 border-b border-[#f5f0e8]/10">Get Involved</p>
              <div className="space-y-4">
                {([
                  { label: 'RSVP for Bros Brunch', type: 'attendee' },
                  { label: 'Become a Mentor', type: 'mentor' },
                  { label: 'Become a Founding Partner', type: 'sponsor' },
                ] as { label: string; type: ModalType }[]).map((link) => (
                  <button key={link.label} onClick={() => openModal(link.type)} className="flex items-center gap-2 text-[#f5f0e8]/45 hover:text-[#2aabbb] text-sm font-semibold transition-colors duration-200 group">
                    <ArrowRight size={13} className="text-[#2aabbb]/0 group-hover:text-[#2aabbb] transition-all duration-200" />
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Blueprint */}
            <div className="md:col-span-4">
              <p className="text-[#f5f0e8] font-black text-xs tracking-widest uppercase mb-6 pb-3 border-b border-[#f5f0e8]/10">The Blueprint</p>
              <div className="space-y-3">
                {[
                  { icon: <Hammer size={14} />, label: 'Build Me' },
                  { icon: <Target size={14} />, label: 'Build My Future' },
                  { icon: <Heart size={14} />, label: 'Build My Community' },
                  { icon: <Shield size={14} />, label: 'Mission First Initiative™' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-[#f5f0e8]/40 text-sm font-semibold">
                    <div className="text-[#2aabbb]/60">{item.icon}</div>
                    {item.label}
                  </div>
                ))}
              </div>

              <div className="mt-8 border border-[#c9972c]/20 p-5">
                <p className="text-[#c9972c] font-black text-xs uppercase tracking-widest mb-1">Est. 2026</p>
                <p className="text-[#f5f0e8]/50 text-xs leading-relaxed">A movement dedicated to helping men and young men build stronger futures.</p>
              </div>
            </div>
          </div>

          {/* CTA Row */}
          <div className="border-t border-[#f5f0e8]/5 pt-10 mb-10">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => openModal('attendee')} className="bg-[#2aabbb] hover:bg-[#1d8f9e] text-[#0a0a0a] font-black text-xs tracking-widest uppercase px-8 py-3.5 transition-all duration-200 text-center">RSVP for Bros Brunch</button>
              <button onClick={() => openModal('mentor')} className="border border-[#c9972c]/50 text-[#c9972c] hover:bg-[#c9972c]/10 font-black text-xs tracking-widest uppercase px-8 py-3.5 transition-all duration-200 text-center">Become a Mentor</button>
              <button onClick={() => openModal('sponsor')} className="border border-[#f5f0e8]/15 text-[#f5f0e8]/60 hover:text-[#f5f0e8] hover:border-[#f5f0e8]/40 font-black text-xs tracking-widest uppercase px-8 py-3.5 transition-all duration-200 text-center">Founding Partner</button>
            </div>
          </div>

          <div className="border-t border-[#f5f0e8]/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#f5f0e8]/20 text-xs tracking-widest uppercase">© 2026 Vision Builders™. All rights reserved.</p>
            <p className="text-[#c9972c] font-black text-xs tracking-widest uppercase">We Build Together.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
