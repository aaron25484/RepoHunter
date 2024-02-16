import React,{ useEffect, useState } from 'react';
import { Repository } from '../utils/interfaces';
import RepoCard from './RepoCard';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { getFavoritesData } from '../api/favoritesCall';

interface RepoListProps {
  repos: Repository[];
  selectedUser: string | null;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  favoriteRepos: Repository[];
}

const RepoList: React.FC<RepoListProps> = ({ repos, selectedUser, selectedLanguage, setSelectedLanguage }) => {
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [favoriteRepos, setFavoriteRepos] = useState<Repository[]>([]);


  const { t } = useTranslation();

  useEffect(() => {
    const filteredRepos = selectedLanguage
      ? repos.filter((repo: Repository) => repo.primaryLanguage?.name === selectedLanguage)
      : repos;

    setFilteredRepos(filteredRepos);
  }, [repos, selectedLanguage]);

  const isRepoFavorite = (repoName: string) => {
    return favoriteRepos.some((favRepo) => favRepo.name === repoName);
  };


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

  return (
    <>
      {selectedUser && (
        <div className="p-4 bg-gray-800">
          <h2 className="text-white font-oswald text-center text-2xl mb-4">{t('Repositories of')} {selectedUser}</h2>
          <label htmlFor="language" className="text-white block mb-2">{t('Filter by Language')}:</label>
          <select
            id="language"
            onChange={(e) => setSelectedLanguage(e.target.value)}
            value={selectedLanguage}
            className="px-4 mb-4 py-2 border rounded w-full bg-white text-gray-800 max-w-screen-md lg:mx-auto"
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
