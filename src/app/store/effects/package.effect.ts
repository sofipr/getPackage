import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import * as fromActions from '../actions/package.action';

@Injectable()
export class pacageEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.save),
      switchMap((action) =>
        this.apiService.login(action).pipe(
          map(
            (res) => fromActions.saveSuccess(),
            catchError((error: any) =>
              of(
                fromActions.saveError({
                  error: error,
                })
              )
            )
          )
        )
      )
    )
  );

  Login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.Login),
      switchMap((action) =>
        this.apiService.login(action).pipe(
          map(
            (res) => fromActions.LoginSuccess(),
            catchError((error: any) =>
              of(
                fromActions.LoginError({
                  error: error,
                })
              )
            )
          )
        )
      )
    )
  );

  getCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.getCities),
      switchMap((action) =>
        this.apiService.getCities().pipe(
          map(
            (res) => fromActions.getCitiesSuccess({ cities: res }),
            catchError((error: any) =>
              of(
                fromActions.getCitiesError({
                  error: error,
                })
              )
            )
          )
        )
      )
    )
  );

  getTimes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.getTimes),
      switchMap((action) =>
        this.apiService.getHours().pipe(
          map(
            (res) => fromActions.getTimesSuccess({ times: res }),
            catchError((error: any) =>
              of(
                fromActions.getTimesError({
                  error: error,
                })
              )
            )
          )
        )
      )
    )
  );
}
