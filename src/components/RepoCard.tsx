import React from "react";
import { useTranslation } from "react-i18next";
import { Repository } from "../utils/interfaces";

interface RepoCardProps {
  repo: Repository;
  onFavoriteToggle: (repoName: string) => void;
  isFavorite: boolean;
  onRemoveFavorite: (repoName: string) => void;
}

/**
 * Props interface for the RepoCard component.
 * @typedef {Object} RepoCardProps
 * @property {Repository} repo - The repository information.
 * @property {(repoName: string) => void} onFavoriteToggle - Callback function for toggling favorite status.
 * @property {boolean} isFavorite - Flag indicating whether the repository is marked as a favorite.
 * @property {(repoName: string) => void} onRemoveFavorite - Callback function for removing a repository from favorites.
 */

/**
 * RepoCard component for displaying information about a repository.
 * @component
 * @param {RepoCardProps} props - The properties passed to the RepoCard component.
 */
const RepoCard: React.FC<RepoCardProps> = ({ repo, onFavoriteToggle, isFavorite, onRemoveFavorite }) => {
  /**
   * Translation hook for internationalization.
   * @type {Function}
   */
  const { t } = useTranslation();

  /**
   * Handles the click event on the button, toggling favorite status or removing from favorites.
   */
  const handleButtonClick = () => {
    if (isFavorite) {
      onRemoveFavorite(repo.name);
    } else {
      onFavoriteToggle(repo.name);
    }
  };

  /**
   * Render the RepoCard component.
   * @returns {JSX.Element} - JSX element representing the RepoCard component.
   */
  return (
    <article className="bg-gray-200 p-4 mb-4 rounded-lg relative max-w-screen-md lg:mx-auto">
      <h3 className="text-2xl mb-2">{repo.name}</h3>
      <p className="text-gray-800 mb-2">{t("Main Language")}: {repo.primaryLanguage?.name || 'none'}</p>
      <p className="text-gray-800 mb-2">{t("Stars")}: {repo.stargazers?.totalCount}</p>
      <p className="text-gray-800 mb-2">{repo.description}</p>
      <a
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        className=" text-teal-800 hover:underline block mb-2"
      >
        {t('Check in GitHub')}
      </a>
      <button
        onClick={handleButtonClick}
        className=" bg-slate-400 text-black px-4 py-2 rounded absolute bottom-4 right-4 hover:bg-slate-700"
      >
        {isFavorite ? t('Delete') : t('Favorites')}
      </button>
      <hr />
    </article>
  );
};

export default RepoCard;