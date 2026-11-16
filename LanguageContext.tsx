import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { isArabicPath } from './data/siteConfig';

export type Language = 'en' | 'ar';

const LANG_PREF_KEY = 'smashb_preferred_lang';

interface LanguageContextProps {
  language: Language;
  dir: 'ltr' | 'rtl';
  suggestedLang: Language | null;
  saveLanguagePreference: (lang: Language) => void;
  dismissSuggestion: () => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{
  pathname: string;
  children: React.ReactNode;
}> = ({ pathname, children }) => {
  // Language always derives strictly from the current URL path (/ar vs /)
  const language: Language = isArabicPath(pathname) ? 'ar' : 'en';
  const dir: 'ltr' | 'rtl' = language === 'ar' ? 'rtl' : 'ltr';

  const [suggestedLang, setSuggestedLang] = useState<Language | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_PREF_KEY);
      if ((saved === 'ar' || saved === 'en') && saved !== language) {
        setSuggestedLang(saved);
      } else {
        setSuggestedLang(null);
      }
    } catch {
      setSuggestedLang(null);
    }
  }, [language]);

  const saveLanguagePreference = useCallback((lang: Language) => {
    setSuggestedLang(null);
    try {
      localStorage.setItem(LANG_PREF_KEY, lang);
    } catch {
      // Ignore storage errors in restricted browsing modes
    }
  }, []);

  const dismissSuggestion = useCallback(() => {
    setSuggestedLang(null);
    try {
      localStorage.setItem(LANG_PREF_KEY, language);
    } catch {
      // Ignore storage errors
    }
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        dir,
        suggestedLang,
        saveLanguagePreference,
        dismissSuggestion,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
