import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { SITE_CONFIG } from "@/config/site-config";
import { SiteSettings } from "@/lib/sanity";
import logoMark from "@/assets/logo-mark.png";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#personal", label: "1-on-1 Training" },
  { href: "#online", label: "Online Coaching" },
  { href: "#services", label: "Services" },
  { href: "#transformations", label: "Transformations" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const LOGO_URL = (import.meta.env.VITE_LOGO_URL as string | undefined) ?? "";

export default function Nav({ settings }: { settings?: SiteSettings }) {
  const navHeader = settings?.heroPrimaryCta ? "Book Consultation" : SITE_CONFIG.cta.navHeader;
  const navOpenScreen = settings?.heroPrimaryCta
    ? "Book Free Consultation"
    : SITE_CONFIG.cta.navOpenScreen;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = links.map((l) => document.querySelector(l.href));
      const y = window.scrollY + 140;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i] as HTMLElement | null;
        if (el && el.offsetTop <= y) {
          setActive(links[i].href);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-background/75 backdrop-blur-xl border-b border-white/5"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container-px flex items-center justify-between gap-6">
          <a href="#home" className="flex items-center shrink-0">
            <Logo variant="nav" scrolled={scrolled} />
          </a>

          <nav className="hidden lg:flex items-center gap-4 xl:gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-xs xl:text-sm transition-colors relative ${
                  active === l.href ? "text-gold" : "text-foreground/75 hover:text-foreground"
                }`}
              >
                {l.label}
                {active === l.href && (
                  <motion.span
                    layoutId="navdot"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold"
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#inquiry"
              className="hidden md:inline-flex btn-gold btn-gold-hover text-sm !py-2.5 !px-5"
            >
              {navHeader}
            </a>
            <button
              aria-label="Menu"
              onClick={() => setOpen(true)}
              className="lg:hidden grid place-items-center w-11 h-11 rounded-full border border-white/15"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-2xl"
          >
            <div className="container-px flex items-center justify-between py-5">
              <Logo variant="nav-mobile" />
              <button
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="grid place-items-center w-11 h-11 rounded-full border border-white/15"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="container-px pt-8 flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.4 }}
                  className="text-4xl sm:text-5xl font-display font-bold py-3 border-b border-white/5 flex justify-between items-center"
                >
                  <span>{l.label}</span>
                  <span className="text-xs text-muted-foreground font-sans">0{i + 1}</span>
                </motion.a>
              ))}
              <motion.a
                href="#inquiry"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="btn-gold btn-gold-hover mt-8 self-start"
              >
                {navOpenScreen}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
