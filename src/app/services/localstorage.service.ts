import { Injectable } from '@angular/core';

import { IGithubRepositoryList } from '../models/github-repositorie';

@Injectable({
  providedIn: 'root',
})
export class InsuranceLocalstorageService {
  private readonly GITHUB_REPOSITORIES = 'github_repositories';

  get isGithubRepositoriesData(): boolean {
    return !!localStorage.getItem(this.GITHUB_REPOSITORIES);
  }






}
