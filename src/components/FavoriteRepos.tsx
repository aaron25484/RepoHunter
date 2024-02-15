import RepoCard from './RepoCard';
import { Repository } from '../utils/interfaces';
import { useTranslation } from 'react-i18next';

interface FavoriteReposProps {
  favoriteRepos: Repository[];
}

const FavoriteRepos: React.FC<FavoriteReposProps> = ({ favoriteRepos }) => {
  const {t} = useTranslation()
  return (
    <div>
      <h2>{t('Your Favorite Repositories')}</h2>
      {favoriteRepos.map((repo: Repository) => (
        <RepoCard key={repo.name} repo={repo} />
      ))}
    </div>
  );
};

export default FavoriteRepos;
