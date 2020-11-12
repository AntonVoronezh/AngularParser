export interface IGithubRepository {
  items: IGithubRepositoryItem[];
  total_count: number;
}

export interface IGithubRepositoryItem {
  forks: number;
  owner: IGithubRepositoryOwner;
}

export interface IGithubRepositoryOwner {
  avatar_url: string;
  login: string;
  htmlUrl: string;
}

export type IGithubRepositoryList = Omit<IGithubRepositoryItem, 'owner'> & IGithubRepositoryOwner;
