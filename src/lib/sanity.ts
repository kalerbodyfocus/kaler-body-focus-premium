import { createClient } from "@sanity/client";
import { SITE_CONFIG } from "@/config/site-config";

// Read environment variables
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || "production";

// Create client
export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-03-11",
      useCdn: false, // Set to false to bypass CDN cache and get live content immediately on publish
    })
  : null;

// FAQ interface
export interface FaqItem {
  q: string;
  a: string;
}

// Testimonial interface
export interface TestimonialItem {
  id: string;
  clientName: string;
  clientRole: string;
  transformationSummary: string;
  testimonialText: string;
  videoUrl?: string;
  thumbnail?: string;
}

// Transformation interface
export interface TransformationItem {
  clientName?: string;
  tag: string;
  value: string;
  text: string;
  beforeImage?: string;
  afterImage?: string;
}

// Service interface
export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

// Site Settings interface
export interface SiteSettings {
  whatsAppNumber?: string;
  contactEmail?: string;
  locationText?: string;
  googleBusinessUrl?: string;
  googleReviewsWidgetId?: string;
  googleReviewsWidgetUrl?: string;
  heroPrimaryCta?: string;
  heroSecondaryCta?: string;
  freeConsultationAlert?: string;
  formShowAge?: boolean;
  formShowBodyStats?: boolean;
  formShowWhatsApp?: boolean;

  // Form question labels (editable from Sanity)
  formMotivationQuestion?: string;
  formOutcomeQuestion?: string;
  formStruggleQuestion?: string;
  formPreviousQuestion?: string;
  formGoalQuestion?: string;
  formSourceQuestion?: string;

  // New Copywriting Fields
  heroImage?: string;
  heroTitleLine1?: string;
  heroTitleLine2?: string;
  heroTitleLine3?: string;
  heroDescription?: string;
  heroStat1Value?: number;
  heroStat1Suffix?: string;
  heroStat1Label?: string;
  heroStat2Value?: number;
  heroStat2Suffix?: string;
  heroStat2Label?: string;
  heroStat3Value?: number;
  heroStat3Suffix?: string;
  heroStat3Label?: string;

  trustBarItems?: string[];

  aboutTitle?: string;
  aboutSubtitle?: string;
  aboutParagraph1?: string;
  aboutParagraph2?: string;
  aboutTags?: string[];
  aboutStatValue?: string;
  aboutStatLabel?: string;
  aboutImage?: string;

  personalTitle?: string;
  personalSubtitle?: string;
  personalDescription?: string;
  personalIncludes?: string[];
  personalIdealFor?: string[];
  personalImage?: string;

  onlineTitle?: string;
  onlineSubtitle?: string;
  onlineDescription?: string;
  onlineFeatures?: string[];
  onlineImage?: string;

  contactTitle?: string;
  contactDescription?: string;
}

// Combined dynamic page data interface
export interface PageContent {
  faqs: FaqItem[];
  testimonials: TestimonialItem[];
  transformations: TransformationItem[];
  services: ServiceItem[];
  settings: SiteSettings;
}

// 1. Fetch FAQs
export async function getFaqs(): Promise<FaqItem[]> {
  if (!client) return SITE_CONFIG.faq;
  try {
    const rawFaqs = await client.fetch<Array<{ question: string; answer: string }>>(
      `*[_type == "faq"] | order(order asc)`,
    );
    if (!rawFaqs || rawFaqs.length === 0) return SITE_CONFIG.faq;
    return rawFaqs.map((item) => ({
      q: item.question,
      a: item.answer,
    }));
  } catch (error) {
    console.warn("Failed to fetch FAQs from Sanity, falling back to static config:", error);
    return SITE_CONFIG.faq;
  }
}

// 2. Fetch Testimonials
export async function getTestimonials(): Promise<TestimonialItem[]> {
  if (!client) return SITE_CONFIG.testimonials;
  try {
    interface RawTestimonial {
      _id: string;
      clientName: string;
      clientRole: string;
      transformationSummary: string;
      testimonialText: string;
      videoUrl?: string;
      thumbnail?: string;
    }
    const rawTestimonials = await client.fetch<RawTestimonial[]>(
      `*[_type == "testimonial"] | order(order asc) {
        _id,
        clientName,
        clientRole,
        transformationSummary,
        testimonialText,
        "videoUrl": coalesce(videoFile.asset->url, videoUrl),
        "thumbnail": thumbnail.asset->url
      }`,
    );
    if (!rawTestimonials || rawTestimonials.length === 0) return SITE_CONFIG.testimonials;
    return rawTestimonials.map((item) => ({
      id: item._id,
      clientName: item.clientName,
      clientRole: item.clientRole,
      transformationSummary: item.transformationSummary,
      testimonialText: item.testimonialText,
      videoUrl: item.videoUrl || "",
      thumbnail: item.thumbnail || "",
    }));
  } catch (error) {
    console.warn("Failed to fetch Testimonials from Sanity, falling back to static config:", error);
    return SITE_CONFIG.testimonials;
  }
}

// 3. Fetch Transformations
export async function getTransformations(): Promise<TransformationItem[]> {
  if (!client) return SITE_CONFIG.transformations;
  try {
    const rawTransformations = await client.fetch<TransformationItem[]>(
      `*[_type == "transformation"] | order(order asc) {
        clientName,
        tag,
        value,
        text,
        "beforeImage": beforeImage.asset->url,
        "afterImage": afterImage.asset->url
      }`,
    );
    if (!rawTransformations || rawTransformations.length === 0) return SITE_CONFIG.transformations;
    return rawTransformations;
  } catch (error) {
    console.warn("Failed to fetch Transformations from Sanity, falling back to static:", error);
    return SITE_CONFIG.transformations;
  }
}

// 4. Fetch Services
export async function getServices(): Promise<ServiceItem[]> {
  if (!client) return SITE_CONFIG.services;
  try {
    const rawServices = await client.fetch<ServiceItem[]>(
      `*[_type == "service"] | order(order asc) { icon, title, description }`,
    );
    if (!rawServices || rawServices.length === 0) return SITE_CONFIG.services;
    return rawServices;
  } catch (error) {
    console.warn("Failed to fetch Services from Sanity, falling back to static config:", error);
    return SITE_CONFIG.services;
  }
}

// 5. Fetch Site Settings
export async function getSiteSettings(): Promise<SiteSettings> {
  const defaults: SiteSettings = {
    whatsAppNumber: SITE_CONFIG.whatsAppNumber,
    contactEmail: SITE_CONFIG.contactEmail,
    locationText: SITE_CONFIG.location,
    googleBusinessUrl: SITE_CONFIG.googleBusinessUrl,
    heroPrimaryCta: SITE_CONFIG.cta.heroPrimary,
    heroSecondaryCta: SITE_CONFIG.cta.heroSecondary,
    freeConsultationAlert: SITE_CONFIG.cta.heroSupport,
    formShowAge: true,
    formShowBodyStats: true,
    formShowWhatsApp: true,

    formMotivationQuestion: "Why Did You Decide to Start Your Fitness Journey Now?",
    formOutcomeQuestion: "What Are Your Expected Outcomes from This Coaching Program?",
    formStruggleQuestion: "What Is Your Biggest Fitness Struggle?",
    formPreviousQuestion: "Why Have Your Previous Attempts Failed?",
    formGoalQuestion: "What Is Your Primary Goal?",
    formSourceQuestion: "How Did You Hear About Us?",

    heroImage: undefined,
    heroTitleLine1: SITE_CONFIG.hero.titleLine1,
    heroTitleLine2: SITE_CONFIG.hero.titleLine2,
    heroTitleLine3: SITE_CONFIG.hero.titleLine3,
    heroDescription: SITE_CONFIG.hero.description,
    heroStat1Value: SITE_CONFIG.hero.stat1.value,
    heroStat1Suffix: SITE_CONFIG.hero.stat1.suffix,
    heroStat1Label: SITE_CONFIG.hero.stat1.label,
    heroStat2Value: SITE_CONFIG.hero.stat2.value,
    heroStat2Suffix: SITE_CONFIG.hero.stat2.suffix,
    heroStat2Label: SITE_CONFIG.hero.stat2.label,
    heroStat3Value: SITE_CONFIG.hero.stat3.value,
    heroStat3Suffix: SITE_CONFIG.hero.stat3.suffix,
    heroStat3Label: SITE_CONFIG.hero.stat3.label,

    trustBarItems: SITE_CONFIG.trustBar,

    aboutTitle: SITE_CONFIG.about.title,
    aboutSubtitle: SITE_CONFIG.about.subtitle,
    aboutParagraph1: SITE_CONFIG.about.paragraph1,
    aboutParagraph2: SITE_CONFIG.about.paragraph2,
    aboutTags: SITE_CONFIG.about.tags,
    aboutStatValue: SITE_CONFIG.about.statValue,
    aboutStatLabel: SITE_CONFIG.about.statLabel,

    personalTitle: SITE_CONFIG.personal.title,
    personalSubtitle: SITE_CONFIG.personal.subtitle,
    personalDescription: SITE_CONFIG.personal.description,
    personalIncludes: SITE_CONFIG.personal.includes,
    personalIdealFor: SITE_CONFIG.personal.idealFor,
    personalImage: undefined,

    onlineTitle: SITE_CONFIG.online.title,
    onlineSubtitle: SITE_CONFIG.online.subtitle,
    onlineDescription: SITE_CONFIG.online.description,
    onlineFeatures: SITE_CONFIG.online.features,

    contactTitle: SITE_CONFIG.contact.title,
    contactDescription: SITE_CONFIG.contact.description,
  };

  if (!client) return defaults;
  try {
    const settings = await client.fetch<SiteSettings>(
      `*[_type == "siteSettings"][0] {
        whatsAppNumber,
        contactEmail,
        locationText,
        googleBusinessUrl,
        googleReviewsWidgetId,
        googleReviewsWidgetUrl,
        heroPrimaryCta,
        heroSecondaryCta,
        freeConsultationAlert,
        formShowAge,
        formShowBodyStats,
        formShowWhatsApp,
        formMotivationQuestion,
        formOutcomeQuestion,
        formStruggleQuestion,
        formPreviousQuestion,
        formGoalQuestion,
        formSourceQuestion,

        heroTitleLine1,
        heroTitleLine2,
        heroTitleLine3,
        heroDescription,
        "heroImage": heroImage.asset->url,
        heroStat1Value,
        heroStat1Suffix,
        heroStat1Label,
        heroStat2Value,
        heroStat2Suffix,
        heroStat2Label,
        heroStat3Value,
        heroStat3Suffix,
        heroStat3Label,

        trustBarItems,

        aboutTitle,
        aboutSubtitle,
        aboutParagraph1,
        aboutParagraph2,
        aboutTags,
        aboutStatValue,
        aboutStatLabel,
        "aboutImage": aboutImage.asset->url,

        personalTitle,
        personalSubtitle,
        personalDescription,
        personalIncludes,
        personalIdealFor,
        "personalImage": personalImage.asset->url,

        onlineTitle,
        onlineSubtitle,
        onlineDescription,
        onlineFeatures,
        "onlineImage": onlineImage.asset->url,

        contactTitle,
        contactDescription
      }`,
    );
    if (!settings) return defaults;

    // Return merge of non-empty attributes
    return {
      whatsAppNumber: settings.whatsAppNumber || defaults.whatsAppNumber,
      contactEmail: settings.contactEmail || defaults.contactEmail,
      locationText: settings.locationText || defaults.locationText,
      googleBusinessUrl: settings.googleBusinessUrl || defaults.googleBusinessUrl,
      googleReviewsWidgetId: settings.googleReviewsWidgetId || defaults.googleReviewsWidgetId,
      googleReviewsWidgetUrl: settings.googleReviewsWidgetUrl || defaults.googleReviewsWidgetUrl,
      heroPrimaryCta: settings.heroPrimaryCta || defaults.heroPrimaryCta,
      heroSecondaryCta: settings.heroSecondaryCta || defaults.heroSecondaryCta,
      freeConsultationAlert: settings.freeConsultationAlert || defaults.freeConsultationAlert,
      formShowAge: settings.formShowAge !== undefined ? settings.formShowAge : defaults.formShowAge,
      formShowBodyStats: settings.formShowBodyStats !== undefined ? settings.formShowBodyStats : defaults.formShowBodyStats,
      formShowWhatsApp: settings.formShowWhatsApp !== undefined ? settings.formShowWhatsApp : defaults.formShowWhatsApp,

      formMotivationQuestion: settings.formMotivationQuestion || defaults.formMotivationQuestion,
      formOutcomeQuestion: settings.formOutcomeQuestion || defaults.formOutcomeQuestion,
      formStruggleQuestion: settings.formStruggleQuestion || defaults.formStruggleQuestion,
      formPreviousQuestion: settings.formPreviousQuestion || defaults.formPreviousQuestion,
      formGoalQuestion: settings.formGoalQuestion || defaults.formGoalQuestion,
      formSourceQuestion: settings.formSourceQuestion || defaults.formSourceQuestion,

      heroTitleLine1: settings.heroTitleLine1 || defaults.heroTitleLine1,
      heroTitleLine2: settings.heroTitleLine2 || defaults.heroTitleLine2,
      heroTitleLine3: settings.heroTitleLine3 || defaults.heroTitleLine3,
      heroDescription: settings.heroDescription || defaults.heroDescription,
      heroImage: settings.heroImage || defaults.heroImage,
      heroStat1Value: settings.heroStat1Value !== undefined ? settings.heroStat1Value : defaults.heroStat1Value,
      heroStat1Suffix: settings.heroStat1Suffix || defaults.heroStat1Suffix,
      heroStat1Label: settings.heroStat1Label || defaults.heroStat1Label,
      heroStat2Value: settings.heroStat2Value !== undefined ? settings.heroStat2Value : defaults.heroStat2Value,
      heroStat2Suffix: settings.heroStat2Suffix || defaults.heroStat2Suffix,
      heroStat2Label: settings.heroStat2Label || defaults.heroStat2Label,
      heroStat3Value: settings.heroStat3Value !== undefined ? settings.heroStat3Value : defaults.heroStat3Value,
      heroStat3Suffix: settings.heroStat3Suffix || defaults.heroStat3Suffix,
      heroStat3Label: settings.heroStat3Label || defaults.heroStat3Label,

      trustBarItems: settings.trustBarItems,

      aboutTitle: settings.aboutTitle || defaults.aboutTitle,
      aboutSubtitle: settings.aboutSubtitle || defaults.aboutSubtitle,
      aboutParagraph1: settings.aboutParagraph1 || defaults.aboutParagraph1,
      aboutParagraph2: settings.aboutParagraph2 || defaults.aboutParagraph2,
      aboutTags: settings.aboutTags && settings.aboutTags.length > 0 ? settings.aboutTags : defaults.aboutTags,
      aboutStatValue: settings.aboutStatValue || defaults.aboutStatValue,
      aboutStatLabel: settings.aboutStatLabel || defaults.aboutStatLabel,
      aboutImage: settings.aboutImage || defaults.aboutImage,

      personalTitle: settings.personalTitle || defaults.personalTitle,
      personalSubtitle: settings.personalSubtitle || defaults.personalSubtitle,
      personalDescription: settings.personalDescription || defaults.personalDescription,
      personalIncludes: settings.personalIncludes && settings.personalIncludes.length > 0 ? settings.personalIncludes : defaults.personalIncludes,
      personalIdealFor: settings.personalIdealFor && settings.personalIdealFor.length > 0 ? settings.personalIdealFor : defaults.personalIdealFor,
      personalImage: settings.personalImage || defaults.personalImage,

      onlineTitle: settings.onlineTitle || defaults.onlineTitle,
      onlineSubtitle: settings.onlineSubtitle || defaults.onlineSubtitle,
      onlineDescription: settings.onlineDescription || defaults.onlineDescription,
      onlineFeatures: settings.onlineFeatures && settings.onlineFeatures.length > 0 ? settings.onlineFeatures : defaults.onlineFeatures,
      onlineImage: settings.onlineImage || defaults.onlineImage,

      contactTitle: settings.contactTitle || defaults.contactTitle,
      contactDescription: settings.contactDescription || defaults.contactDescription,
    };
  } catch (error) {
    console.warn("Failed to fetch Site Settings from Sanity, falling back to defaults:", error);
    return defaults;
  }
}

// 6. Consolidated fetching function
export async function getSanityContent(): Promise<PageContent> {
  const [faqs, testimonials, transformations, services, settings] = await Promise.all([
    getFaqs(),
    getTestimonials(),
    getTransformations(),
    getServices(),
    getSiteSettings(),
  ]);

  return {
    faqs,
    testimonials,
    transformations,
    services,
    settings,
  };
}
