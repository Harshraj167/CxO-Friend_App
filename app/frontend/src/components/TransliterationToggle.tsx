import React, { useState } from 'react';
import { Languages } from 'lucide-react';

export const TransliterationToggle: React.FC = () => {
  const [active, setActive] = useState(false);

  return (
    <button
      onClick={() => setActive(!active)}
      className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border shadow-sm ${
        active 
          ? 'bg-indigo-100 text-indigo-700 border-indigo-200' 
          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
      }`}
      title="Toggle AI Chat normalization (Hinglish/Gujlish to English)"
    >
      <Languages size={16} className={active ? 'text-indigo-600' : 'text-gray-400'} />
      <span>{active ? 'Transliteration: ON' : 'Transliteration: OFF'}</span>
    </button>
  );
};
