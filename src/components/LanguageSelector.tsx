import React, { useState } from 'react';
import i18n from '../utils/i18n';
import spain from '../assets/img/spain.svg';
import germany from '../assets/img/germany.svg';
import uk from '../assets/img/uk.svg';

const LanguageSelector: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsModalOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button onClick={() => setIsModalOpen(!isModalOpen)}>
        <img src={i18n.language === 'en' ? uk : i18n.language === 'es' ? spain : germany} alt={i18n.language} />
      </button>

      {isModalOpen && (
        <div className="fixed right-0 top-16 w-12 bg-slate-50 bg-opacity-80 border-gray-300 rounded shadow z-20">
          <button onClick={() => changeLanguage('en')} className="block w-full px-4">
            <img src={uk} alt="English" className="inline-block mr-2" />
            
          </button>
          <button onClick={() => changeLanguage('es')} className="block w-full px-4">
            <img src={spain} alt="Español" className="inline-block mr-2" />
            
          </button>
          <button onClick={() => changeLanguage('de')} className="block w-full px-4">
            <img src={germany} alt="Deutsch" className="inline-block mr-2" />
            
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
