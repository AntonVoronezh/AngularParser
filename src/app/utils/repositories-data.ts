import { cloneDeep } from 'lodash';

import { IGithubRepository, IGithubRepositoryItem, IGithubRepositoryList } from '../models/github-repositorie';

export class RepositoriesData {
  private data: IGithubRepository;

  log(): void {
    console.log('RepositoriesData', this.data);
  }

  private get getCloneData(): IGithubRepository {
    return cloneDeep(this.data);
  }

  setData(data: IGithubRepository): void {
    this.data = data;
  }

  getDataForPanels(): IGithubRepositoryList[] {
    return this.getCloneData.items.map(({ owner, forks }: IGithubRepositoryItem) => {
      const { avatar_url, login, htmlUrl } = owner;

      return { forks, avatar_url, login, htmlUrl } as IGithubRepositoryList;
    });
  }




}
