import React, { useEffect, useState } from "react";
import { Repository } from "../utils/interfaces";
import Cookies from 'js-cookie';
import FavoriteRepos from "../components/FavoriteRepos";
import { getFavoritesData } from "../api/favoritesCall";

/**
 * Favorites component displaying a list of user's favorite repositories.
 *
 * @component
 */
const Favorites = () => {
  /**
   * State to hold the user's favorite repositories.
   *
   * @type {Repository[]}
   */
  const [favoriteRepos, setFavoriteRepos] = useState<Repository[]>([]);

  /**
   * useEffect to fetch and set the user's favorite repositories.
   */
  useEffect(() => {
    /**
     * Function to fetch and set the user's favorite repositories.
     *
     * @async
     * @function
     */
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
        }
      } catch (error) {
        console.error('Error fetching favorite data:', error);
      }
    };

    fetchData();
  }, []);

  /**
   * Function to handle the removal of a repository from favorites.
   *
   * @async
   * @param {string} repoName - The name of the repository to be removed from favorites.
   */
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

  /**
   * Render the FavoriteRepos component with the user's favorite repositories and the remove favorite handler.
   *
   */
  return (
    <FavoriteRepos favoriteRepos={favoriteRepos} onRemoveFavorite={handleRemoveFavorite} />
  );
};

export default Favorites;
