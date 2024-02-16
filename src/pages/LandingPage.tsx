import React,{ useState } from "react";
import RepoList from "../components/RepoList";
import SearchBar from "../components/Searchbar";
import { getMainData } from "../api/mainDataCall";
import { Repository } from "../utils/interfaces";
import UserCard from "../components/UserCard";

const LandingPage = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<any | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

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
