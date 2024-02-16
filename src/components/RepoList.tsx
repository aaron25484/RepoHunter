import React,{ useEffect, useState } from 'react';
import { Repository } from '../utils/interfaces';
import RepoCard from './RepoCard';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { getFavoritesData } from '../api/favoritesCall';


/**
 * @typedef {Object} RepoListProps - Props interface for the RepoList component.
 * @property {Repository[]} repos - An array of repositories.
 * @property {string | null} selectedUser - The selected GitHub user.
 * @property {string} selectedLanguage - The selected programming language for filtering repositories.
 * @property {(language: string) => void} setSelectedLanguage - Callback function to set the selected programming language.
 * @property {Repository[]} favoriteRepos - An array of favorite repositories.
 */

interface RepoListProps {
  repos: Repository[];
  selectedUser: string | null;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  favoriteRepos: Repository[];
}

/**
 * RepoList component for displaying a list of repositories.
 * @component
 * @param {RepoListProps} props - The properties passed to the RepoList component.
 */
const RepoList: React.FC<RepoListProps> = ({ repos, selectedUser, selectedLanguage, setSelectedLanguage }) => {
  /**
   * State for storing filtered repositories based on selected language.
   */
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);

  /**
   * State for storing favorite repositories.
   */
  const [favoriteRepos, setFavoriteRepos] = useState<Repository[]>([]);

  /**
   * Translation hook for internationalization.
   * @type {Function}
   */
  const { t } = useTranslation();

  /**
   * useEffect to update filtered repositories based on selected language.
   */
  useEffect(() => {
    const filteredRepos = selectedLanguage
      ? repos.filter((repo: Repository) => repo.primaryLanguage?.name === selectedLanguage)
      : repos;

    setFilteredRepos(filteredRepos);
  }, [repos, selectedLanguage]);

  /**
   * Function to check if a repository is marked as a favorite.
   * @param {string} repoName - The name of the repository.
   * @returns {boolean} - True if the repository is a favorite, false otherwise.
   */
  const isRepoFavorite = (repoName: string) => {
    return favoriteRepos.some((favRepo) => favRepo.name === repoName);
  };

  /**
   * Function to handle the toggle of a repository's favorite status.
   * @param {string} repoName - The name of the repository.
   */
  const handleFavoriteToggle = async (repoName: string) => {
    try {
      const storedFavorites = Cookies.get('favorites') || '[]';
      const parsedFavorites = JSON.parse(storedFavorites);

      const isRepoInFavorites = parsedFavorites.some((fav: any) => fav.repoName === repoName);

      let updatedFavorites;

      if (isRepoInFavorites) {
        updatedFavorites = parsedFavorites.filter((fav: any) => fav.repoName !== repoName);
      } else {
        updatedFavorites = [...parsedFavorites, { repoName, owner: selectedUser }];
      }

      await getFavoritesData(updatedFavorites);
      Cookies.set('favorites', JSON.stringify(updatedFavorites));

      setFavoriteRepos(updatedFavorites.map((fav: any) => ({ name: fav.repoName })));

    } catch (error) {
      console.error('Error handling favorite toggle:', error);
    }
  };

  /**
   * Render the RepoList component.
   */
  return (
    <>
      {selectedUser && (
        <div className="p-4 bg-gray-800">
          <h2 className="text-white font-oswald text-center text-2xl mb-4">{t('Repositories of')} {selectedUser}</h2>
          <label htmlFor="language" className="text-white text-center block mb-2">{t('Filter by Language')}:</label>
          <select
            id="language"
            onChange={(e) => setSelectedLanguage(e.target.value)}
            value={selectedLanguage}
            className=" px-4 mb-4 py-2 block border m-auto rounded w-3/6 bg-white text-gray-800 lg:w-1/6"
          >
            <option value="">{t('All Languages')}</option>
            <option value="JavaScript">JavaScript</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Python">Python</option>
          </select>
          {filteredRepos && filteredRepos.map((repo: Repository) => (
            <RepoCard
              key={repo.name}
              repo={repo}
              onFavoriteToggle={() => handleFavoriteToggle(repo.name)}
              isFavorite={isRepoFavorite(repo.name)}
              onRemoveFavorite={() => {}}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default RepoList;