import { useTranslation } from "react-i18next";
import { Repository } from "../utils/interfaces";

interface RepoCardProps {
  repo: Repository;
  onFavoriteToggle: (repoName: string) => void;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo, onFavoriteToggle }) => {
  const {t} = useTranslation()

  return (
    <article className="bg-gray-200 p-4 mb-4 rounded-lg relative">
  <h3 className="text-2xl mb-2">{repo.name}</h3>
  <p className="text-gray-800 mb-2">{t("Main Language")}:  {repo.primaryLanguage?.name || 'none'}</p>
  <p className="text-gray-800 mb-2">{t("Stars")}: {repo.stargazers?.totalCount}</p>
  <p className="text-gray-800 mb-2">{repo.description}</p>
  <a
    href={repo.url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 hover:underline block mb-2"
  >
    {t('Check in GitHub')}
  </a>
  <button
    onClick={() => onFavoriteToggle(repo.name)}
    className="bg-blue-500 text-white px-4 py-2 rounded absolute bottom-4 right-4 hover:bg-blue-700"
  >
    {t('Favorite')}
  </button>
  <hr />
</article>

  );
};

export default RepoCard;