import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromReducer from '../reducer/package.reducer';

export const getPackagesState =
  createFeatureSelector<fromReducer.AppState>('customers');

export const getCities = createSelector(
  getPackagesState,
  (state: fromReducer.AppState) => state.cities
);

export const getTimes = createSelector(
  getPackagesState,
  (state: fromReducer.AppState) => state.times
);

export const getTimesByDay = (day: string) =>
  createSelector(getPackagesState, (state: fromReducer.AppState) => {
    const data: any = state.times;
    
     const idx = data.findIndex((x: any) => x.day == day);
    if (idx > -1) return data[idx].times;
    return null;
  });

  export const getPriceByCuty = (city: string) =>
  createSelector(getPackagesState, (state: fromReducer.AppState) => {
    const data: any = state.cities;
    
     const idx = data.findIndex((x: any) => x.enName == city);
    if (idx > -1) return data[idx].price;
    return null;
  });
