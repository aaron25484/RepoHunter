import RepoCard from './RepoCard';
import { Repository } from '../utils/interfaces';
import { useTranslation } from 'react-i18next';
import React from 'react';

/**
 * FavoriteRepos component to display a list of favorite repositories.
 * @component
 * @param {Object} props - Props for the FavoriteRepos component.
 * @param {Repository[]} props.favoriteRepos - Array of favorite repositories.
 * @param {(repoName: string) => void} props.onRemoveFavorite - Callback function to remove a repository from favorites.
 * @returns {JSX.Element} - JSX element representing the FavoriteRepos component.
 */

interface FavoriteReposProps {
  favoriteRepos: Repository[];
  onRemoveFavorite: (repoName: string) => void;
}

const FavoriteRepos: React.FC<FavoriteReposProps> = ({ favoriteRepos, onRemoveFavorite }) => {
  /**
   * Translation function for i18n support.
   * @type {Function}
   */
  const { t } = useTranslation();

  /**
   * Render the FavoriteRepos component.
   */
  return (
    <div>
      <h2 className='text-2xl text-center align-center font-oswald text-white mb-4'>{t('Your Favorite Repositories')}</h2>
      {favoriteRepos && favoriteRepos.map((repo: Repository) => (
        <RepoCard
          key={repo.name}
          repo={repo}
          onFavoriteToggle={() => {}}
          isFavorite={favoriteRepos.some((favRepo) => favRepo.name === repo.name)}
          onRemoveFavorite={() => onRemoveFavorite(repo.name)}
        />
      ))}
    </div>
  );
};

export default FavoriteRepos;