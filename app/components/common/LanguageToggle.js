import React from "react";
import { useLanguage } from "../../hooks/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  const nextLang = language === "en" ? "es" : "en";

  return (
    <button
      onClick={() => setLanguage(nextLang)}
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 1000,
        padding: "0.5em 1em",
        borderRadius: "20px",
        border: "1px solid #ccc",
        background: "#fff",
        cursor: "pointer",
        fontWeight: "bold"
      }}
      aria-label={t("toggle_language")}
    >
      {t("toggle_language")}
    </button>
  );
} 