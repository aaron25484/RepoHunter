import React from "react";
import { useTranslation } from "react-i18next";
import { Repository } from "../utils/interfaces";

interface RepoCardProps {
  repo: Repository;
  onFavoriteToggle: (repoName: string) => void;
  isFavorite: boolean;
  onRemoveFavorite: (repoName: string) => void;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo, onFavoriteToggle, isFavorite, onRemoveFavorite }) => {
  const { t } = useTranslation();

  const handleButtonClick = () => {
    if (isFavorite) {
      onRemoveFavorite(repo.name);
    } else {
      onFavoriteToggle(repo.name);
    }
  };

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
