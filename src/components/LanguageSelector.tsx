import React, { useState } from 'react';
import i18n from '../utils/i18n';
import spain from '../assets/img/spain.svg';
import germany from '../assets/img/germany.svg';
import uk from '../assets/img/uk.svg';

/**
 * LanguageSelector component for changing the application language.
 * @component
 */
const LanguageSelector: React.FC = () => {
  /**
   * State to manage the visibility of the language selection modal.
   */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Change the language of the application and close the language selection modal.
   * @param {string} lng - Language code to switch to.
   */
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsModalOpen(false);
  };

  /**
   * Render the LanguageSelector component.
   */
  return (
    <div className="relative inline-block">
      {/* Language selection button */}
      <button onClick={() => setIsModalOpen(!isModalOpen)}>
        <img src={i18n.language === 'en' ? uk : i18n.language === 'es' ? spain : germany} alt={i18n.language} />
      </button>

      {/* Language selection modal */}
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