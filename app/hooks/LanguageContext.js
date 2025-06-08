'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext();

const LANGUAGES = ['en', 'es'];

function getInitialLanguage() {
  // Check localStorage
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('lang');
    if (stored && LANGUAGES.includes(stored)) return stored;
    // Detect browser language
    const browserLang = navigator.language.slice(0, 2);
    if (LANGUAGES.includes(browserLang)) return browserLang;
  }
  return 'en';
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage());
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    fetch(`/locales/${language}.json`)
      .then(res => res.json())
      .then(setTranslations);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', language);
    }
  }, [language]);

  const t = (key) => translations[key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
} 