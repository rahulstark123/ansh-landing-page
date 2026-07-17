"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
} from "react";
import { createPortal } from "react-dom";
import flags from "react-phone-number-input/flags";
import type { Country } from "react-phone-number-input";

type CountryOption = {
  value?: Country;
  label: string;
  divider?: boolean;
};

type DarkCountrySelectProps = {
  value?: Country;
  onChange: (value: Country | undefined) => void;
  options: CountryOption[];
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  onFocus?: (event?: React.FocusEvent<HTMLElement>) => void;
  onBlur?: (event?: React.FocusEvent<HTMLElement>) => void;
  iconComponent?: ElementType;
};

// Safe wrapper for React layout effect to avoid Next.js/SSR warnings
const useSafeLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Generate flag emoji from country code (bulletproof fallback)
function getUnicodeFlagIcon(country: string): string {
  return country
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

function FlagIcon({ country, label }: { country?: Country; label: string }) {
  if (!country) {
    return <span className="feedback-phone-flag-fallback">🌐</span>;
  }

  // Handle potential default import wrapper from bundlers
  const flagIcons = (flags as any)?.default || flags;
  const Flag = flagIcons ? flagIcons[country] : null;

  if (Flag) {
    return (
      <span className="feedback-phone-flag" aria-hidden>
        <Flag title={label} />
      </span>
    );
  }

  return (
    <span className="feedback-phone-flag-fallback" aria-hidden>
      {getUnicodeFlagIcon(country)}
    </span>
  );
}

export function DarkCountrySelect({
  value,
  onChange,
  options,
  disabled,
  readOnly,
  name,
  onFocus,
  onBlur,
}: DarkCountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({
    position: "fixed",
    opacity: 0,
    pointerEvents: "none",
  });
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  const selected = (options || []).find((option) => option.value === value);

  const filtered = (options || []).filter((option) => {
    if (option.divider) return false;
    if (!query.trim()) return true;
    return option.label.toLowerCase().includes(query.trim().toLowerCase());
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useSafeLayoutEffect(() => {
    if (!open || !rootRef.current) return;

    const updatePosition = () => {
      const rect = rootRef.current?.getBoundingClientRect();
      if (!rect) return;

      const width = Math.min(288, window.innerWidth - 24);
      const left = Math.min(
        Math.max(12, rect.left),
        window.innerWidth - width - 12
      );
      const spaceBelow = window.innerHeight - rect.bottom - 12;
      const spaceAbove = rect.top - 12;
      const openUp = spaceBelow < 260 && spaceAbove > spaceBelow;
      const maxHeight = Math.min(280, openUp ? spaceAbove : spaceBelow);

      setMenuStyle({
        position: "fixed",
        left,
        width,
        maxHeight,
        zIndex: 9999,
        opacity: 1,
        pointerEvents: "auto",
        ...(openUp
          ? { bottom: window.innerHeight - rect.top + 8 }
          : { top: rect.bottom + 8 }),
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setMenuStyle({
        position: "fixed",
        opacity: 0,
        pointerEvents: "none",
      });
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
      setQuery("");
      onBlur?.();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setQuery("");
        onBlur?.();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onBlur]);

  useEffect(() => {
    if (open) {
      searchRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  const menu =
    open && mounted ? (
      <div
        ref={menuRef}
        className="feedback-phone-country-menu"
        style={menuStyle}
        role="presentation"
      >
        <input
          ref={searchRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search country..."
          className="feedback-phone-country-search"
          aria-label="Search country"
        />
        <ul id={listId} role="listbox" className="feedback-phone-country-list">
          {filtered.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value ?? "ZZ"} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  className={`feedback-phone-country-option${isSelected ? " is-selected" : ""}`}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                    setQuery("");
                    onBlur?.();
                  }}
                >
                  <FlagIcon country={option.value} label={option.label} />
                  <span className="feedback-phone-country-label">{option.label}</span>
                </button>
              </li>
            );
          })}
          {filtered.length === 0 ? (
            <li className="feedback-phone-country-empty">No countries found</li>
          ) : null}
        </ul>
      </div>
    ) : null;

  return (
    <div className="PhoneInputCountry feedback-phone-country" ref={rootRef}>
      <button
        type="button"
        name={name}
        disabled={disabled || readOnly}
        className="feedback-phone-country-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => {
          if (disabled || readOnly) return;
          const next = !open;
          setOpen(next);
          if (next) onFocus?.();
          else {
            setQuery("");
            onBlur?.();
          }
        }}
      >
        <FlagIcon country={value} label={selected?.label ?? "Country"} />
        <span className="PhoneInputCountrySelectArrow" aria-hidden />
      </button>

      {menu ? createPortal(menu, document.body) : null}
    </div>
  );
}
