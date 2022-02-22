import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { City } from 'src/app/models/city.model';
import { Times } from 'src/app/models/times.model';
import * as fromActions from '../actions/package.action';

export interface AppState {
  cities: City;
  times: Times;
  isLoadingCity: boolean;
  isLoadingTime: boolean;
  isSavingData: boolean;
  errorMessage: string;
}

export const initialState: AppState = {
  cities: {} as City,
  times: {} as Times,
  isLoadingCity: false,
  isLoadingTime: false,
  isSavingData: false,
  errorMessage: '',
};
export function reducer(state: AppState | undefined, action: Action): any {
  return packageReducer(state, action);
}

export const packageState = createFeatureSelector<AppState>('packageState');

const packageReducer = createReducer(
  initialState,

  on(fromActions.getCities, (state) => {
    return { ...state, isLoadingCity: true };
  }),
  on(fromActions.getCitiesSuccess, (state, { cities }) => {
    return { ...state, isLoadingCity: false, cities: cities };
  }),
  on(fromActions.getCitiesError, (state, { error }) => {
    return { ...state, isLoadingCity: false, errorMessage: error };
  }),

  on(fromActions.getTimes, (state) => {
    return { ...state, isLoadingTime: true };
  }),
  on(fromActions.getTimesSuccess, (state, { times }) => {
    return { ...state, isLoadingTime: false, times: times };
  }),
  on(fromActions.getTimesError, (state, { error }) => {
    return { ...state, isLoadingTime: false, errorMessage: error };
  }),

  on(fromActions.save, (state) => {
    return { ...state, isSavingData: true };
  }),
  on(fromActions.saveSuccess, (state) => {
    return { ...state, isSavingData: false };
  }),
  on(fromActions.saveError, (state, { error }) => {
    return { ...state, isSavingData: false, errorMessage: error };
  })
);
