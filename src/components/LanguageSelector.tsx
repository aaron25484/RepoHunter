import React from 'react';
import i18n from '../utils/i18n';

const LanguageSelector: React.FC = () => {

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('es')}>Español</button>
      <button onClick={() => changeLanguage('de')}>Deutsch</button>
    </div>
  );
};

export default LanguageSelector;
