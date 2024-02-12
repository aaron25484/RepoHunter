export interface Repository {
  name: string;
  description: string;
  url: string;
  stargazers: {
    totalCount: number;
  };
  primaryLanguage: {
    name: string;
  } | null;
}

export interface UserDetails {
  login: string;
  name: string;
  avatarUrl: string;
  bio: string;
  repositories: {
    totalCount: number;
    nodes: Repository[];
  };
}