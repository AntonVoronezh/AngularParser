import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGithubRepository } from '../models/github-repositorie';

@Injectable({
  providedIn: 'root',
})
export class ParserGithubService {
  static readonly baseUrl = 'https://api.github.com/search/repositories';

  constructor(private http: HttpClient) {}

  public getRepositoriesByQuery(query: string, page: number): Observable<IGithubRepository> {
    return this.http.get<IGithubRepository>(`${ParserGithubService.baseUrl}?q=${query}&page=${page}`);
  }
}
