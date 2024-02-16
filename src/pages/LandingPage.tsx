import React,{ useState } from "react";
import RepoList from "../components/RepoList";
import SearchBar from "../components/Searchbar";
import { getMainData } from "../api/mainDataCall";
import { Repository } from "../utils/interfaces";
import UserCard from "../components/UserCard";

/**
 * LandingPage component responsible for displaying the main landing page.
 *
 * @component
 * @example
 * // Example usage:
 * <LandingPage />
 *
 */

const LandingPage = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<any | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  /**
   * Handles the selection of an user and fetches their data.
   *
   * @param {string} user - The selected username.
   * @returns {Promise<void>} Promise that resolves after fetching user data.
   */

  const handleUserSelected = async (user: string) => {
    const selectedUser = user;
    const { userDetails, repositories } = await getMainData(selectedUser);

    if (userDetails && repositories) {
      setUserDetails(userDetails);
      setRepos(repositories);
      setSelectedUser(selectedUser);
    }
  };

  return (
    <>
      <SearchBar onUserSelected={handleUserSelected} />
      {userDetails && (
        <>
          <UserCard user={userDetails} />
          <RepoList repos={repos} selectedUser={selectedUser} selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} favoriteRepos={repos}/>
        </>
      )}
    </>
  );
};

export default LandingPage;
