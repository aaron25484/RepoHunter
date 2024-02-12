import React, { useEffect, useState } from 'react';
import { Repository } from '../utils/interfaces';
import RepoCard from './RepoCard';

interface RepoListProps {
  repos: Repository[];
  selectedUser: string | null;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
}

const RepoList: React.FC<RepoListProps> = ({ repos, selectedUser, selectedLanguage, setSelectedLanguage }) => {
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);

  useEffect(() => {
    const filteredRepos = selectedLanguage
      ? repos.filter((repo: Repository) => repo.primaryLanguage?.name === selectedLanguage)
      : repos;

    setFilteredRepos(filteredRepos);
  }, [repos, selectedLanguage]);

  return (
    <>
      {selectedUser && (
        <div>
          <h2>Repositories of {selectedUser}</h2>
          <label htmlFor="language">Filter by Language:</label>
          <select
            id="language"
            onChange={(e) => setSelectedLanguage(e.target.value)}
            value={selectedLanguage}
          >
            <option value="">All Languages</option>
            <option value="JavaScript">JavaScript</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Python">Python</option>
          </select>
          {filteredRepos.map((repo: Repository) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      )}
    </>
  );
};

export default RepoList;
