import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Check, ChevronDown, ChevronRight, Dumbbell, Facebook, Heart, Instagram, Mail, MapPin, MessageCircle, Trophy, Target, Brain, Activity, Apple, Shield, Clock, Star, Quote } from "lucide-react";
import { Reveal, Counter } from "./Reveal";
import { WHATSAPP, CONTACT_EMAIL, FACEBOOK_URL, INSTAGRAM_URL } from "./Floating";
import hero from "@/assets/hero.jpg";
import founder from "@/assets/founder.jpg";
import gym from "@/assets/gym.jpg";
import training from "@/assets/training.jpg";
import online from "@/assets/online.jpg";
import logoFull from "@/assets/logo-full.png";

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] flex items-end overflow-hidden isolate">
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 -z-10"
      >
        <img
          src={hero}
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

      <div className="container-px relative w-full pb-20 md:pb-28 pt-32">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
          className="max-w-4xl"
        >
          <motion.span
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className="eyebrow inline-flex items-center gap-2"
          >
            <span className="w-8 h-px bg-gold" /> Christchurch · New Zealand
          </motion.span>
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-display font-black text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.95] tracking-tight drop-shadow-[0_6px_30px_rgba(0,0,0,0.55)]"
          >
            Train With <span className="text-gold-gradient italic">Focus.</span><br />
            Not Frustration.
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl leading-relaxed"
          >
            Get a coach who builds your plan, your way — and actually stays with you.
            Evidence-based training, real nutrition strategy, and accountability that delivers measurable results.
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7 }}
            className="mt-9 flex flex-col sm:flex-row gap-3"
          >
            <a href="#inquiry" className="btn-gold btn-gold-hover">
              Book Free Consultation <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#online" className="btn-ghost btn-ghost-hover">Start Online Coaching</a>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8 }}
            className="mt-14 grid grid-cols-3 max-w-xl gap-6 sm:gap-10"
          >
            {[
              { v: 500, s: "+", l: "Sessions Delivered" },
              { v: 98, s: "%", l: "Client Satisfaction" },
              { v: 7, s: "+", l: "Years Coaching" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl sm:text-4xl font-display font-bold text-gold">
                  <Counter to={s.v} suffix={s.s} />
                </div>
                <div className="text-[11px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        Scroll <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}

export function TrustBar() {
  const items = ["Evidence-Based Training", "Christchurch Personal Training", "Online Coaching Worldwide", "Nutrition Guidance", "Accountability Coaching"];
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

export function About() {
  return (
    <section id="about" className="py-24 md:py-36 relative">
      <div className="container-px grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-gold/30 to-transparent blur-2xl opacity-40" />
            <div className="relative overflow-hidden rounded-3xl gold-border">
              <img src={founder} alt="Ranjit Singh — Founder of Kaler Body Focus" width={1024} height={1024} loading="lazy" className="w-full h-auto" />
            </div>
            <div className="absolute -bottom-6 -right-2 sm:right-6 card-surface p-5 max-w-[220px]">
              <div className="text-2xl font-display font-bold text-gold">7+</div>
              <div className="text-xs text-muted-foreground mt-1">Years transforming busy professionals & parents</div>
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal><span className="eyebrow">Meet Your Coach</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl leading-[1.02]">
              Ranjit Singh.<br /><span className="text-gold-gradient">Built to Coach.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-7 space-y-5 text-foreground/75 leading-relaxed text-base sm:text-lg max-w-xl">
              <p>I'm Ranjit Singh, Founder of Kaler Body Focus and a Personal Trainer based in New Zealand. I work with busy professionals, parents, and everyday people tired of wasting time on programs that don't deliver lasting results.</p>
              <p>My coaching combines evidence-based training, practical nutrition strategies, accountability, and personalized support to build stronger bodies, healthier lifestyles, and long-term confidence.</p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-2">
              {["No shortcuts", "No crash diets", "No generic programs"].map(t => (
                <span key={t} className="px-4 py-2 rounded-full gold-border text-sm text-gold">{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Personal() {
  const includes = ["Personalized training plans", "Goal-based programming", "Exercise technique coaching", "Progress tracking", "Accountability support", "Nutrition guidance", "Injury prevention strategies", "Ongoing program adjustments"];
  const ideal = ["Beginners", "Busy professionals", "Weight loss clients", "Muscle building clients", "Strength-focused clients"];
  return (
    <section id="personal" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={gym} alt="" loading="lazy" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
      </div>
      <div className="container-px">
        <Reveal><span className="eyebrow">1-on-1 Personal Training</span></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl max-w-3xl leading-[1.02]">
            Personal Coaching. <span className="text-gold-gradient">Personalized Results.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 text-foreground/70 max-w-2xl text-lg">
            Train directly with Ranjit Singh in Christchurch, New Zealand. Every session is tailored to your body, your goals, and your life.
          </p>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-[1.3fr_1fr] gap-8">
          <Reveal>
            <div className="card-surface p-8 md:p-10">
              <h3 className="font-display text-2xl font-bold mb-7 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gold/15 grid place-items-center"><Check className="w-4 h-4 text-gold" /></span>
                What's Included
              </h3>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                {includes.map(i => (
                  <div key={i} className="flex items-start gap-3 text-sm text-foreground/85">
                    <ChevronRight className="w-4 h-4 text-gold shrink-0 mt-0.5" /> {i}
                  </div>
                ))}
              </div>
              <a href="#inquiry" className="btn-gold btn-gold-hover mt-10">Book Free Consultation <ArrowRight className="w-4 h-4" /></a>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="card-surface p-8 md:p-10 h-full">
              <h3 className="font-display text-2xl font-bold mb-7 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gold/15 grid place-items-center"><Target className="w-4 h-4 text-gold" /></span>
                Ideal For
              </h3>
              <ul className="space-y-3">
                {ideal.map(i => (
                  <li key={i} className="flex items-center gap-3 text-foreground/85 py-2 border-b border-white/5 last:border-0">
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

export function Online() {
  const features = [
    { i: Activity, t: "Customized training plans" },
    { i: Apple, t: "Nutrition guidance" },
    { i: MessageCircle, t: "WhatsApp support" },
    { i: Clock, t: "Weekly check-ins" },
    { i: Target, t: "Progress monitoring" },
    { i: Dumbbell, t: "Video exercise guidance" },
    { i: Trophy, t: "Goal tracking" },
    { i: Brain, t: "Lifestyle coaching" },
  ];
  return (
    <section id="online" className="py-24 md:py-36">
      <div className="container-px grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <div className="order-2 lg:order-1">
          <Reveal><span className="eyebrow">Online Coaching</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl leading-[1.02]">
              Professional Coaching <span className="text-gold-gradient">Wherever You Are.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-foreground/70 text-lg max-w-xl">
              Coaching that travels with you — built for results no matter your time zone, schedule, or equipment.
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
            <a href="#inquiry" className="btn-gold btn-gold-hover mt-10">Start Online Coaching <ArrowRight className="w-4 h-4" /></a>
          </Reveal>
        </div>
        <Reveal className="order-1 lg:order-2">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden gold-border">
            <img src={online} alt="Online coaching" width={1200} height={1500} loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 card-surface p-5">
              <div className="text-xs uppercase tracking-widest text-gold">Live · Worldwide</div>
              <div className="mt-1 text-lg font-display font-semibold">Coaching from anywhere in the world.</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const services = [
  { i: Dumbbell, t: "1-on-1 Personal Training", d: "Direct in-person coaching in Christchurch." },
  { i: Activity, t: "Online Coaching", d: "Tailored programs delivered worldwide." },
  { i: Target, t: "Fat Loss Coaching", d: "Sustainable strategies — no crash diets." },
  { i: Trophy, t: "Muscle Building Programs", d: "Structured hypertrophy for real growth." },
  { i: Shield, t: "Strength Training", d: "Powerlifting fundamentals & progressive overload." },
  { i: Apple, t: "Nutrition Guidance", d: "Practical plans that fit your lifestyle." },
  { i: Heart, t: "Injury Rehab & Movement", d: "Correct imbalances. Train pain-free." },
  { i: Brain, t: "Accountability & Tracking", d: "Weekly check-ins that keep you moving." },
  { i: Star, t: "Goal Setting & Mindset", d: "Build the mental side of physical change." },
  { i: ChevronRight, t: "Beginner to Advanced", d: "Programs that scale with your level." },
  { i: Clock, t: "Flexible Scheduling", d: "Sessions that work around your week." },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-36 bg-surface/30 border-y border-white/5">
      <div className="container-px">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <Reveal><span className="eyebrow">Services</span></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl leading-[1.02] max-w-2xl">
                Every kind of coaching, <span className="text-gold-gradient">one standard.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="text-foreground/65 max-w-sm">A complete coaching system designed around your goals, your body, and your schedule.</p>
          </Reveal>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <Reveal key={s.t} delay={0.04 * i}>
              <div className="group card-surface p-7 h-full hover:border-gold/40 transition-all hover:-translate-y-1 duration-300">
                <span className="w-12 h-12 rounded-xl bg-gold/15 grid place-items-center mb-5 group-hover:bg-gold group-hover:text-ink transition-colors">
                  <s.i className="w-5 h-5 text-gold group-hover:text-ink transition-colors" />
                </span>
                <h3 className="font-display text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-foreground/65 leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Transformations() {
  return (
    <section id="transformations" className="py-24 md:py-36">
      <div className="container-px">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal><span className="eyebrow">Transformations</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl">Real People. <span className="text-gold-gradient">Real Results.</span></h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-foreground/65">Weight loss, muscle gain, strength gains and real lifestyle change — built one client at a time.</p>
          </Reveal>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { tag: "Fat Loss", v: "-18kg", t: "12-week transformation" },
            { tag: "Muscle Gain", v: "+9kg", t: "Lean tissue in 24 weeks" },
            { tag: "Strength", v: "+45%", t: "Total compound lifts" },
            { tag: "Body Recomp", v: "-12%", t: "Body fat reduction" },
            { tag: "Confidence", v: "100%", t: "Lifestyle reset" },
            { tag: "Performance", v: "PR", t: "First pull-up unlocked" },
          ].map((c, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <div className="group relative aspect-[4/5] rounded-2xl overflow-hidden card-surface">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.78_0.13_84/0.18),transparent_60%)]" />
                <div className="absolute inset-0 grid grid-cols-2">
                  <div className="border-r border-white/5 grid place-items-center text-xs uppercase tracking-widest text-muted-foreground">Before</div>
                  <div className="grid place-items-center text-xs uppercase tracking-widest text-gold">After</div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-ink via-ink/80 to-transparent">
                  <div className="text-xs uppercase tracking-widest text-gold">{c.tag}</div>
                  <div className="mt-1 font-display text-3xl font-bold">{c.v}</div>
                  <div className="text-xs text-foreground/60 mt-1">{c.t}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-xs text-muted-foreground italic">Client photos, reviews, and transformation results will be added as they are provided.</p>
        </Reveal>
      </div>
    </section>
  );
}

const testimonials = [
  { n: "Sarah M.", r: "Busy Professional", q: "Ranjit completely changed my relationship with training. Zero guesswork, every session intentional. I lost 14kg and kept it off." },
  { n: "James K.", r: "Father of Two", q: "I've worked with three trainers before Kaler Body Focus. The difference is the accountability — he actually shows up for you." },
  { n: "Priya N.", r: "First-Time Lifter", q: "I came in nervous. Ranjit built my confidence rep by rep. I'm now squatting double what I started with." },
  { n: "Tom R.", r: "Online Client (UK)", q: "Online coaching done right. Weekly check-ins, video reviews, real-time WhatsApp support. Best investment of the year." },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  return (
    <section id="testimonials" className="py-24 md:py-36 bg-surface/30 border-y border-white/5">
      <div className="container-px">
        <Reveal><span className="eyebrow">Testimonials</span></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl max-w-3xl">What clients <span className="text-gold-gradient">actually say.</span></h2>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-[1.2fr_1fr] gap-6">
          <Reveal>
            <div className="card-surface p-8 md:p-12 relative min-h-[320px]">
              <Quote className="w-10 h-10 text-gold/30 mb-6" />
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className="text-xl md:text-2xl font-display leading-relaxed"
              >
                "{testimonials[i].q}"
              </motion.p>
              <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="font-bold">{testimonials[i].n}</div>
                  <div className="text-sm text-muted-foreground">{testimonials[i].r}</div>
                </div>
                <div className="flex gap-2">
                  {testimonials.map((_, k) => (
                    <button key={k} onClick={() => setI(k)} aria-label={`Testimonial ${k + 1}`}
                      className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-gold" : "w-3 bg-white/20"}`} />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card-surface p-8 h-full flex flex-col">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-gold/20 to-transparent border border-white/5 grid place-items-center">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-gold/20 grid place-items-center mx-auto">
                    <div className="w-0 h-0 border-l-[12px] border-l-gold border-y-[8px] border-y-transparent ml-1" />
                  </div>
                  <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">Video testimonial</div>
                </div>
              </div>
              <p className="mt-6 text-foreground/70 text-sm">Client video testimonials and success stories will be added here as they're recorded.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="py-24 md:py-36">
      <div className="container-px">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10 items-start">
          <Reveal>
            <div>
              <span className="eyebrow">Google Reviews</span>
              <h2 className="mt-4 font-display font-black text-4xl md:text-5xl">Trusted on Google.</h2>
              <div className="mt-6 flex items-end gap-3">
                <div className="text-6xl font-display font-black text-gold">5.0</div>
                <div className="mb-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-gold text-gold" />)}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Based on verified Google reviews</div>
                </div>
              </div>
              <p className="mt-5 text-foreground/65 text-sm">Live Google Business Profile reviews will display here once the profile is connected.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { n: "Alex P.", q: "Best PT in Christchurch. Tailored, professional, results-driven." },
              { n: "Mia L.", q: "Patient with beginners. Ranjit makes the gym feel approachable." },
              { n: "David T.", q: "Online coaching is on point. Worth every cent." },
              { n: "Emma S.", q: "Honest, knowledgeable, and genuinely invested in your progress." },
            ].map((r, k) => (
              <Reveal key={k} delay={0.05 * k}>
                <div className="card-surface p-6">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />)}
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">"{r.q}"</p>
                  <div className="mt-4 text-xs text-muted-foreground">— {r.n}</div>
                </div>
              </Reveal>
            ))}
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
        <img src={training} alt="" loading="lazy" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>
      <div className="container-px">
        <Reveal><span className="eyebrow">Coaching Process</span></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl max-w-3xl">From day one to <span className="text-gold-gradient">your best self.</span></h2>
        </Reveal>

        <div className="mt-16 relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
          <div className="space-y-10">
            {steps.map((s, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <div className={`relative grid md:grid-cols-2 gap-6 md:gap-12 items-center ${i % 2 ? "md:[direction:rtl]" : ""}`}>
                  <div className="md:[direction:ltr] pl-16 md:pl-0">
                    <div className="card-surface p-6 md:p-8 inline-block w-full">
                      <div className="text-xs uppercase tracking-widest text-gold">Step {String(i + 1).padStart(2, "0")}</div>
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

export function FAQ() {
  const items = [
    { q: "Where are you based?", a: "Christchurch, New Zealand — for 1-on-1 personal training. Online coaching is available worldwide." },
    { q: "Do I need gym experience?", a: "No. Most clients start as complete beginners. Every plan is built for your current level." },
    { q: "How long until I see results?", a: "Most clients notice meaningful change within 4–6 weeks. Lasting transformations are built over 12+ weeks of consistency." },
    { q: "What's included in online coaching?", a: "Custom training programs delivered through my coaching app, personalized nutrition guidance, weekly check-ins, WhatsApp support, progress tracking, and exercise technique reviews to ensure consistent results." },
    { q: "Do you offer nutrition plans?", a: "Yes — practical, sustainable strategies that fit your lifestyle. No crash diets, ever." },
    { q: "What's the consultation like?", a: "A relaxed conversation about your goals, history, and lifestyle. Zero pressure — just clarity." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 md:py-36 bg-surface/30 border-y border-white/5">
      <div className="container-px grid lg:grid-cols-[1fr_1.4fr] gap-12">
        <Reveal>
          <div>
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-4 font-display font-black text-4xl md:text-5xl leading-[1.05]">Answers, <span className="text-gold-gradient">not assumptions.</span></h2>
            <p className="mt-5 text-foreground/65">Still wondering? Reach out directly on WhatsApp — Ranjit answers personally.</p>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-ghost-hover mt-6 inline-flex">
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
                  <ChevronDown className={`w-5 h-5 text-gold shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
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
            <Reveal><span className="eyebrow">Instagram · @kalerbodyfocus</span></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl">Follow The <span className="text-gold-gradient">Journey.</span></h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <a href="https://instagram.com/kalerbodyfocus" target="_blank" rel="noopener noreferrer" className="btn-gold btn-gold-hover">
              <Instagram className="w-4 h-4" /> Follow on Instagram
            </a>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Reveal key={i} delay={0.03 * i}>
              <a href="https://instagram.com/kalerbodyfocus" target="_blank" rel="noopener noreferrer"
                 className="group relative aspect-square overflow-hidden rounded-xl card-surface block">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.78_0.13_84/0.18),transparent_70%)]" />
                <div className="absolute inset-0 grid place-items-center text-muted-foreground">
                  <Instagram className="w-8 h-8 opacity-30 group-hover:opacity-80 group-hover:text-gold transition-all" />
                </div>
                <div className="absolute bottom-2 left-2 text-[10px] uppercase tracking-widest text-muted-foreground">Post 0{i + 1}</div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-36 bg-surface/30 border-y border-white/5">
      <div className="container-px grid lg:grid-cols-2 gap-12">
        <Reveal>
          <div>
            <span className="eyebrow">Contact</span>
            <h2 className="mt-4 font-display font-black text-4xl md:text-5xl leading-[1.05]">Let's <span className="text-gold-gradient">talk training.</span></h2>
            <p className="mt-5 text-foreground/65 max-w-md">Reach out directly — Ranjit responds personally to every inquiry.</p>
            <div className="mt-8 space-y-4">
              {[
                { i: Mail, l: "Email", v: CONTACT_EMAIL, h: `mailto:${CONTACT_EMAIL}`, ext: false },
                { i: MessageCircle, l: "WhatsApp", v: "Chat with Ranjit directly", h: WHATSAPP, ext: true },
                { i: Instagram, l: "Instagram", v: "@kalerbodyfocus", h: INSTAGRAM_URL, ext: true },
                { i: Facebook, l: "Facebook", v: "Kaler Body Focus", h: FACEBOOK_URL, ext: true },
                { i: MapPin, l: "Location", v: "Christchurch, New Zealand", h: "#", ext: false },
              ].map(c => (
                <a key={c.l} href={c.h} target={c.ext ? "_blank" : undefined} rel="noopener noreferrer"
                   aria-label={`${c.l}: ${c.v}`}
                   className="flex items-center gap-4 p-4 rounded-xl card-surface hover:border-gold/40 transition-colors">
                  <span className="w-11 h-11 rounded-lg bg-gold/15 grid place-items-center shrink-0">
                    <c.i className="w-5 h-5 text-gold" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.l}</div>
                    <div className="font-medium truncate">{c.v}</div>
                  </div>
                </a>
              ))}
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-gold btn-gold-hover w-full mt-2">
                <MessageCircle className="w-4 h-4" /> Contact via WhatsApp
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

export function Footer() {
  return (
    <footer className="py-14 border-t border-white/10">
      <div className="container-px">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <img src={logoFull} alt="Kaler Body Focus" width={220} height={220} className="w-[180px] sm:w-[200px] lg:w-[220px] h-auto [filter:brightness(0)_invert(1)]" />
            <p className="mt-3 text-foreground/60 max-w-md text-sm">
              Premium personal training and online coaching for busy professionals. Built on evidence, accountability, and real results.
            </p>
            <div className="mt-5 flex gap-2">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="w-10 h-10 grid place-items-center rounded-full border border-white/15 hover:border-gold hover:text-gold transition-colors"><MessageCircle className="w-4 h-4" /></a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 grid place-items-center rounded-full border border-white/15 hover:border-gold hover:text-gold transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 grid place-items-center rounded-full border border-white/15 hover:border-gold hover:text-gold transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email" className="w-10 h-10 grid place-items-center rounded-full border border-white/15 hover:border-gold hover:text-gold transition-colors"><Mail className="w-4 h-4" /></a>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-gold mb-4">Explore</div>
            <ul className="space-y-2 text-sm text-foreground/65">
              <li><a href="#about" className="hover:text-gold">About</a></li>
              <li><a href="#personal" className="hover:text-gold">1-on-1 Training</a></li>
              <li><a href="#online" className="hover:text-gold">Online Coaching</a></li>
              <li><a href="#services" className="hover:text-gold">Services</a></li>
              <li><a href="#inquiry" className="hover:text-gold">Apply</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-gold mb-4">Contact</div>
            <ul className="space-y-2 text-sm text-foreground/65">
              <li>Christchurch, NZ</li>
              <li><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-gold break-all">{CONTACT_EMAIL}</a></li>
              <li><a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="hover:text-gold inline-flex items-center gap-2"><MessageCircle className="w-3.5 h-3.5" /> Chat on WhatsApp</a></li>
              <li><a href="https://instagram.com/kalerbodyfocus" className="hover:text-gold">@kalerbodyfocus</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Kaler Body Focus. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">Privacy Policy</a>
            <a href="#" className="hover:text-gold">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
