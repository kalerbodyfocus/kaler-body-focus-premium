import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Search } from "lucide-react";
import { COUNTRIES, getFlagEmoji } from "@/lib/countries";

interface PhoneInputProps {
  label: string;
  required?: boolean;
  countryCode: string;
  phoneNumber: string;
  onChange: (countryCode: string, phoneNumber: string) => void;
  placeholder?: string;
  error?: string;
}

export function PhoneInput({
  label,
  required,
  countryCode,
  phoneNumber,
  onChange,
  placeholder,
  error,
}: PhoneInputProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedCountry = useMemo(() => {
    return COUNTRIES.find((c) => c.code === countryCode) || COUNTRIES[0];
  }, [countryCode]);

  // Filter countries based on search query
  const filteredCountries = useMemo(() => {
    if (!search) return COUNTRIES;
    const query = search.toLowerCase();
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.dialCode.toLowerCase().includes(query) ||
        c.code.toLowerCase().includes(query),
    );
  }, [search]);

  // Reset search and highlighted index when popover closes/opens
  useEffect(() => {
    if (!open) {
      setSearch("");
      setHighlightedIndex(-1);
    } else {
      const initialIndex = filteredCountries.findIndex((c) => c.code === countryCode);
      setHighlightedIndex(initialIndex >= 0 ? initialIndex : 0);
    }
  }, [open, countryCode, filteredCountries]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "Enter" || e.key === "Space" || e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredCountries.length) {
          onChange(filteredCountries[highlightedIndex].code, phoneNumber);
          setOpen(false);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          filteredCountries.length === 0 ? -1 : (prev + 1) % filteredCountries.length,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          filteredCountries.length === 0
            ? -1
            : (prev - 1 + filteredCountries.length) % filteredCountries.length,
        );
        break;
    }
  };

  // Scroll active item into view inside the dropdown list
  useEffect(() => {
    if (open && listRef.current && highlightedIndex >= 0) {
      const listEl = listRef.current;
      const itemEl = listEl.children[highlightedIndex] as HTMLElement;
      if (itemEl) {
        const listHeight = listEl.clientHeight;
        const itemTop = itemEl.offsetTop;
        const itemHeight = itemEl.clientHeight;

        if (itemTop + itemHeight > listEl.scrollTop + listHeight) {
          listEl.scrollTop = itemTop + itemHeight - listHeight;
        } else if (itemTop < listEl.scrollTop) {
          listEl.scrollTop = itemTop;
        }
      }
    }
  }, [highlightedIndex, open]);

  return (
    <div className="flex flex-col relative" ref={containerRef} onKeyDown={handleKeyDown}>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
        {required && <span className="text-gold"> *</span>}
      </label>

      <div className="flex gap-2 mt-2 relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={`flex items-center justify-between gap-2 h-12 bg-[#0B0B0B] border rounded-xl px-3.5 text-sm text-foreground hover:border-gold/40 hover:shadow-[0_0_15px_rgba(212,175,55,0.1)] focus:border-gold focus:outline-none transition-all duration-200 cursor-pointer select-none shrink-0 min-w-[115px] ${
            open ? "border-gold ring-1 ring-gold/20" : "border-white/10"
          }`}
        >
          <span className="text-base leading-none select-none">
            {getFlagEmoji(selectedCountry.code)}
          </span>
          <span className="font-medium">{selectedCountry.dialCode}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-muted-foreground shrink-0 transition-transform duration-250 ${
              open ? "rotate-180 text-gold" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -5, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-50 w-[280px] left-0 top-full mt-2 bg-[#0B0B0B] border border-gold/25 rounded-xl shadow-[0_10px_45px_-5px_rgba(0,0,0,0.95),_0_0_20px_rgba(212,175,55,0.06)] overflow-hidden"
            >
              <div className="flex items-center gap-2 px-3.5 py-3 border-b border-white/5 bg-white/[0.01]">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Search country or code..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent border-0 p-0 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-0"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div
                ref={listRef}
                role="listbox"
                className="max-h-[220px] overflow-y-auto p-1.5 scrollbar-thin"
              >
                {filteredCountries.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                    No country found
                  </div>
                ) : (
                  filteredCountries.map((c, idx) => {
                    const isSelected = c.code === countryCode;
                    const isHighlighted = idx === highlightedIndex;
                    return (
                      <div
                        key={c.code}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          onChange(c.code, phoneNumber);
                          setOpen(false);
                        }}
                        onMouseEnter={() => setHighlightedIndex(idx)}
                        className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm transition-all duration-150 cursor-pointer select-none ${
                          isSelected
                            ? "bg-gold/15 text-gold font-bold"
                            : isHighlighted
                              ? "bg-white/5 text-foreground"
                              : "text-foreground/80 hover:bg-white/[0.02]"
                        }`}
                      >
                        <span className="text-base leading-none select-none">
                          {getFlagEmoji(c.code)}
                        </span>
                        <span className="flex-1 truncate text-foreground/90">{c.name}</span>
                        <span className="text-muted-foreground text-xs font-mono shrink-0">
                          {c.dialCode}
                        </span>
                        {isSelected && <Check className="h-4 w-4 text-gold shrink-0" />}
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => {
            const val = e.target.value.replace(/[^\d\s\-()]/g, "");
            onChange(countryCode, val);
          }}
          placeholder={placeholder || "Phone Number"}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 h-12 focus:border-gold focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/60"
        />
      </div>

      {error && (
        <span className="text-[11px] text-red-500 mt-1.5 font-medium tracking-wide">{error}</span>
      )}
    </div>
  );
}
