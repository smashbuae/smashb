import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { getPairedPath } from '../data/siteConfig';

export const LanguageSuggestionBanner: React.FC = () => {
  const { suggestedLang, saveLanguagePreference, dismissSuggestion } = useLanguage();
  const location = useLocation();

  if (!suggestedLang) return null;

  const targetPath = getPairedPath(location.pathname, suggestedLang);

  return (
    <div
      role="status"
      className="w-full bg-[#432724] text-[#EBE5D0] text-xs py-2 px-4 flex items-center justify-center gap-3 border-b border-[#EBE5D0]/15"
    >
      <span>
        {suggestedLang === 'ar'
          ? 'هل تفضل تصفح الموقع باللغة العربية؟'
          : 'Prefer to browse this page in English?'}
      </span>
      <Link
        to={targetPath}
        onClick={() => saveLanguagePreference(suggestedLang)}
        className="underline font-bold text-[#A5C7A5] hover:text-[#EBE5D0]"
      >
        {suggestedLang === 'ar' ? 'انتقل إلى العربية' : 'Switch to English'}
      </Link>
      <button
        type="button"
        onClick={dismissSuggestion}
        aria-label="Dismiss language suggestion"
        className="p-1 text-[#EBE5D0]/75 hover:text-[#EBE5D0] cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default LanguageSuggestionBanner;
