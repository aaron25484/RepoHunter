import RepoCard from './RepoCard';
import { Repository } from '../utils/interfaces';
import { useTranslation } from 'react-i18next';

interface FavoriteReposProps {
  favoriteRepos: Repository[];
  onRemoveFavorite: (repoName: string) => void;
}

const FavoriteRepos: React.FC<FavoriteReposProps> = ({ favoriteRepos, onRemoveFavorite }) => {
  const {t} = useTranslation()
  return (
    <div>
      <h2>{t('Your Favorite Repositories')}</h2>
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
