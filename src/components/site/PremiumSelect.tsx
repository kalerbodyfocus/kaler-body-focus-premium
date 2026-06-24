import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Search } from "lucide-react";

interface PremiumSelectProps {
  label: string;
  required?: boolean;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  error?: string;
}

export function PremiumSelect({
  label,
  required,
  value,
  options,
  onChange,
  placeholder,
  searchable = false,
  error,
}: PremiumSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchable || !search) return options;
    return options.filter((o) => o.toLowerCase().includes(search.toLowerCase()));
  }, [options, search, searchable]);

  // Reset search and highlighted index when popover closes/opens
  useEffect(() => {
    if (!open) {
      setSearch("");
      setHighlightedIndex(-1);
    } else {
      const initialIndex = filteredOptions.findIndex((o) => o === value);
      setHighlightedIndex(initialIndex >= 0 ? initialIndex : 0);
    }
  }, [open, value, filteredOptions]);

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
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          onChange(filteredOptions[highlightedIndex]);
          setOpen(false);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          filteredOptions.length === 0 ? -1 : (prev + 1) % filteredOptions.length,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          filteredOptions.length === 0
            ? -1
            : (prev - 1 + filteredOptions.length) % filteredOptions.length,
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

      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`w-full mt-2 flex items-center justify-between bg-[#0B0B0B] border rounded-xl px-4 py-3.5 text-left text-foreground hover:border-gold/40 hover:shadow-[0_0_15px_rgba(212,175,55,0.1)] focus:border-gold focus:outline-none transition-all duration-200 cursor-pointer select-none ${
          open ? "border-gold ring-1 ring-gold/20" : "border-white/10"
        }`}
      >
        <span className={value ? "text-foreground font-medium" : "text-muted-foreground/60"}>
          {value || placeholder || "Select…"}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-250 ${
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
            className="absolute z-50 w-full top-full mt-2 bg-[#0B0B0B] border border-gold/25 rounded-xl shadow-[0_10px_45px_-5px_rgba(0,0,0,0.95),_0_0_20px_rgba(212,175,55,0.06)] overflow-hidden"
          >
            {searchable && (
              <div className="flex items-center gap-2 px-3.5 py-3 border-b border-white/5 bg-white/[0.01]">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Search…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent border-0 p-0 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-0"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}

            <div
              ref={listRef}
              role="listbox"
              className="max-h-[220px] overflow-y-auto p-1.5 scrollbar-thin"
            >
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                  No options found
                </div>
              ) : (
                filteredOptions.map((o, idx) => {
                  const isSelected = o === value;
                  const isHighlighted = idx === highlightedIndex;
                  return (
                    <div
                      key={o}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onChange(o);
                        setOpen(false);
                      }}
                      onMouseEnter={() => setHighlightedIndex(idx)}
                      className={`flex items-center justify-between gap-3 px-3.5 py-3 rounded-lg text-sm transition-all duration-150 cursor-pointer select-none ${
                        isSelected
                          ? "bg-gold/15 text-gold font-bold"
                          : isHighlighted
                            ? "bg-white/5 text-foreground"
                            : "text-foreground/80 hover:bg-white/[0.02]"
                      }`}
                    >
                      <span className="truncate">{o}</span>
                      {isSelected && <Check className="w-4 h-4 text-gold shrink-0" />}
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <span className="text-[11px] text-red-500 mt-1.5 font-medium tracking-wide">{error}</span>
      )}
    </div>
  );
}
