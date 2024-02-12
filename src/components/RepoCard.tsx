import { Repository } from "../utils/interfaces";

const RepoCard: React.FC<{ repo: Repository }> = ({ repo }) => {
  return (
    <article>
      <h3>{repo.name}</h3>
      <p>Main Language: {repo.primaryLanguage?.name || 'none'}</p>
      <p>Stars: {repo.stargazers.totalCount}</p>
      <p>{repo.description}</p>
      <a href={repo.url} target="_blank" rel="noopener noreferrer">
        Check in GitHub
      </a>
      <hr />
    </article>
  );
};

export default RepoCard;