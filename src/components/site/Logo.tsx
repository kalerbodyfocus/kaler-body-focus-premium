import { motion } from "framer-motion";
import logoImg from "@/assets/logo.png";

interface LogoProps {
  variant?: "nav" | "nav-mobile" | "footer";
  scrolled?: boolean;
}

export default function Logo({ variant = "nav", scrolled = false }: LogoProps) {
  if (variant === "nav") {
    return (
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.015 }}
        className="flex items-center gap-2 md:gap-3 shrink-0 cursor-pointer origin-left"
      >
        <motion.img
          layout
          src={logoImg}
          alt="Kaler Body Focus"
          className={`w-auto object-contain select-none pointer-events-none transition-all duration-300 ${
            scrolled ? "h-6 md:h-7" : "h-7.5 md:h-9 lg:h-10"
          }`}
          style={{
            filter:
              "drop-shadow(0px 0px 1.5px rgba(255, 255, 255, 0.45)) drop-shadow(0px 0px 10px rgba(212, 175, 55, 0.25))",
          }}
        />
        <motion.span
          layout
          className={`font-display font-black tracking-tight text-foreground transition-all duration-300 whitespace-nowrap uppercase ${
            scrolled
              ? "text-xs sm:text-sm md:text-base"
              : "text-sm sm:text-base md:text-lg lg:text-xl"
          }`}
        >
          KALER<span className="text-gold">.</span> BODY FOCUS
        </motion.span>
      </motion.div>
    );
  }

  if (variant === "nav-mobile") {
    return (
      <div className="flex items-center gap-2 shrink-0">
        <img
          src={logoImg}
          alt="Kaler Body Focus"
          className="h-8 w-auto object-contain select-none pointer-events-none"
          style={{
            filter:
              "drop-shadow(0px 0px 1.5px rgba(255, 255, 255, 0.45)) drop-shadow(0px 0px 10px rgba(212, 175, 55, 0.25))",
          }}
        />
        <span className="font-display font-black text-sm tracking-tight uppercase whitespace-nowrap">
          KALER<span className="text-gold">.</span> BODY FOCUS
        </span>
      </div>
    );
  }

  // Footer variant
  return (
    <div className="flex items-center gap-3 shrink-0">
      <img
        src={logoImg}
        alt="Kaler Body Focus"
        className="h-12 w-auto object-contain select-none pointer-events-none"
        style={{
          filter:
            "drop-shadow(0px 0px 1.5px rgba(255, 255, 255, 0.45)) drop-shadow(0px 0px 10px rgba(212, 175, 55, 0.25))",
        }}
      />
      <span className="font-display font-black text-base md:text-lg tracking-tight uppercase whitespace-nowrap">
        KALER<span className="text-gold">.</span> BODY FOCUS
      </span>
    </div>
  );
}

export type { LogoProps };
