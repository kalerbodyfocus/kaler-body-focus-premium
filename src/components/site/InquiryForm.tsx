import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { WHATSAPP } from "./Floating";

type Field = { name: string; label: string; type?: string; placeholder?: string; options?: string[]; required?: boolean; full?: boolean };

const steps: { title: string; subtitle: string; fields: Field[] }[] = [
  {
    title: "Personal Details", subtitle: "Tell us about yourself.",
    fields: [
      { name: "fullName", label: "Full Name", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel", required: true },
      { name: "whatsapp", label: "WhatsApp", type: "tel" },
      { name: "age", label: "Age", type: "number" },
      { name: "gender", label: "Gender", options: ["Male", "Female", "Prefer not to say"] },
      { name: "weight", label: "Weight (kg)", type: "number" },
      { name: "height", label: "Height (cm)", type: "number" },
      { name: "location", label: "Location", full: true },
    ],
  },
  {
    title: "Fitness Goals", subtitle: "What outcome matters most?",
    fields: [
      { name: "goal", label: "Primary Goal", options: ["Fat Loss", "Muscle Gain", "Strength Training", "Body Recomposition", "General Fitness", "Other"], required: true, full: true },
      { name: "goalNotes", label: "Anything specific?", type: "textarea", full: true, placeholder: "Optional context about your goal..." },
    ],
  },
  {
    title: "Background", subtitle: "Your starting point.",
    fields: [
      { name: "experience", label: "Training Experience", options: ["None", "Beginner", "Intermediate", "Advanced"] },
      { name: "profession", label: "Profession" },
      { name: "activity", label: "Daily Activity Level", options: ["Sedentary", "Lightly Active", "Moderately Active", "Very Active"] },
      { name: "workoutTime", label: "Preferred Workout Time", options: ["Early Morning", "Morning", "Midday", "Evening", "Late Night"] },
      { name: "diet", label: "Diet Type", options: ["No restriction", "Vegetarian", "Vegan", "Pescatarian", "Other"] },
      { name: "sleep", label: "Sleep Duration", options: ["<5 hrs", "5-6 hrs", "7-8 hrs", "9+ hrs"] },
      { name: "medical", label: "Medical Conditions / Injuries", type: "textarea", full: true },
      { name: "medications", label: "Current Medications", full: true },
    ],
  },
  {
    title: "Challenges", subtitle: "Where you've been stuck.",
    fields: [
      { name: "struggle", label: "Biggest Fitness Struggle", type: "textarea", full: true },
      { name: "previous", label: "Why Previous Attempts Failed", type: "textarea", full: true },
      { name: "motivation", label: "Motivation For Joining", type: "textarea", full: true },
      { name: "outcome", label: "Expected Outcome", type: "textarea", full: true },
    ],
  },
  {
    title: "Lead Source", subtitle: "How did we cross paths?",
    fields: [
      { name: "source", label: "How Did You Hear About Us", options: ["Google", "Instagram", "Facebook", "Referral", "Other"], full: true },
      { name: "referral", label: "Referral Name (if any)", full: true },
    ],
  },
  {
    title: "Commitment", subtitle: "Let's make it real.",
    fields: [
      { name: "duration", label: "Coaching Duration", options: ["1 month", "3 months", "6 months", "12 months"] },
      { name: "budget", label: "Budget Readiness", options: ["Ready to invest", "Need pricing first", "Exploring"] },
      { name: "startDate", label: "Preferred Start Date", type: "date", full: true },
    ],
  },
];

export function InquiryForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const total = steps.length;

  const set = (k: string, v: string) => setData(d => ({ ...d, [k]: v }));

  const valid = () => steps[step].fields.every(f => !f.required || (data[f.name] && data[f.name].trim()));

  const submit = async () => {
    setSubmitting(true);
    try {
      const summary = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n");
      const wa = `https://wa.me/64220749673?text=${encodeURIComponent("New Coaching Inquiry\n\n" + summary)}`;
      window.open(wa, "_blank");
      const mail = `mailto:kalerbodyfocus@gmail.com?subject=${encodeURIComponent("New Coaching Inquiry — " + (data.fullName || ""))}&body=${encodeURIComponent(summary)}`;
      const a = document.createElement("a"); a.href = mail; a.click();
      await new Promise(r => setTimeout(r, 700));
      setDone(true);
    } finally { setSubmitting(false); }
  };

  return (
    <section id="inquiry" className="py-24 md:py-36">
      <div className="container-px">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <span className="eyebrow">Apply for Coaching</span>
              <h2 className="mt-4 font-display font-black text-4xl md:text-5xl leading-[1.05]">Start your <span className="text-gold-gradient">transformation.</span></h2>
              <p className="mt-5 text-foreground/65">A short application so Ranjit can prepare the right plan before your free consultation.</p>
              <div className="mt-8 space-y-2">
                {steps.map((s, i) => (
                  <div key={i} className={`flex items-center gap-3 text-sm transition-colors ${i === step ? "text-gold" : i < step ? "text-foreground/80" : "text-muted-foreground"}`}>
                    <span className={`w-7 h-7 rounded-full grid place-items-center text-xs font-bold border ${i < step ? "bg-gold text-ink border-gold" : i === step ? "border-gold" : "border-white/15"}`}>
                      {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                    </span>
                    {s.title}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card-surface p-6 sm:p-10">
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-8">
                <motion.div
                  initial={false}
                  animate={{ width: `${((done ? total : step + 1) / total) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-gold-soft to-gold"
                />
              </div>

              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-10">
                    <div className="w-20 h-20 rounded-full bg-gold/20 grid place-items-center mx-auto">
                      <Check className="w-10 h-10 text-gold" />
                    </div>
                    <h3 className="mt-6 font-display text-3xl md:text-4xl font-bold">Application received.</h3>
                    <p className="mt-3 text-foreground/65 max-w-md mx-auto">Ranjit will personally review your details and reply within 24 hours.</p>
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-gold btn-gold-hover mt-8">Message on WhatsApp</a>
                  </motion.div>
                ) : (
                  <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
                    <div className="text-xs uppercase tracking-widest text-gold">Step {step + 1} of {total}</div>
                    <h3 className="mt-2 font-display text-3xl font-bold">{steps[step].title}</h3>
                    <p className="mt-1 text-foreground/60">{steps[step].subtitle}</p>

                    <div className="mt-8 grid sm:grid-cols-2 gap-4">
                      {steps[step].fields.map(f => (
                        <div key={f.name} className={f.full ? "sm:col-span-2" : ""}>
                          <label className="text-xs uppercase tracking-widest text-muted-foreground">{f.label}{f.required && <span className="text-gold"> *</span>}</label>
                          {f.options ? (
                            <select
                              value={data[f.name] || ""}
                              onChange={e => set(f.name, e.target.value)}
                              className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold focus:outline-none transition-colors text-foreground"
                            >
                              <option value="">Select…</option>
                              {f.options.map(o => <option key={o} value={o} className="bg-ink">{o}</option>)}
                            </select>
                          ) : f.type === "textarea" ? (
                            <textarea
                              rows={3}
                              value={data[f.name] || ""}
                              placeholder={f.placeholder}
                              onChange={e => set(f.name, e.target.value)}
                              className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold focus:outline-none transition-colors resize-none"
                            />
                          ) : (
                            <input
                              type={f.type || "text"}
                              value={data[f.name] || ""}
                              placeholder={f.placeholder}
                              onChange={e => set(f.name, e.target.value)}
                              className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold focus:outline-none transition-colors"
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-10 flex items-center justify-between gap-3">
                      <button
                        onClick={() => setStep(s => Math.max(0, s - 1))}
                        disabled={step === 0}
                        className="btn-ghost btn-ghost-hover disabled:opacity-30 disabled:pointer-events-none"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                      {step < total - 1 ? (
                        <button
                          onClick={() => valid() && setStep(s => s + 1)}
                          disabled={!valid()}
                          className="btn-gold btn-gold-hover disabled:opacity-40 disabled:pointer-events-none"
                        >
                          Continue <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={submit}
                          disabled={submitting || !valid()}
                          className="btn-gold btn-gold-hover disabled:opacity-40"
                        >
                          {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <>Submit Application <ArrowRight className="w-4 h-4" /></>}
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
