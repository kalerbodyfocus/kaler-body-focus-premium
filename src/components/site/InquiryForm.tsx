import { useState } from "react";
import { useForm, Controller, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { WHATSAPP } from "./Floating";
import { PhoneInput } from "./PhoneInput";
import { PremiumSelect } from "./PremiumSelect";
import { validatePhoneNumber, formatFullPhoneNumber } from "@/lib/countries";
import { SiteSettings } from "@/lib/sanity";

type Field = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  full?: boolean;
};

const steps: { title: string; subtitle: string; fields: Field[] }[] = [
  {
    title: "Personal Details",
    subtitle: "Tell us about yourself.",
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
    title: "Fitness Goals",
    subtitle: "What outcome matters most?",
    fields: [
      {
        name: "goal",
        label: "Primary Goal",
        options: [
          "Fat Loss",
          "Muscle Gain",
          "Strength Training",
          "Body Recomposition",
          "General Fitness",
          "Other",
        ],
        required: true,
        full: true,
      },
      {
        name: "goalNotes",
        label: "Anything specific?",
        type: "textarea",
        full: true,
        placeholder: "Optional context about your goal...",
      },
    ],
  },
  {
    title: "Background",
    subtitle: "Your starting point.",
    fields: [
      {
        name: "experience",
        label: "Training Experience",
        options: ["None", "Beginner", "Intermediate", "Advanced"],
      },
      { name: "profession", label: "Profession" },
      {
        name: "activity",
        label: "Daily Activity Level",
        options: ["Sedentary", "Lightly Active", "Moderately Active", "Very Active"],
      },
      {
        name: "workoutTime",
        label: "Preferred Workout Time",
        options: ["Early Morning", "Morning", "Midday", "Evening", "Late Night"],
      },
      {
        name: "diet",
        label: "Diet Type",
        options: ["No restriction", "Vegetarian", "Vegan", "Pescatarian", "Other"],
      },
      {
        name: "sleep",
        label: "Sleep Duration",
        options: ["<5 hrs", "5-6 hrs", "7-8 hrs", "9+ hrs"],
      },
      { name: "medical", label: "Medical Conditions / Injuries", type: "textarea", full: true },
      { name: "medications", label: "Current Medications", full: true },
    ],
  },
  {
    title: "Challenges",
    subtitle: "Where you've been stuck.",
    fields: [
      { name: "struggle", label: "Biggest Fitness Struggle", type: "textarea", full: true },
      { name: "previous", label: "Why Previous Attempts Failed", type: "textarea", full: true },
      { name: "motivation", label: "Motivation For Joining", type: "textarea", full: true },
      { name: "outcome", label: "Expected Outcome", type: "textarea", full: true },
    ],
  },
  {
    title: "Lead Source",
    subtitle: "How did we cross paths?",
    fields: [
      {
        name: "source",
        label: "How Did You Heard About Us",
        options: ["Google", "Instagram", "Facebook", "Referral", "Other"],
        full: true,
      },
      { name: "referral", label: "Referral Name (if any)", full: true },
    ],
  },
  {
    title: "Commitment",
    subtitle: "Let's make it real.",
    fields: [
      {
        name: "duration",
        label: "Coaching Duration",
        options: ["1 month", "3 months", "6 months", "12 months"],
      },
      {
        name: "budget",
        label: "Budget Readiness",
        options: ["Ready to invest", "Need pricing first", "Exploring"],
      },
      { name: "startDate", label: "Preferred Start Date", type: "date", full: true },
    ],
  },
];

const formSchema = z
  .object({
    // Honeypot field — must be empty. Hidden from real users, bots fill it in.
    _hp: z.string().max(0).optional(),
    fullName: z.string().trim().min(1, "Full name is required"),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    phone: z.string().trim().optional(),
    phone_phoneNumber: z.string().trim().min(1, "Phone number is required"),
    phone_countryCode: z.string().trim(),
    whatsapp: z.string().trim().optional(),
    whatsapp_phoneNumber: z.string().trim().optional(),
    whatsapp_countryCode: z.string().trim(),
    age: z.string().trim().optional(),
    gender: z.string().optional(),
    weight: z.string().trim().optional(),
    height: z.string().trim().optional(),
    location: z.string().trim().optional(),
    goal: z.string().min(1, "Please select your primary goal"),
    goalNotes: z.string().trim().optional(),
    experience: z.string().optional(),
    profession: z.string().trim().optional(),
    activity: z.string().optional(),
    workoutTime: z.string().optional(),
    diet: z.string().optional(),
    sleep: z.string().optional(),
    medical: z.string().trim().optional(),
    medications: z.string().trim().optional(),
    struggle: z.string().trim().optional(),
    previous: z.string().trim().optional(),
    motivation: z.string().trim().optional(),
    outcome: z.string().trim().optional(),
    source: z.string().optional(),
    referral: z.string().trim().optional(),
    duration: z.string().optional(),
    budget: z.string().optional(),
    startDate: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    // Phone validation
    if (
      !data.phone_phoneNumber ||
      !validatePhoneNumber(data.phone_phoneNumber, data.phone_countryCode)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter a valid phone number for this country.",
        path: ["phone_phoneNumber"],
      });
    }

    // WhatsApp validation
    if (data.whatsapp_phoneNumber && data.whatsapp_phoneNumber.trim() !== "") {
      if (!validatePhoneNumber(data.whatsapp_phoneNumber, data.whatsapp_countryCode)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a valid WhatsApp number for this country.",
          path: ["whatsapp_phoneNumber"],
        });
      }
    }
  });

type FormValues = z.infer<typeof formSchema>;

export function InquiryForm({ settings }: { settings?: SiteSettings }) {
  // Determine if specific fields are enabled from CMS settings
  const showAge = settings?.formShowAge !== false;
  const showBodyStats = settings?.formShowBodyStats !== false;
  const showWhatsApp = settings?.formShowWhatsApp !== false;

  // Dynamically filter Step 1 fields based on CMS toggles
  const dynamicSteps = steps.map((s, stepIdx) => {
    if (stepIdx === 0) {
      const filteredFields = s.fields.filter((f) => {
        if (f.name === "whatsapp" && !showWhatsApp) return false;
        if (f.name === "age" && !showAge) return false;
        if ((f.name === "weight" || f.name === "height") && !showBodyStats) return false;
        return true;
      });
      return { ...s, fields: filteredFields };
    }
    return s;
  });

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [done, setDone] = useState(false);
  const total = dynamicSteps.length;

  const {
    register,
    handleSubmit,
    control,
    trigger,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      phone_countryCode: "NZ",
      whatsapp_countryCode: "NZ",
      phone_phoneNumber: "",
      whatsapp_phoneNumber: "",
      fullName: "",
      email: "",
      phone: "",
      whatsapp: "",
      age: "",
      gender: "",
      weight: "",
      height: "",
      location: "",
      goal: "",
      goalNotes: "",
      experience: "",
      profession: "",
      activity: "",
      workoutTime: "",
      diet: "",
      sleep: "",
      medical: "",
      medications: "",
      struggle: "",
      previous: "",
      motivation: "",
      outcome: "",
      source: "",
      referral: "",
      duration: "",
      budget: "",
      startDate: "",
    },
  });

  const formValues = watch();

  const isStepValid = () => {
    const currentFields = dynamicSteps[step].fields;
    return currentFields.every((f) => {
      const fieldName =
        f.name === "phone"
          ? "phone_phoneNumber"
          : f.name === "whatsapp"
            ? "whatsapp_phoneNumber"
            : f.name;
      const val = formValues[fieldName as keyof FormValues];

      // If required, must have a value
      if (f.required) {
        if (!val || !String(val).trim()) return false;
      }

      // If it has an error in errors object
      if (errors[fieldName as keyof FormValues]) return false;

      return true;
    });
  };

  const handleContinue = async () => {
    const currentFields = dynamicSteps[step].fields.map((f) => {
      if (f.name === "phone") return "phone_phoneNumber";
      if (f.name === "whatsapp") return "whatsapp_phoneNumber";
      return f.name;
    }) as (keyof FormValues)[];

    const isValid = await trigger(currentFields);
    if (isValid) {
      setStep((s) => Math.min(total - 1, s + 1));
    }
  };

  const onSubmit = async (formData: FormValues) => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const payload = {
        _hp: formData._hp ?? "",
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        age: formData.age,
        gender: formData.gender,
        location: formData.location,
        weight: formData.weight,
        height: formData.height,
        goal: formData.goal,
        goalNotes: formData.goalNotes,
        experience: formData.experience,
        profession: formData.profession,
        activity: formData.activity,
        workoutTime: formData.workoutTime,
        diet: formData.diet,
        sleep: formData.sleep,
        medical: formData.medical,
        medications: formData.medications,
        struggle: formData.struggle,
        previous: formData.previous,
        motivation: formData.motivation,
        outcome: formData.outcome,
        source: formData.source,
        referral: formData.referral,
        duration: formData.duration,
        budget: formData.budget,
        startDate: formData.startDate,
      };

      const apiBase =
        typeof window !== "undefined" && window.location.port === "3001"
          ? "http://localhost:3000"
          : "";
      const response = await fetch(`${apiBase}/api/inquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errMsg = "Submission failed. Please try again.";
        try {
          const parsed = JSON.parse(errorText);
          errMsg = parsed.error || errMsg;
        } catch (parseError) {
          console.warn("Failed to parse API error response as JSON", parseError);
        }
        throw new Error(errMsg);
      }

      setDone(true);
    } catch (e: unknown) {
      console.error("Submission error:", e);
      const errorMessage =
        e instanceof Error
          ? e.message
          : "Something went wrong while submitting your application. Please check your network connection and try again.";
      setSubmitError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="inquiry" className="py-24 md:py-36">
      {/* Honeypot field — hidden from real users, catches bots */}
      <input
        type="text"
        {...register("_hp")}
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
      />
      <div className="container-px">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <span className="eyebrow">Apply for Coaching</span>
              <h2 className="mt-4 font-display font-black text-4xl md:text-5xl leading-[1.05]">
                Start your <span className="text-gold-gradient">transformation.</span>
              </h2>
              <p className="mt-5 text-foreground/65">
                A short application so Ranjit can prepare the right plan before your free
                consultation.
              </p>
              <div className="mt-8 space-y-2">
                {dynamicSteps.map((s, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 text-sm transition-colors ${i === step ? "text-gold" : i < step ? "text-foreground/80" : "text-muted-foreground"}`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full grid place-items-center text-xs font-bold border ${i < step ? "bg-gold text-ink border-gold" : i === step ? "border-gold" : "border-white/15"}`}
                    >
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
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center py-12 px-4 rounded-2xl bg-[#0B0B0B] border border-gold/15 shadow-[0_20px_50px_rgba(0,0,0,0.9),_0_0_30px_rgba(212,175,55,0.05)]"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
                      className="w-24 h-24 rounded-full border-2 border-gold bg-gold/10 grid place-items-center mx-auto relative shadow-[0_0_30px_rgba(212,175,55,0.25)]"
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full border border-gold/40"
                        animate={{ scale: [1, 1.25, 1], opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      />
                      <Check className="w-12 h-12 text-gold stroke-[2.5]" />
                    </motion.div>
                    <h3 className="mt-8 font-display text-2xl md:text-3xl font-black text-gold-gradient tracking-tight">
                      Application Submitted Successfully
                    </h3>
                    <p className="mt-4 text-foreground/75 text-sm md:text-base max-w-md mx-auto leading-relaxed">
                      Thank you for your application. Your consultation request has been received
                      successfully. Ranjit will personally review your information and contact you
                      shortly.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold btn-gold-hover w-full sm:w-auto"
                      >
                        Message on WhatsApp
                      </a>
                      <button
                        onClick={() => {
                          setDone(false);
                          setStep(0);
                          reset();
                          document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="btn-ghost btn-ghost-hover w-full sm:w-auto text-sm"
                      >
                        Return to Homepage
                      </button>
                    </div>.
                  </motion.div>
                ) : (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="text-xs uppercase tracking-widest text-gold">
                      Step {step + 1} of {total}
                    </div>
                    <h3 className="mt-2 font-display text-3xl font-bold">{dynamicSteps[step].title}</h3>
                    <p className="mt-1 text-foreground/60">{dynamicSteps[step].subtitle}</p>

                    <div className="mt-8 grid sm:grid-cols-2 gap-4">
                      {dynamicSteps[step].fields.map((f) => (
                        <div key={f.name} className={f.full ? "sm:col-span-2" : ""}>
                          {f.name === "phone" ? (
                            <Controller
                              name="phone_phoneNumber"
                              control={control}
                              render={({ field, fieldState }) => (
                                <PhoneInput
                                  label={f.label}
                                  required={f.required}
                                  countryCode={watch("phone_countryCode")}
                                  phoneNumber={field.value || ""}
                                  onChange={(cc, num) => {
                                    setValue("phone_countryCode", cc);
                                    field.onChange(num);
                                    setValue("phone", formatFullPhoneNumber(num, cc));
                                  }}
                                  placeholder="220749673"
                                  error={fieldState.error?.message}
                                />
                              )}
                            />
                          ) : f.name === "whatsapp" ? (
                            <Controller
                              name="whatsapp_phoneNumber"
                              control={control}
                              render={({ field, fieldState }) => (
                                <PhoneInput
                                  label={f.label}
                                  required={f.required}
                                  countryCode={watch("whatsapp_countryCode")}
                                  phoneNumber={field.value || ""}
                                  onChange={(cc, num) => {
                                    setValue("whatsapp_countryCode", cc);
                                    field.onChange(num);
                                    setValue(
                                      "whatsapp",
                                      num.trim() ? formatFullPhoneNumber(num, cc) : "",
                                    );
                                  }}
                                  placeholder="9860398216"
                                  error={fieldState.error?.message}
                                />
                              )}
                            />
                          ) : f.options ? (
                            <Controller
                              name={f.name as Path<FormValues>}
                              control={control}
                              render={({ field, fieldState }) => (
                                <PremiumSelect
                                  label={f.label}
                                  required={f.required}
                                  value={field.value || ""}
                                  options={f.options || []}
                                  onChange={field.onChange}
                                  placeholder="Select…"
                                  searchable={(f.options || []).length > 5}
                                  error={fieldState.error?.message}
                                />
                              )}
                            />
                          ) : (
                            <>
                              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                                {f.label}
                                {f.required && <span className="text-gold"> *</span>}
                              </label>
                              {f.type === "textarea" ? (
                                <textarea
                                  rows={3}
                                  placeholder={f.placeholder}
                                  {...register(f.name as Path<FormValues>)}
                                  className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold focus:outline-none transition-colors resize-none"
                                />
                              ) : (
                                <input
                                  type={f.type || "text"}
                                  placeholder={f.placeholder}
                                  {...register(f.name as Path<FormValues>)}
                                  className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold focus:outline-none transition-colors"
                                />
                              )}
                              {errors[f.name as keyof FormValues]?.message && (
                                <span className="text-[11px] text-red-500 mt-1.5 font-medium tracking-wide block">
                                  {errors[f.name as keyof FormValues]?.message as string}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>

                    {submitError && (
                      <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm leading-relaxed">
                        {submitError}
                      </div>
                    )}

                    <div className="mt-10 flex items-center justify-between gap-3">
                      <button
                        onClick={() => setStep((s) => Math.max(0, s - 1))}
                        disabled={step === 0}
                        className="btn-ghost btn-ghost-hover disabled:opacity-30 disabled:pointer-events-none"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                      {step < total - 1 ? (
                        <button
                          type="button"
                          onClick={handleContinue}
                          disabled={!isStepValid()}
                          className="btn-gold btn-gold-hover disabled:opacity-40 disabled:pointer-events-none"
                        >
                          Continue <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSubmit(onSubmit)}
                          disabled={submitting || !isStepValid()}
                          className="btn-gold btn-gold-hover disabled:opacity-40"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" /> Submitting Your
                              Application...
                            </>
                          ) : (
                            <>
                              Submit Application <ArrowRight className="w-4 h-4" />
                            </>
                          )}
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
