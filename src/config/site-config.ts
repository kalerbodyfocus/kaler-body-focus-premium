// Unified configuration for Kaler Body Focus site.
// Edit this file to update contact details, social links, CTA text, and FAQ contents.

const WA_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) ?? "64220749673";

export const SITE_CONFIG = {
  // Contact details
  contactEmail:
    (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) ?? "kalerbodyfocus@gmail.com",
  whatsAppNumber: WA_NUMBER,
  whatsAppUrl: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Ranjit, I'm interested in coaching.")}`,
  instagramUrl: "https://instagram.com/kalerbodyfocus",
  facebookUrl: "https://www.facebook.com/share/1D28xpLREs/?mibextid=wwXIfr",
  googleBusinessUrl: "https://share.google/z4R22PV9UCgxolbCb",
  googleReviewsWidgetUrl: "",
  // Google Reviews Trustindex Widget ID
  googleReviewsWidgetId: "64161f1747bc903bc476032cadf",
  location: "Christchurch, New Zealand",

  // Call-To-Action (CTA) Copy
  cta: {
    heroPrimary: "Book In-Person Consultation",
    heroSecondary: "Start Online Coaching",
    heroSupport: "Free 60-Minute In-Person Consultation in Christchurch",
    personalPrimary: "Book Free 60-Min Consultation",
    mobileSticky: "Book Free Consultation",
    contactPrimary: "Schedule Your Free Consultation",
    navHeader: "Book Consultation",
    navOpenScreen: "Book Free Consultation",
  },

  // FAQ contents
  faq: [
    {
      q: "Where are you based?",
      a: "Christchurch, New Zealand — for 1-on-1 personal training. Online coaching is available worldwide.",
    },
    {
      q: "Do I need gym experience?",
      a: "No. Most clients start as complete beginners. Every plan is built for your current level.",
    },
    {
      q: "How long until I see results?",
      a: "Most clients notice meaningful change within 4–6 weeks. Lasting transformations are built over 12+ weeks of consistency.",
    },
    {
      q: "What's included in online coaching?",
      a: "Custom training programs delivered through my app, nutrition guidance, weekly check-ins, WhatsApp support, and exercise technique reviews.",
    },
    {
      q: "Do you offer nutrition plans?",
      a: "Yes — practical, sustainable strategies that fit your lifestyle. No crash diets, ever.",
    },
    {
      q: "What's the consultation like?",
      a: "A relaxed conversation about your goals, history, and lifestyle. Zero pressure — just clarity.",
    },
  ],

  // Default Testimonials
  testimonials: [
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
  ],

  transformations: [
    { tag: "Fat Loss", value: "-18kg", text: "12-week transformation", clientName: "Sarah M." },
    { tag: "Muscle Gain", value: "+9kg", text: "Lean tissue in 24 weeks", clientName: "James K." },
    { tag: "Strength", value: "+45%", text: "Total compound lifts", clientName: "Tom R." },
    { tag: "Body Recomp", value: "-12%", text: "Body fat reduction", clientName: "Priya N." },
    { tag: "Confidence", value: "100%", text: "Lifestyle reset", clientName: "Judith" },
    { tag: "Performance", value: "PR", text: "First pull-up unlocked", clientName: "Aroha W." },
  ],

  // Default copies for editable sections
  hero: {
    titleLine1: "Train With",
    titleLine2: "Focus.",
    titleLine3: "Not Frustration.",
    description: "Get a coach who builds your plan, your way — and actually stays with you. Evidence-based training, real nutrition strategy, and accountability that delivers measurable results.",
    stat1: { value: 500, suffix: "+", label: "Sessions Delivered" },
    stat2: { value: 98, suffix: "%", label: "Client Satisfaction" },
    stat3: { value: 7, suffix: "+", label: "Years Coaching" },
  },
  trustBar: [
    "Evidence-Based Training",
    "Christchurch Personal Training",
    "Online Coaching Worldwide",
    "Nutrition Guidance",
    "Accountability Coaching",
  ],
  about: {
    title: "Ranjit Singh.",
    subtitle: "Built to Coach.",
    paragraph1: "I'm Ranjit Singh, Founder of Kaler Body Focus and a Personal Trainer based in New Zealand. I work with busy professionals, parents, and everyday people tired of wasting time on programs that don't deliver lasting results.",
    paragraph2: "My coaching combines evidence-based training, practical nutrition strategies, accountability, and personalized support to build stronger bodies, healthier lifestyles, and long-term confidence.",
    tags: ["No shortcuts", "No crash diets", "No generic programs"],
    statValue: "7+",
    statLabel: "Years transforming busy professionals & parents",
  },
  personal: {
    title: "Personal Coaching.",
    subtitle: "Personalized Results.",
    description: "Train directly with Ranjit Singh in Christchurch. Every session is tailored to your body, your goals, and your life.",
    includes: [
      "Personalized training plans",
      "Goal-based programming",
      "Exercise technique coaching",
      "Progress tracking",
      "Accountability support",
      "Nutrition guidance",
      "Injury prevention strategies",
      "Ongoing program adjustments",
    ],
    idealFor: [
      "Beginners",
      "Busy professionals",
      "Weight loss clients",
      "Muscle building clients",
      "Strength-focused clients",
    ],
  },
  online: {
    title: "Professional Coaching",
    subtitle: "Wherever You Are.",
    description: "Coaching that travels with you — built for results no matter your time zone, schedule, or equipment.",
    features: [
      "Customized training plans",
      "Nutrition guidance",
      "WhatsApp support",
      "Weekly check-ins",
      "Progress monitoring",
      "Video exercise guidance",
      "Goal tracking",
      "Lifestyle coaching",
    ],
  },
  contact: {
    title: "Let's get started.",
    description: "Have questions or ready to start your journey? Drop a message below and Ranjit will get in touch with you personally.",
  },
  services: [
    { icon: "Dumbbell", title: "1-on-1 Personal Training", description: "Direct in-person coaching in Christchurch." },
    { icon: "Activity", title: "Online Coaching", description: "Tailored programs delivered worldwide." },
    { icon: "Target", title: "Fat Loss Coaching", description: "Sustainable strategies — no crash diets." },
    { icon: "Trophy", title: "Muscle Building Programs", description: "Structured hypertrophy for real growth." },
    { icon: "Shield", title: "Strength Training", description: "Powerlifting fundamentals & progressive overload." },
    { icon: "Apple", title: "Nutrition Guidance", description: "Practical plans that fit your lifestyle." },
    { icon: "Heart", title: "Injury Rehab & Movement", description: "Correct imbalances. Train pain-free." },
    { icon: "Brain", title: "Accountability & Tracking", description: "Weekly check-ins that keep you moving." },
    { icon: "Star", title: "Goal Setting & Mindset", description: "Build the mental side of physical change." },
    { icon: "ChevronRight", title: "Beginner to Advanced", description: "Programs that scale with your level." },
    { icon: "Clock", title: "Flexible Scheduling", description: "Sessions that work around your week." },
  ],
};
