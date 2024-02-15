import { useEffect, useState } from "react";
import { Repository } from "../utils/interfaces";
import Cookies from 'js-cookie';
import FavoriteRepos from "../components/FavoriteRepos";
import { getFavoritesData } from "../api/favoritesCall";

const Favourites = () => {
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

  return (
    <FavoriteRepos favoriteRepos={favoriteRepos} />
  );
};

export default Favourites;
