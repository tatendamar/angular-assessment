import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';
import { SearchService } from '../services/search.service';
import { SearchResult } from '../services/searchTypes.type';


export type DashboardState = {
  isLoading: boolean;
  result: SearchResult[];
  errorMsg: string;
};

@Injectable()
export class DashboardStore extends ComponentStore<DashboardState> {
  private searchService = inject(SearchService);

  constructor() {
    super({
      result: [],
      isLoading: false,
      errorMsg: '',
    });
  }

  readonly results$ = this.select((state) => state.result);
  readonly isLoading$ = this.select((state) => state.isLoading);
  readonly errorMsg$ = this.select((state) => state.errorMsg);

  readonly vm$ = this.select({
    results: this.results$,
    isLoading: this.isLoading$,
    errorMsg: this.errorMsg$,
  });

  readonly setLoading = this.updater((state) => ({
    ...state,
    isLoading: true,
  }));

  readonly setError = this.updater((state, errorMsg: string) => ({
    ...state,
    isLoading: false,
    errorMsg,
  }));

  readonly addResultsToState = this.updater((state, result: SearchResult[]) => ({
    ...state,
    isLoading: false,
    result,
  }));

  readonly loadResult = this.effect<{ query: string,}>(params$ =>
    params$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap(({ query}) =>
        this.searchService.search(query).pipe(
          tap({
            next: (result: SearchResult[]) => {
              console.log(result)
              this.addResultsToState(result)
            },
            error: (error: HttpErrorResponse) => {
              this.setError(error.message);
            },
          }),
          catchError(() => {
            this.patchState({ isLoading: false });
            return EMPTY;
          })
        )
      )
    )
  );
}
