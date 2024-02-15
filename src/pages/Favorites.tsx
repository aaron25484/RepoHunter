import { useEffect, useState } from "react";
import { Repository } from "../utils/interfaces";
import Cookies from 'js-cookie';
import FavoriteRepos from "../components/FavoriteRepos";
import { getFavoritesData } from "../api/favoritesCall";

const Favorites = () => {
  const [favoriteRepos, setFavoriteRepos] = useState<Repository[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedFavorites = Cookies.get('favorites');
        if (storedFavorites) {
          const parsedFavorites = JSON.parse(storedFavorites);
          const data = await getFavoritesData(parsedFavorites);
          const combinedRepos = data.reduce((repoSum: Repository[], userData: any) => {
            if (userData.repository) {
              repoSum.push(userData.repository);
            }
            return repoSum;
          }, []);
          setFavoriteRepos(combinedRepos);
          console.log(combinedRepos);
        }
      } catch (error) {
        console.error('Error fetching favorite data:', error);
      }
    };

    fetchData();
  }, []); 

  const handleRemoveFavorite = async (repoName: string) => {
    try {
      const storedFavorites = Cookies.get('favorites') || '[]';
      const parsedFavorites = JSON.parse(storedFavorites);
      const updatedFavorites = parsedFavorites.filter((fav: any) => fav.repoName !== repoName);
      Cookies.set('favorites', JSON.stringify(updatedFavorites));

      setFavoriteRepos((prevRepos) => prevRepos.filter((repo) => repo.name !== repoName));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  return (
    <FavoriteRepos favoriteRepos={favoriteRepos} onRemoveFavorite={handleRemoveFavorite} />
  );
};

export default Favorites;