import RepoCard from './RepoCard';
import { Repository } from '../utils/interfaces';

interface FavoriteReposProps {
  favoriteRepos: Repository[];
}

const FavoriteRepos: React.FC<FavoriteReposProps> = ({ favoriteRepos }) => {
  return (
    <div>
      <h2>Your Favorite Repositories</h2>
      {favoriteRepos.map((repo: Repository) => (
        <RepoCard key={repo.name} repo={repo} />
      ))}
    </div>
  );
};

export default FavoriteRepos;
