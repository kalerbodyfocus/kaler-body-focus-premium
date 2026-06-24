import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site-config";
import { SiteSettings } from "@/lib/sanity";

export const CONTACT_EMAIL = SITE_CONFIG.contactEmail;
export const WHATSAPP = SITE_CONFIG.whatsAppUrl;
export const FACEBOOK_URL = (import.meta.env.VITE_FACEBOOK_URL as string | undefined) ?? SITE_CONFIG.facebookUrl;
export const INSTAGRAM_URL = (import.meta.env.VITE_INSTAGRAM_URL as string | undefined) ?? SITE_CONFIG.instagramUrl;

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX: w }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gold origin-left z-[70]"
    />
  );
}

export function FloatingActions({ settings }: { settings?: SiteSettings }) {
  const [show, setShow] = useState(false);
  const whatsAppUrl = settings?.whatsAppNumber
    ? `https://wa.me/${settings.whatsAppNumber}?text=${encodeURIComponent("Hi Ranjit, I'm interested in coaching.")}`
    : WHATSAPP;

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <>
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-5 right-5 z-40 grid place-items-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)] hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="fixed bottom-24 right-5 z-40 grid place-items-center w-11 h-11 rounded-full bg-white/10 backdrop-blur border border-white/15 hover:bg-gold hover:text-ink transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

export function MobileStickyCTA({ settings }: { settings?: SiteSettings }) {
  const mobileSticky = settings?.heroPrimaryCta
    ? "Book Free Consultation"
    : SITE_CONFIG.cta.mobileSticky;
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-30 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-ink via-ink/95 to-transparent">
      <a href="#inquiry" className="btn-gold btn-gold-hover w-full !py-3.5">
        {mobileSticky}
      </a>
    </div>
  );
}
