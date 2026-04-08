import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Language {
  code: string;
  name: string;
  flag: string;
}

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
          elementId: string
        ) => void;
      };
    };
  }
}

// ─── Constants ────────────────────────────────────────────────────────────────

const LANGUAGES: Language[] = [
  { code: "fr", name: "Français",   flag: "🇫🇷" },
  { code: "en", name: "English",    flag: "🇬🇧" },
  { code: "es", name: "Español",    flag: "🇪🇸" },
  { code: "de", name: "Deutsch",    flag: "🇩🇪" },
  { code: "ar", name: "العربية",    flag: "🇸🇦" },
  { code: "it", name: "Italiano",   flag: "🇮🇹" },
  { code: "pt", name: "Português",  flag: "🇵🇹" },
  { code: "zh", name: "中文",        flag: "🇨🇳" },
  { code: "ja", name: "日本語",      flag: "🇯🇵" },
  { code: "ko", name: "한국어",      flag: "🇰🇷" },
  { code: "ru", name: "Русский",    flag: "🇷🇺" },
];

const DEFAULT_LANG = LANGUAGES[0]; // Français
const LS_KEY = "preferred_language";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getLangByCode(code: string): Language {
  return LANGUAGES.find((l) => l.code === code) ?? DEFAULT_LANG;
}

function triggerGoogleTranslate(langCode: string): void {
  const select = document.querySelector<HTMLSelectElement>(
    ".goog-te-combo, #google_translate_element select"
  );

  if (!select) {
    console.warn("[FooterTranslate] Google Translate select not found yet.");
    return;
  }

  select.value = langCode;
  select.dispatchEvent(new Event("change"));
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FooterTranslate() {
  const [currentLang, setCurrentLang] = useState<Language>(DEFAULT_LANG);
  const [isOpen, setIsOpen] = useState(false);
  const [gtReady, setGtReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Load Google Translate script once ──────────────────────────────────────
  useEffect(() => {
    // Restore saved language preference
    const saved = localStorage.getItem(LS_KEY);
    if (saved) setCurrentLang(getLangByCode(saved));

    if (document.getElementById("gt-script")) {
      setGtReady(true);
      return;
    }

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "fr",
          includedLanguages: LANGUAGES.map((l) => l.code).join(","),
          autoDisplay: false,
        },
        "google_translate_element"
      );
      setGtReady(true);

      // Apply saved lang after widget is ready
      const saved = localStorage.getItem(LS_KEY);
      if (saved && saved !== "fr") {
        setTimeout(() => triggerGoogleTranslate(saved), 500);
      }
    };

    const script = document.createElement("script");
    script.id = "gt-script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  // ── Close dropdown on outside click ────────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Handle language selection ───────────────────────────────────────────────
  const handleSelect = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem(LS_KEY, lang.code);
    setIsOpen(false);

    if (lang.code === "fr") {
      // Revert to original
      const banner = document.querySelector<HTMLElement>(".goog-te-banner-frame");
      if (banner) banner.style.display = "none";
      const restore = document.querySelector<HTMLAnchorElement>(".goog-te-menu-value span");
      if (restore) restore.click();
      // Reload to restore original French
      const iframe = document.querySelector<HTMLIFrameElement>("#\\:1\\.container");
      if (!iframe) window.location.reload();
    } else {
      triggerGoogleTranslate(lang.code);
    }
  };

  const isTranslated = currentLang.code !== "fr";

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Hidden Google Translate widget — must stay in DOM */}
      <div
        id="google_translate_element"
        style={{ display: "none", position: "absolute", visibility: "hidden" }}
        aria-hidden="true"
      />

      <div ref={containerRef} style={styles.wrapper}>
        {/* Translated indicator */}
        {isTranslated && (
          <span style={styles.indicator}>
            Traduit en {currentLang.flag} {currentLang.name}
          </span>
        )}

        {/* Toggle button */}
        <button
          onClick={() => setIsOpen((o) => !o)}
          style={styles.button}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          title="Changer la langue"
        >
          <span style={styles.flag}>{currentLang.flag}</span>
          <span style={styles.langName}>{currentLang.name}</span>
          <span
            style={{
              ...styles.arrow,
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            ▲
          </span>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <ul style={styles.dropdown} role="listbox" aria-label="Sélectionner une langue">
            {LANGUAGES.map((lang) => {
              const isActive = lang.code === currentLang.code;
              return (
                <li
                  key={lang.code}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleSelect(lang)}
                  style={{
                    ...styles.option,
                    ...(isActive ? styles.optionActive : {}),
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLLIElement).style.backgroundColor = "#2a2a2a";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLLIElement).style.backgroundColor = "transparent";
                  }}
                >
                  <span style={styles.optionFlag}>{lang.flag}</span>
                  <span>{lang.name}</span>
                  {isActive && <span style={styles.check}>✓</span>}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: "relative",
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "6px",
    fontFamily: "inherit",
  },
  indicator: {
    fontSize: "11px",
    color: "#f59e0b",
    opacity: 0.85,
    letterSpacing: "0.02em",
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "7px 12px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "8px",
    color: "#e5e7eb",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.2s, border-color 0.2s",
    outline: "none",
  },
  flag: {
    fontSize: "18px",
    lineHeight: 1,
  },
  langName: {
    fontSize: "13px",
    fontWeight: 500,
    minWidth: "60px",
  },
  arrow: {
    fontSize: "9px",
    color: "#f59e0b",
    transition: "transform 0.2s ease",
    display: "inline-block",
  },
  dropdown: {
    position: "absolute",
    bottom: "calc(100% + 8px)",
    right: 0,
    width: "200px",
    background: "#1a1a1a",
    border: "1px solid rgba(245,158,11,0.25)",
    borderRadius: "10px",
    boxShadow: "0 -8px 32px rgba(0,0,0,0.5)",
    listStyle: "none",
    margin: 0,
    padding: "6px",
    zIndex: 9999,
    overflowY: "auto",
    maxHeight: "340px",
  },
  option: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "9px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    color: "#d1d5db",
    fontSize: "13px",
    transition: "background 0.15s",
  },
  optionActive: {
    background: "rgba(245,158,11,0.15)",
    color: "#f59e0b",
    fontWeight: 600,
  },
  optionFlag: {
    fontSize: "18px",
    lineHeight: 1,
    flexShrink: 0,
  },
  check: {
    marginLeft: "auto",
    color: "#f59e0b",
    fontSize: "12px",
  },
};