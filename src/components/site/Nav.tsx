import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import { SiteSettings } from "@/lib/sanity";

// ─── All anchor sections (used for active tracking & mobile menu) ────────────
const allSections = [
  { href: "#home",           label: "Home" },
  { href: "#about",          label: "About Coach" },
  { href: "#personal",       label: "Personal Training" },
  { href: "#online",         label: "Online Coaching" },
  { href: "#services",       label: "Programs" },
  { href: "#transformations",label: "Success Stories" },
  { href: "#reviews",        label: "Google Reviews" },
  { href: "#testimonials",   label: "Client Reviews" },
  { href: "#faq",            label: "FAQ" },
  { href: "#contact",        label: "Contact" },
];

// ─── Desktop nav structure (top-level + optional dropdown children) ──────────
type NavItem =
  | { type: "link"; href: string; label: string }
  | { type: "dropdown"; label: string; children: { href: string; label: string }[] };

const desktopNav: NavItem[] = [
  { type: "link",     href: "#home",            label: "Home" },
  { type: "link",     href: "#about",           label: "About Coach" },
  {
    type: "dropdown", label: "Services",
    children: [
      { href: "#personal", label: "Personal Training" },
      { href: "#online",   label: "Online Coaching" },
      { href: "#services", label: "Programs" },
    ],
  },
  { type: "link", href: "#transformations", label: "Success Stories" },
  { type: "link", href: "#reviews",         label: "Google Reviews" },
  { type: "link", href: "#testimonials",    label: "Client Reviews" },
  { type: "link", href: "#faq",             label: "FAQ" },
  { type: "link", href: "#contact",         label: "Contact" },
];

// ─── Small dropdown component ────────────────────────────────────────────────
function Dropdown({
  label,
  children,
  active,
}: {
  label: string;
  children: { href: string; label: string }[];
  active: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isActive = children.some((c) => c.href === active);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 text-sm transition-colors relative ${
          isActive ? "text-gold" : "text-foreground/75 hover:text-foreground"
        }`}
      >
        {label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
        {isActive && (
          <motion.span
            layoutId="navdot"
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold"
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[176px] bg-surface/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-10"
          >
            {children.map((c) => (
              <a
                key={c.href}
                href={c.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 text-sm transition-colors ${
                  active === c.href
                    ? "text-gold bg-gold/8"
                    : "text-foreground/80 hover:text-foreground hover:bg-white/5"
                }`}
              >
                {c.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Nav ────────────────────────────────────────────────────────────────
export default function Nav({ settings }: { settings?: SiteSettings }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const y = window.scrollY + 140;
      for (let i = allSections.length - 1; i >= 0; i--) {
        const el = document.querySelector(allSections[i].href) as HTMLElement | null;
        if (el && el.offsetTop <= y) {
          setActive(allSections[i].href);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      {/* ── Desktop / tablet header ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-2.5 sm:py-3 bg-background/80 backdrop-blur-xl border-b border-white/5"
            : "py-3.5 sm:py-5 bg-transparent"
        }`}
      >
        <div className="container-px flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#home" className="flex items-center shrink-0">
            <Logo variant="nav" scrolled={scrolled} />
          </a>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {desktopNav.map((item) =>
              item.type === "link" ? (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-colors relative ${
                    active === item.href
                      ? "text-gold"
                      : "text-foreground/75 hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {active === item.href && (
                    <motion.span
                      layoutId="navdot"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold"
                    />
                  )}
                </a>
              ) : (
                <Dropdown
                  key={item.label}
                  label={item.label}
                  children={item.children}
                  active={active}
                />
              )
            )}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#inquiry"
              className="hidden md:inline-flex btn-gold btn-gold-hover text-sm !py-2.5 !px-5 whitespace-nowrap"
            >
              Book Free Consultation
            </a>
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="lg:hidden grid place-items-center w-11 h-11 rounded-full border border-white/15"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Full-screen mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-2xl"
          >
            <div className="container-px flex items-center justify-between py-5">
              <Logo variant="nav-mobile" />
              <button
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="grid place-items-center w-11 h-11 rounded-full border border-white/15"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="container-px pt-8 flex flex-col gap-1">
              {allSections.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.4 }}
                  className={`text-3xl sm:text-4xl font-display font-bold py-3 border-b border-white/5 flex justify-between items-center ${
                    active === l.href ? "text-gold" : ""
                  }`}
                >
                  <span>{l.label}</span>
                  <span className="text-xs text-muted-foreground font-sans">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.a>
              ))}

              <motion.a
                href="#inquiry"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="btn-gold btn-gold-hover mt-8 self-start"
              >
                Book Free Consultation
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
