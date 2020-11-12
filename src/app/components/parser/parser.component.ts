import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ParserGithubService } from '../../services/github.service';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, mergeMap, pluck, takeUntil } from 'rxjs/operators';

import { IGithubRepository, IGithubRepositoryList } from '../../models/github-repositorie';
import { RepositoriesData } from '../../utils/repositories-data';
import { InsuranceLocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-parser',
  templateUrl: './parser.component.html',
  styleUrls: ['./parser.component.scss'],
})
export class ParserComponent implements OnDestroy, OnInit {
  @ViewChild('inputForGithub', { static: false }) inputForGithub: ElementRef;

  page = 1;
  query: string;
  loading = false;
  repositoriesData = new RepositoriesData();
  repositoriesList: IGithubRepositoryList[];
  destroyed$ = new Subject<void>();
  bookmarks: IGithubRepositoryList[] = [];

  constructor(
    private parserGithubService: ParserGithubService,
    private insuranceLocalstorageService: InsuranceLocalstorageService
  ) {}

  ngOnInit(): void {
    if (this.insuranceLocalstorageService.isGithubRepositoriesData) {
      this.bookmarks = this.insuranceLocalstorageService.getGithubRepositoriesData();
    }
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    this.insuranceLocalstorageService.saveGithubRepositoriesData(this.bookmarks);

    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onInputClickHandler(): void {
    const keyboardStream$ = this.getStreamFromEvent();
    const queryStream$ = this.handleKeyboardEventStream(keyboardStream$);
    const repositoriesStream$ = this.getRepositoriesByQuery(queryStream$);

    this.setRepositoriesData(repositoriesStream$);
  }

  private getStreamFromEvent(): Observable<KeyboardEvent> {
    return fromEvent<KeyboardEvent>(this.inputForGithub.nativeElement, 'input');
  }

  private handleKeyboardEventStream(stream$: Observable<KeyboardEvent>): Observable<string> {
    return stream$.pipe(debounceTime(300), pluck<KeyboardEvent, string>('target', 'value'));
  }

  private getRepositoriesByQuery(stringStream$: Observable<string>): Observable<IGithubRepository> {
    return stringStream$.pipe(
      takeUntil(this.destroyed$),
      mergeMap((query: string) => {
        this.loading = true;
        this.query = query;

        return this.parserGithubService.getRepositoriesByQuery(query, this.page);
      })
    );
  }

  private setRepositoriesData(repositories$: Observable<IGithubRepository>) {
    repositories$.subscribe((repositories: IGithubRepository) => {
      this.loading = false;
      this.repositoriesData.setData(repositories);

      this.setRepositoriesList();
    });
  }

  private setRepositoriesList(): void {
    this.repositoriesList = this.repositoriesData.getDataForPanels();
  }

  onNextPageClickHandler(): void {
    this.page++;

    this.parserGithubService
      .getRepositoriesByQuery(this.query, this.page)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((repositories: IGithubRepository) => {
        this.repositoriesData.setData(repositories);

        this.setRepositoriesList();
      });
  }

  onCardClickHandler(repository: IGithubRepositoryList) {
    this.bookmarks.push(repository);
  }

  onBookmarksClickHandler(): void {
    this.repositoriesList = this.bookmarks;
  }

  onSearchClickHandler() {
    this.repositoriesList = this.repositoriesData.getDataForPanels();
  }

  setFilteredRepositories($event: IGithubRepositoryList[]) {
    this.repositoriesList = $event;
  }
}
