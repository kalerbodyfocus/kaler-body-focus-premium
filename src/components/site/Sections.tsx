import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, ElementType } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  Dumbbell,
  Heart,
  Instagram,
  Facebook,
  Mail,
  MapPin,
  MessageCircle,
  Trophy,
  Target,
  Brain,
  Activity,
  Apple,
  Shield,
  Clock,
  Star,
  Quote,
} from "lucide-react";
import { Reveal, Counter } from "./Reveal";
import { WHATSAPP, CONTACT_EMAIL, FACEBOOK_URL, INSTAGRAM_URL } from "./Floating";
import Logo from "./Logo";
import { SITE_CONFIG } from "@/config/site-config";
import { SiteSettings, TestimonialItem, TransformationItem, GoogleReview } from "@/lib/sanity";
import hero from "@/assets/hero.jpg";
import founder from "@/assets/founder.jpg";
import gym from "@/assets/gym.jpg";
import training from "@/assets/training.jpg";
import online from "@/assets/online.jpg";
import logoFull from "@/assets/logo-full.png";

export function Hero({ settings }: { settings?: SiteSettings }) {
  const locationText = settings?.locationText || "Christchurch · New Zealand";
  const heroPrimaryCta = settings?.heroPrimaryCta || SITE_CONFIG.cta.heroPrimary;
  const heroSecondaryCta = settings?.heroSecondaryCta || SITE_CONFIG.cta.heroSecondary;
  const freeConsultationAlert = settings?.freeConsultationAlert || SITE_CONFIG.cta.heroSupport;

  const titleLine1 = settings?.heroTitleLine1 || "Train With";
  const titleLine2 = settings?.heroTitleLine2 || "Focus.";
  const titleLine3 = settings?.heroTitleLine3 || "Not Frustration.";
  const description = settings?.heroDescription || "Get a coach who builds your plan, your way — and actually stays with you. Evidence-based training, real nutrition strategy, and accountability that delivers measurable results.";

  const stat1Value = settings?.heroStat1Value !== undefined ? settings.heroStat1Value : 500;
  const stat1Suffix = settings?.heroStat1Suffix !== undefined ? settings.heroStat1Suffix : "+";
  const stat1Label = settings?.heroStat1Label || "Sessions Delivered";

  const stat2Value = settings?.heroStat2Value !== undefined ? settings.heroStat2Value : 98;
  const stat2Suffix = settings?.heroStat2Suffix !== undefined ? settings.heroStat2Suffix : "%";
  const stat2Label = settings?.heroStat2Label || "Client Satisfaction";

  const stat3Value = settings?.heroStat3Value !== undefined ? settings.heroStat3Value : 7;
  const stat3Suffix = settings?.heroStat3Suffix !== undefined ? settings.heroStat3Suffix : "+";
  const stat3Label = settings?.heroStat3Label || "Years Coaching";

  const stats = [
    { v: stat1Value, s: stat1Suffix, l: stat1Label },
    { v: stat2Value, s: stat2Suffix, l: stat2Label },
    { v: stat3Value, s: stat3Suffix, l: stat3Label },
  ];

  return (
    <section id="home" className="relative min-h-[100svh] flex items-start md:items-end overflow-hidden isolate">
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 -z-10"
      >
        <img
          src={settings?.heroImage || hero}
          alt="Athlete training in a premium gym"
          fetchPriority="high"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-ink/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/30 to-ink/60" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_30%,oklch(0.78_0.13_84/0.18),transparent_55%)]" />
      <div className="absolute inset-0 -z-10 [box-shadow:inset_0_0_220px_60px_oklch(0.04_0_0)]" />

      <motion.div
        aria-hidden
        animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -z-10 right-[8%] top-[18%] w-[42vw] h-[42vw] rounded-full bg-gold/15 blur-[120px] pointer-events-none"
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -z-10 left-[-10%] bottom-[10%] w-[36vw] h-[36vw] rounded-full bg-amber-500/10 blur-[140px] pointer-events-none"
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="container-px relative w-full pb-20 md:pb-28 pt-[88px] sm:pt-28 md:pt-32">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
          }}
          className="max-w-4xl"
        >
          <motion.span
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className="eyebrow inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.28em]"
          >
            <span className="w-6 sm:w-8 h-px bg-gold shrink-0" />
            <span className="whitespace-nowrap">{locationText}</span>
          </motion.span>
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-display font-black text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.95] tracking-tight drop-shadow-[0_6px_30px_rgba(0,0,0,0.55)]"
          >
            {titleLine1} <span className="text-gold-gradient italic">{titleLine2}</span>
            <br />
            {titleLine3}
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl leading-relaxed"
          >
            {description}
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7 }}
            className="mt-9 flex flex-col sm:flex-row sm:items-start gap-5"
          >
            <div className="flex flex-col items-start gap-2">
              <a href="#inquiry" className="btn-gold btn-gold-hover">
                {heroPrimaryCta} <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-xs text-muted-foreground/80 pl-2">{freeConsultationAlert}</span>
            </div>
            <a href="#online" className="btn-ghost btn-ghost-hover">
              {heroSecondaryCta}
            </a>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8 }}
            className="mt-14 grid grid-cols-3 max-w-xl gap-6 sm:gap-10"
          >
            {stats.map((s, i) => (
              <div key={i}>
                <div className="text-3xl sm:text-4xl font-display font-bold text-gold">
                  <Counter to={s.v} suffix={s.s} />
                </div>
                <div className="text-[11px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-gold transition-colors cursor-pointer"
        aria-label="Scroll to About Coach section"
      >
        Scroll <ChevronDown className="w-4 h-4" />
      </motion.a>
    </section>
  );
}

export function TrustBar({ settings }: { settings?: SiteSettings }) {
  if (settings && (!settings.trustBarItems || settings.trustBarItems.length === 0)) {
    return null;
  }

  const items = settings?.trustBarItems && settings.trustBarItems.length > 0
    ? settings.trustBarItems
    : SITE_CONFIG.trustBar;
  return (
    <section className="border-y border-white/5 bg-surface/50 py-5 overflow-hidden">
      <div className="flex gap-12 whitespace-nowrap animate-[scroll_38s_linear_infinite]">
        {[...items, ...items, ...items].map((t, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-foreground/70 shrink-0">
            <Check className="w-4 h-4 text-gold" /> {t}
          </div>
        ))}
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0) } to { transform: translateX(-33.33%) } }`}</style>
    </section>
  );
}

export function About({ settings }: { settings?: SiteSettings }) {
  const title = settings?.aboutTitle || "Ranjit Singh.";
  const subtitle = settings?.aboutSubtitle || "Built to Coach.";
  const paragraph1 = settings?.aboutParagraph1 || "I'm Ranjit Singh, Founder of Kaler Body Focus and a Personal Trainer based in New Zealand. I work with busy professionals, parents, and everyday people tired of wasting time on programs that don't deliver lasting results.";
  const paragraph2 = settings?.aboutParagraph2 || "My coaching combines evidence-based training, practical nutrition strategies, accountability, and personalized support to build stronger bodies, healthier lifestyles, and long-term confidence.";
  const tags = settings?.aboutTags && settings.aboutTags.length > 0
    ? settings.aboutTags
    : ["No shortcuts", "No crash diets", "No generic programs"];
  const statValue = settings?.aboutStatValue || "7+";
  const statLabel = settings?.aboutStatLabel || "Years transforming busy professionals & parents";
  const image = settings?.aboutImage || founder;

  return (
    <section id="about" className="py-24 md:py-36 relative">
      <div className="container-px grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-gold/30 to-transparent blur-2xl opacity-40" />
            <div className="relative overflow-hidden rounded-3xl gold-border group">
              <motion.img
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                src={image}
                alt="Ranjit Singh — Founder of Kaler Body Focus"
                width={1024}
                height={1024}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 sm:right-6 card-surface p-5 max-w-[220px]">
              <div className="text-2xl font-display font-bold text-gold">{statValue}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {statLabel}
              </div>
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <span className="eyebrow">Meet Your Coach</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl leading-[1.02]">
              {title}
              <br />
              <span className="text-gold-gradient">{subtitle}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-7 space-y-5 text-foreground/75 leading-relaxed text-base sm:text-lg max-w-xl">
              <p>{paragraph1}</p>
              {paragraph2 && <p>{paragraph2}</p>}
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span key={t} className="px-4 py-2 rounded-full gold-border text-sm text-gold">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Personal({ settings }: { settings?: SiteSettings }) {
  const locationText = settings?.locationText || SITE_CONFIG.location;
  const title = settings?.personalTitle || "Personal Coaching.";
  const subtitle = settings?.personalSubtitle || "Personalized Results.";
  const description = settings?.personalDescription || "Train directly with Ranjit Singh in {locationText}. Every session is tailored to your body, your goals, and your life.";

  const includes = settings?.personalIncludes && settings.personalIncludes.length > 0
    ? settings.personalIncludes
    : [
        "Personalized training plans",
        "Goal-based programming",
        "Exercise technique coaching",
        "Progress tracking",
        "Accountability support",
        "Nutrition guidance",
        "Injury prevention strategies",
        "Ongoing program adjustments",
      ];
  const ideal = settings?.personalIdealFor && settings.personalIdealFor.length > 0
    ? settings.personalIdealFor
    : [
        "Beginners",
        "Busy professionals",
        "Weight loss clients",
        "Muscle building clients",
        "Strength-focused clients",
      ];

  return (
    <section id="personal" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={settings?.personalImage || gym} alt="" loading="lazy" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
      </div>
      <div className="container-px">
        <Reveal>
          <span className="eyebrow">1-on-1 Personal Training</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl max-w-3xl leading-[1.02]">
            {title} <span className="text-gold-gradient">{subtitle}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 text-foreground/70 max-w-2xl text-lg">
            {description.replace("{locationText}", locationText)}
          </p>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-[1.3fr_1fr] gap-8">
          <Reveal>
            <div className="card-surface p-8 md:p-10">
              <h3 className="font-display text-2xl font-bold mb-7 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gold/15 grid place-items-center">
                  <Check className="w-4 h-4 text-gold" />
                </span>
                What's Included
              </h3>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                {includes.map((i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-foreground/85">
                    <ChevronRight className="w-4 h-4 text-gold shrink-0 mt-0.5" /> {i}
                  </div>
                ))}
              </div>
              <a href="#inquiry" className="btn-gold btn-gold-hover mt-10">
                {SITE_CONFIG.cta.personalPrimary} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="card-surface p-8 md:p-10 h-full">
              <h3 className="font-display text-2xl font-bold mb-7 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gold/15 grid place-items-center">
                  <Target className="w-4 h-4 text-gold" />
                </span>
                Ideal For
              </h3>
              <ul className="space-y-3">
                {ideal.map((i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-foreground/85 py-2 border-b border-white/5 last:border-0"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Online({ settings }: { settings?: SiteSettings }) {
  const titleRaw = settings?.onlineTitle || "Professional Coaching";
  const subtitleRaw = settings?.onlineSubtitle || "Wherever You Are.";
  const description = settings?.onlineDescription || "Coaching that travels with you — built for results no matter your time zone, schedule, or equipment.";

  const rawFeatures = settings?.onlineFeatures && settings.onlineFeatures.length > 0
    ? settings.onlineFeatures
    : [
        "Customized training plans",
        "Nutrition guidance",
        "WhatsApp support",
        "Weekly check-ins",
        "Progress monitoring",
        "Video exercise guidance",
        "Goal tracking",
        "Lifestyle coaching",
      ];

  const icons = [Activity, Apple, MessageCircle, Clock, Target, Dumbbell, Trophy, Brain];
  const features = rawFeatures.map((t, idx) => ({
    i: icons[idx % icons.length] || Activity,
    t,
  }));

  const image = settings?.onlineImage || online;

  return (
    <section id="online" className="py-24 md:py-36">
      <div className="container-px grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <div className="order-2 lg:order-1">
          <Reveal>
            <span className="eyebrow">Online Coaching</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl leading-[1.02]">
              {titleRaw} <span className="text-gold-gradient">{subtitleRaw}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-foreground/70 text-lg max-w-xl">
              {description}
            </p>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 gap-3">
            {features.map((f, i) => (
              <Reveal key={f.t} delay={0.05 * i}>
                <div className="flex items-center gap-3 p-4 rounded-xl border border-white/8 bg-white/[0.02] hover:border-gold/40 transition-colors">
                  <span className="w-9 h-9 rounded-lg bg-gold/15 grid place-items-center shrink-0">
                    <f.i className="w-4 h-4 text-gold" />
                  </span>
                  <span className="text-sm text-foreground/85">{f.t}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <a href="#inquiry" className="btn-gold btn-gold-hover mt-10">
              Start Online Coaching <ArrowRight className="w-4 h-4" />
            </a>
          </Reveal>
        </div>
        <Reveal className="order-1 lg:order-2">
          <div className="relative aspect-[3/2] rounded-3xl overflow-hidden gold-border group">
            <motion.img
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              src={image}
              alt="Online coaching"
              width={1200}
              height={1500}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 card-surface p-5">
              <div className="text-xs uppercase tracking-widest text-gold">Live · Worldwide</div>
              <div className="mt-1 text-lg font-display font-semibold">
                Coaching from anywhere in the world.
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { ServiceItem } from "@/lib/sanity";

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const iconMap: Record<string, ElementType> = {
    Dumbbell,
    Activity,
    Target,
    Trophy,
    Shield,
    Apple,
    Heart,
    Brain,
    Star,
    Clock,
    ChevronRight,
  };
  const IconComponent = iconMap[name] || Dumbbell;
  return <IconComponent className={className} />;
}

export function Services({ items = SITE_CONFIG.services }: { items?: ServiceItem[] }) {
  return (
    <section id="services" className="py-24 md:py-36 bg-surface/30 border-y border-white/5">
      <div className="container-px">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <Reveal>
              <span className="eyebrow">Services</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl leading-[1.02] max-w-2xl">
                Every kind of coaching, <span className="text-gold-gradient">one standard.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="text-foreground/65 max-w-sm">
              A complete coaching system designed around your goals, your body, and your schedule.
            </p>
          </Reveal>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((s, i) => (
            <Reveal key={s.title} delay={0.04 * i}>
              <div className="group card-surface p-7 h-full hover:border-gold/40 transition-all hover:-translate-y-1 duration-300">
                <span className="w-12 h-12 rounded-xl bg-gold/15 grid place-items-center mb-5 group-hover:bg-gold group-hover:text-ink transition-colors">
                  <ServiceIcon name={s.icon} className="w-5 h-5 text-gold group-hover:text-ink transition-colors" />
                </span>
                <h3 className="font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-foreground/65 leading-relaxed">{s.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Transformations({
  items = SITE_CONFIG.transformations,
}: {
  items?: TransformationItem[];
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const total = items.length;
  const GAP = 16;

  // Determine how many items are visible based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 640) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(total / visibleCount);

  // Auto-advance pages every 4 seconds
  useEffect(() => {
    if (paused || totalPages <= 1) return;
    const id = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 4000);
    return () => clearInterval(id);
  }, [paused, totalPages]);

  const prev = () => setCurrentPage((p) => (p - 1 + totalPages) % totalPages);
  const next = () => setCurrentPage((p) => (p + 1) % totalPages);

  return (
    <section
      id="transformations"
      className="py-24 md:py-36 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container-px">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal><span className="eyebrow">Success Stories</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl">
              Real People. <span className="text-gold-gradient">Real Results.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-foreground/65">
              Weight loss, muscle gain, strength gains and real lifestyle change — built one client at a time.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Paginated track */}
      <div className="mt-14 relative container-px">
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `calc(-${currentPage * 100}% - ${currentPage * GAP}px)` }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ gap: GAP }}
          >
            {items.map((c, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden card-surface border border-white/5 hover:border-gold/30 transition-colors duration-300 shrink-0"
                style={{
                  width: `calc((100% - ${(visibleCount - 1) * GAP}px) / ${visibleCount})`,
                  minWidth: visibleCount === 1 ? "100%" : "290px",
                  minHeight: 440,
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.78_0.13_84/0.18),transparent_60%)] pointer-events-none" />
                {c.beforeImage && c.afterImage ? (
                  <div className="absolute inset-0 grid grid-cols-2">
                    <div className="relative border-r border-white/5 h-full overflow-hidden bg-surface flex items-center justify-center">
                      <img src={c.beforeImage} alt="Before" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] uppercase tracking-wider text-white font-semibold z-10 select-none">Before</div>
                    </div>
                    <div className="relative h-full overflow-hidden bg-surface flex items-center justify-center">
                      <img src={c.afterImage} alt="After" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-gold/90 backdrop-blur-sm text-[10px] uppercase tracking-wider text-black font-bold z-10 select-none">After</div>
                    </div>
                  </div>
                ) : (c.beforeImage || c.afterImage) ? (
                  <div className="absolute inset-0 overflow-hidden bg-zinc-950 flex items-center justify-center">
                    <img src={c.beforeImage || c.afterImage} alt={c.text || 'Transformation'} loading="lazy" className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-700" />
                  </div>
                ) : (
                  <div className="absolute inset-0 grid grid-cols-2">
                    <div className="relative border-r border-white/5 h-full overflow-hidden bg-surface flex items-center justify-center">
                      <span className="text-xs uppercase tracking-widest text-muted-foreground/80 font-medium">Before</span>
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] uppercase tracking-wider text-white font-semibold z-10 select-none">Before</div>
                    </div>
                    <div className="relative h-full overflow-hidden bg-surface flex items-center justify-center">
                      <span className="text-xs uppercase tracking-widest text-gold font-medium">After</span>
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-gold/90 backdrop-blur-sm text-[10px] uppercase tracking-wider text-black font-bold z-10 select-none">After</div>
                    </div>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-ink via-ink/90 to-transparent pointer-events-none">
                  <div className="text-xs uppercase tracking-widest text-gold font-bold">{c.tag}</div>
                  <div className="mt-1 font-display text-2xl font-bold tracking-tight text-white">{c.value}</div>
                  <div className="text-xs text-foreground/80 mt-1 font-medium leading-relaxed">{c.text}</div>
                  {c.clientName && (
                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center shrink-0">
                        <span className="text-[11px] font-black text-gold leading-none">{c.clientName.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="text-[12px] font-bold text-white leading-tight">{c.clientName}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, k) => (
              <button
                key={k}
                onClick={() => { setCurrentPage(k); setPaused(true); }}
                aria-label={`Go to page ${k + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  k === currentPage ? 'w-8 bg-gold' : 'w-3 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { prev(); setPaused(true); }}
              aria-label="Previous page"
              className="w-11 h-11 rounded-full border border-white/15 grid place-items-center hover:border-gold/50 hover:bg-gold/5 transition-all"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <button
              onClick={() => { next(); setPaused(true); }}
              aria-label="Next page"
              className="w-11 h-11 rounded-full border border-white/15 grid place-items-center hover:border-gold/50 hover:bg-gold/5 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const testimonialsData: TestimonialItem[] = [
  {
    id: "testimonial-1",
    clientName: "Judith",
    clientRole: "Functional Fitness Client",
    transformationSummary: "Improved Strength & Balance over 16 Months",
    testimonialText:
      "I've been training with Ranjit for 16 months. When I started, my goal was to increase my upper body muscle strength and improve my balance. It has worked really well for me, and I've seen massive improvements.",
    videoUrl: "/testimonial1.mp4",
    thumbnail: "/assets/online.jpg",
  },
  {
    id: "testimonial-2",
    clientName: "James K.",
    clientRole: "Father of Two",
    transformationSummary: "Gym Consistency & Strength Gains",
    testimonialText:
      "I've worked with three trainers before Kaler Body Focus. The difference is the accountability — he actually shows up for you.",
    videoUrl: "",
    thumbnail: "",
  },
  {
    id: "testimonial-3",
    clientName: "Priya N.",
    clientRole: "First-Time Lifter",
    transformationSummary: "Squatting Double Her Starting Weight",
    testimonialText:
      "I came in nervous. Ranjit built my confidence rep by rep. I'm now squatting double what I started with.",
    videoUrl: "",
    thumbnail: "",
  },
  {
    id: "testimonial-4",
    clientName: "Tom R.",
    clientRole: "Online Client (UK)",
    transformationSummary: "Accountability & Technique Mastery",
    testimonialText:
      "Online coaching done right. Weekly check-ins, video reviews, real-time WhatsApp support. Best investment of the year.",
    videoUrl: "",
    thumbnail: "",
  },
];

export function Testimonials({ items = SITE_CONFIG.testimonials }: { items?: TestimonialItem[] }) {
  const [i, setI] = useState(0);
  const active = items[i] || items[0];

  return (
    <section id="testimonials" className="py-24 md:py-36 bg-surface/30 border-y border-white/5">
      <div className="container-px">
        <Reveal>
          <span className="eyebrow">Client Reviews</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl max-w-3xl">
            What clients <span className="text-gold-gradient">actually say.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-[1.2fr_1fr] gap-6">
          <Reveal>
            <div className="card-surface p-8 md:p-12 relative min-h-[320px] h-full flex flex-col justify-between">
              <div>
                <Quote className="w-10 h-10 text-gold/30 mb-6" />
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl md:text-2xl font-display leading-relaxed"
                >
                  "{active.testimonialText}"
                </motion.p>
              </div>
              <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="font-bold">{active.clientName}</div>
                  <div className="text-sm text-muted-foreground">{active.clientRole}</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setI((prev) => (prev - 1 + items.length) % items.length)}
                    aria-label="Previous testimonial"
                    className="w-8 h-8 rounded-full border border-white/10 grid place-items-center hover:border-gold/50 hover:bg-gold/5 transition-all"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                  </button>
                  <div className="flex gap-2">
                    {items.map((_, k) => (
                      <button
                        key={k}
                        onClick={() => setI(k)}
                        aria-label={`Testimonial ${k + 1}`}
                        className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-gold" : "w-3 bg-white/20"}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setI((prev) => (prev + 1) % items.length)}
                    aria-label="Next testimonial"
                    className="w-8 h-8 rounded-full border border-white/10 grid place-items-center hover:border-gold/50 hover:bg-gold/5 transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="h-full"
                >
                  {active.videoUrl ? (
                    <div className="card-surface p-6 sm:p-8 h-full flex flex-col justify-between border border-white/5">
                      <div>
                        <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-4">
                          Video Testimonial
                        </span>
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                          <video
                            src={active.videoUrl}
                            poster={active.thumbnail || undefined}
                            controls
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="mt-6">
                          <div className="text-xs uppercase tracking-widest text-gold font-semibold">
                            {active.transformationSummary}
                          </div>
                          <p className="mt-2 text-foreground/75 text-sm leading-relaxed">
                            Watch {active.clientName}'s journey and results in their own words.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="card-surface p-8 h-full flex flex-col justify-center items-center text-center min-h-[340px] border border-gold/15 shadow-[0_20px_50px_rgba(0,0,0,0.9),_0_0_30px_rgba(212,175,55,0.02)]">
                      {/* Center Play Icon with Coming Soon overlay */}
                      <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 grid place-items-center mb-6 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                        <div className="w-0 h-0 border-l-[12px] border-l-gold/40 border-y-[8px] border-y-transparent ml-1" />
                      </div>

                      <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-2">
                        Video Testimonial
                      </span>

                      <h4 className="font-display text-xl font-extrabold text-foreground tracking-tight">
                        Coming Soon
                      </h4>

                      <p className="mt-3 text-foreground/60 text-sm max-w-sm leading-relaxed">
                        Client video will be available soon. Continue reading the written
                        transformation story.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}


export function Reviews({ settings, googleReviews = [] }: { settings?: SiteSettings; googleReviews?: GoogleReview[] }) {
  const AmpIframe = "amp-iframe" as ElementType;
  const widgetId = settings?.googleReviewsWidgetId || SITE_CONFIG.googleReviewsWidgetId || import.meta.env.VITE_TRUSTINDEX_WIDGET_ID;
  const widgetUrl =
    settings?.googleReviewsWidgetUrl || SITE_CONFIG.googleReviewsWidgetUrl || import.meta.env.VITE_TRUSTINDEX_WIDGET_URL;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!widgetId || !containerRef.current || (googleReviews && googleReviews.length > 0)) return;

    // Clear previous contents
    containerRef.current.innerHTML = "";

    const isElfsight = widgetId.includes("-");

    if (isElfsight) {
      // Create Elfsight widget container
      const elfsightDiv = document.createElement("div");
      elfsightDiv.className = `elfsight-app-${widgetId}`;
      elfsightDiv.setAttribute("data-elfsight-app-lazy", "");
      containerRef.current.appendChild(elfsightDiv);

      // Load Elfsight platform script globally if not already loaded
      if (!document.querySelector('script[src*="static.elfsight.com"]')) {
        const script = document.createElement("script");
        script.src = "https://static.elfsight.com/platform/platform.js";
        script.defer = true;
        script.async = true;
        document.body.appendChild(script);
      }
    } else {
      // Create and append Trustindex loader script
      const script = document.createElement("script");
      script.src = `https://cdn.trustindex.io/loader.js?${widgetId}`;
      script.defer = true;
      script.async = true;
      containerRef.current.appendChild(script);
    }
  }, [widgetId, googleReviews]);

  return (
    <section id="reviews" className="py-24 md:py-36">
      <div className="container-px">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10 items-start">
          <Reveal>
            <div>
              <span className="eyebrow">Google Reviews</span>
              <h2 className="mt-4 font-display font-black text-4xl md:text-5xl">
                Trusted on Google.
              </h2>
              <div className="mt-6 flex items-end gap-3">
                <div className="text-6xl font-display font-black text-gold">5.0</div>
                <div className="mb-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Based on verified Google reviews
                  </div>
                </div>
              </div>
              <p className="mt-5 text-foreground/65 text-sm">
                Verified client feedback from our Google Business Profile.
              </p>
              <a
                href={SITE_CONFIG.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold btn-gold-hover mt-6 inline-flex text-xs !py-2.5 !px-5"
              >
                Write or View Reviews
              </a>
            </div>
          </Reveal>
          <div className="w-full">
            {googleReviews && googleReviews.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {googleReviews.map((r, k) => (
                  <Reveal key={k} delay={0.05 * k}>
                    <div className="card-surface p-6 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          {r.avatar ? (
                            <img src={r.avatar} alt={r.author} className="w-8 h-8 rounded-full object-cover" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[11px] font-bold text-gold uppercase">
                              {r.author ? r.author[0] : "A"}
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-semibold text-foreground leading-none">{r.author}</div>
                            <div className="text-[10px] text-muted-foreground mt-1.5">{r.timeDescription}</div>
                          </div>
                        </div>
                        <div className="flex gap-0.5 mb-3">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                          ))}
                        </div>
                        <p className="text-sm text-foreground/80 leading-relaxed">"{r.text}"</p>
                      </div>
                      <div className="mt-4 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Verified Google Review
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : widgetId ? (
              <Reveal>
                <div ref={containerRef} className="w-full min-h-[150px]" />
              </Reveal>
            ) : widgetUrl ? (
              <Reveal>
                <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A]/50">
                  <AmpIframe
                    src={widgetUrl}
                    width="auto"
                    height="400"
                    layout="fixed-height"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                    className="w-full min-h-[400px] border-0"
                  >
                    <div
                      {...{ placeholder: "" }}
                      className="absolute inset-0 grid place-items-center text-sm text-muted-foreground bg-black/90"
                    >
                      Loading Google Reviews...
                    </div>
                  </AmpIframe>
                </div>
              </Reveal>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    n: "Alex P.",
                    q: "Best PT in Christchurch. Tailored, professional, results-driven.",
                  },
                  {
                    n: "Mia L.",
                    q: "Patient with beginners. Ranjit makes the gym feel approachable.",
                  },
                  { n: "David T.", q: "Online coaching is on point. Worth every cent." },
                  {
                    n: "Emma S.",
                    q: "Honest, knowledgeable, and genuinely invested in your progress.",
                  },
                ].map((r, k) => (
                  <Reveal key={k} delay={0.05 * k}>
                    <div className="card-surface p-6">
                      <div className="flex gap-0.5 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                        ))}
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed">"{r.q}"</p>
                      <div className="mt-4 text-xs text-muted-foreground">— {r.n}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const steps = [
    { t: "Book Consultation", d: "A free no-pressure call to understand your goals." },
    { t: "Assessment", d: "Movement, lifestyle and nutrition baseline." },
    { t: "Custom Plan", d: "A program built exclusively around your reality." },
    { t: "Weekly Coaching", d: "Check-ins, accountability, adjustments — every week." },
    { t: "Results", d: "Measurable, sustainable, life-changing." },
  ];
  return (
    <section id="process" className="py-24 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={training}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>
      <div className="container-px">
        <Reveal>
          <span className="eyebrow">Coaching Process</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl max-w-3xl">
            From day one to <span className="text-gold-gradient">your best self.</span>
          </h2>
        </Reveal>

        <div className="mt-16 relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
          <div className="space-y-10">
            {steps.map((s, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <div
                  className={`relative grid md:grid-cols-2 gap-6 md:gap-12 items-center ${i % 2 ? "md:[direction:rtl]" : ""}`}
                >
                  <div className="md:[direction:ltr] pl-16 md:pl-0">
                    <div className="card-surface p-6 md:p-8 inline-block w-full">
                      <div className="text-xs uppercase tracking-widest text-gold">
                        Step {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="mt-2 font-display text-2xl md:text-3xl font-bold">{s.t}</h3>
                      <p className="mt-3 text-foreground/65">{s.d}</p>
                    </div>
                  </div>
                  <div className="hidden md:block" />
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-ink border-2 border-gold grid place-items-center font-display font-bold text-gold">
                    {i + 1}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FAQ({ items = SITE_CONFIG.faq }: { items?: Array<{ q: string; a: string }> }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 md:py-36 bg-surface/30 border-y border-white/5">
      <div className="container-px grid lg:grid-cols-[1fr_1.4fr] gap-12">
        <Reveal>
          <div>
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-4 font-display font-black text-4xl md:text-5xl leading-[1.05]">
              Answers, <span className="text-gold-gradient">not assumptions.</span>
            </h2>
            <p className="mt-5 text-foreground/65">
              Still wondering? Reach out directly on WhatsApp — Ranjit answers personally.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost btn-ghost-hover mt-6 inline-flex"
            >
              <MessageCircle className="w-4 h-4" /> Message on WhatsApp
            </a>
          </div>
        </Reveal>
        <div className="space-y-3">
          {items.map((it, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <div className="card-surface overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                  aria-expanded={open === i}
                >
                  <span className="font-display font-semibold text-base sm:text-lg">{it.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 sm:px-6 pb-6 text-foreground/70 leading-relaxed">{it.a}</p>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Social() {
  return (
    <section className="py-24 md:py-36">
      <div className="container-px">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <Reveal>
              <span className="eyebrow">Instagram · @kalerbodyfocus</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl">
                Follow The <span className="text-gold-gradient">Journey.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold btn-gold-hover"
            >
              <Instagram className="w-4 h-4" /> Follow on Instagram
            </a>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Reveal key={i} delay={0.03 * i}>
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-xl card-surface block"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.78_0.13_84/0.18),transparent_70%)]" />
                <div className="absolute inset-0 grid place-items-center text-muted-foreground">
                  <Instagram className="w-8 h-8 opacity-30 group-hover:opacity-80 group-hover:text-gold transition-all" />
                </div>
                <div className="absolute bottom-2 left-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                  Post 0{i + 1}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact({ settings }: { settings?: SiteSettings }) {
  const whatsAppNumber = settings?.whatsAppNumber || SITE_CONFIG.whatsAppNumber;
  const whatsAppUrl = settings?.whatsAppNumber
    ? `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent("Hi Ranjit, I'm interested in coaching.")}`
    : SITE_CONFIG.whatsAppUrl;
  const contactEmail = settings?.contactEmail || SITE_CONFIG.contactEmail;
  const locationText = settings?.locationText || SITE_CONFIG.location;

  const contactTitleRaw = settings?.contactTitle || "Let's | talk training.";
  const titleParts = contactTitleRaw.split("|");
  const contactDescription = settings?.contactDescription || "Reach out directly — Ranjit responds personally to every inquiry.";

  return (
    <section id="contact" className="py-24 md:py-36 bg-surface/30 border-y border-white/5">
      <div className="container-px grid lg:grid-cols-2 gap-12">
        <Reveal>
          <div>
            <span className="eyebrow">Contact</span>
            <h2 className="mt-4 font-display font-black text-4xl md:text-5xl leading-[1.05]">
              {titleParts[0]}
              {titleParts[1] && (
                <span className="text-gold-gradient">{titleParts[1]}</span>
              )}
            </h2>
            <p className="mt-5 text-foreground/65 max-w-md">
              {contactDescription}
            </p>
            <div className="mt-8 space-y-4">
              {[
                { i: Mail, l: "Email", v: contactEmail, h: `mailto:${contactEmail}`, ext: false },
                {
                  i: MessageCircle,
                  l: "WhatsApp",
                  v: "Chat with Ranjit directly",
                  h: whatsAppUrl,
                  ext: true,
                },
                {
                  i: Instagram,
                  l: "Instagram",
                  v: "@kalerbodyfocus",
                  h: SITE_CONFIG.instagramUrl,
                  ext: true,
                },
                {
                  i: Facebook,
                  l: "Facebook",
                  v: "Follow on Facebook",
                  h: SITE_CONFIG.facebookUrl,
                  ext: true,
                },
                { i: MapPin, l: "Location", v: locationText, h: "#", ext: false },
              ].map((c) => (
                <a
                  key={c.l}
                  href={c.h}
                  target={c.ext ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={`${c.l}: ${c.v}`}
                  className="flex items-center gap-4 p-4 rounded-xl card-surface hover:border-gold/40 transition-colors"
                >
                  <span className="w-11 h-11 rounded-lg bg-gold/15 grid place-items-center shrink-0">
                    <c.i className="w-5 h-5 text-gold" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">
                      {c.l}
                    </div>
                    <div className="font-medium truncate">{c.v}</div>
                  </div>
                </a>
              ))}
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold btn-gold-hover w-full mt-2"
              >
                <MessageCircle className="w-4 h-4" />{" "}
                {settings?.heroPrimaryCta
                  ? "Schedule Your Consultation"
                  : SITE_CONFIG.cta.contactPrimary}
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="card-surface overflow-hidden h-full min-h-[440px] relative">
            <iframe
              title="Christchurch map"
              src="https://www.google.com/maps?q=Christchurch%2C+New+Zealand&output=embed"
              className="w-full h-full grayscale contrast-[1.1] opacity-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute top-4 left-4 card-surface px-4 py-2 text-xs uppercase tracking-widest text-gold pointer-events-none">
              Christchurch · NZ
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer({ settings }: { settings?: SiteSettings }) {
  const whatsAppUrl = settings?.whatsAppNumber
    ? `https://wa.me/${settings.whatsAppNumber}?text=${encodeURIComponent("Hi Ranjit, I'm interested in coaching.")}`
    : SITE_CONFIG.whatsAppUrl;
  const contactEmail = settings?.contactEmail || SITE_CONFIG.contactEmail;

  return (
    <footer className="py-14 border-t border-white/10">
      <div className="container-px">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <p className="text-foreground/60 max-w-md text-sm">
              Premium personal training and online coaching for busy professionals. Built on
              evidence, accountability, and real results.
            </p>
            <div className="mt-5 flex gap-2">
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 grid place-items-center rounded-full border border-white/15 hover:border-gold hover:text-gold transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 grid place-items-center rounded-full border border-white/15 hover:border-gold hover:text-gold transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${contactEmail}`}
                aria-label="Email"
                className="w-10 h-10 grid place-items-center rounded-full border border-white/15 hover:border-gold hover:text-gold transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-gold mb-4">Explore</div>
            <ul className="space-y-2 text-sm text-foreground/65">
              <li>
                <a href="#about" className="hover:text-gold">
                  About
                </a>
              </li>
              <li>
                <a href="#personal" className="hover:text-gold">
                  1-on-1 Training
                </a>
              </li>
              <li>
                <a href="#online" className="hover:text-gold">
                  Online Coaching
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-gold">
                  Services
                </a>
              </li>
              <li>
                <a href="#inquiry" className="hover:text-gold">
                  Apply
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-gold mb-4">Contact</div>
            <ul className="space-y-2 text-sm text-foreground/65">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-gold break-all">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Kaler Body Focus. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gold">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
