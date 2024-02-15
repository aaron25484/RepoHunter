import { useTranslation } from "react-i18next";
import { Repository } from "../utils/interfaces";

interface RepoCardProps {
  repo: Repository;
  onFavoriteToggle: (repoName: string) => void;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo, onFavoriteToggle }) => {
  const {t} = useTranslation()

  return (
    <article>
      <h3>{repo.name}</h3>
      <p>{t("Main Language")}:  {repo.primaryLanguage?.name || 'none'}</p>
      <p>{t("Stars")}: {repo.stargazers?.totalCount}</p>
      <p>{repo.description}</p>
      <a href={repo.url} target="_blank" rel="noopener noreferrer">
        {t('Check in GitHub')} 
      </a>
      <button onClick={() => onFavoriteToggle(repo.name)}>
        {t('Favorite')}
      </button>
      <hr />
    </article>
  );
};

export default RepoCard;