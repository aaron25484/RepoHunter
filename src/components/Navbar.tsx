import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';

/**
 * Navbar component for the app.
 * @component
 */
const Navbar: React.FC = () => {
  /**
   * Translation hook for internationalization.
   * @type {Function}
   */
  const { t } = useTranslation();

  /**
   * Render the Navbar component.
   */
  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4">
      <Link to="/" className='text-4xl font-oswald text-white'>
        RepoHunter
      </Link>
      <ul className="flex items-center">
        <li>
          <Link to="/favorites" className="text-white text-xl font-oswald">
            {t("Favorites")}
          </Link>
        </li>
        <li className="ml-4">
          <LanguageSelector />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;