import { ActionReducerMap } from '@ngrx/store';
import * as fromAction from './actions/package.action';
import * as fromReducer from './reducer/package.reducer';


export interface State {
    customers: fromReducer.AppState;
  }

  
export const reducers: ActionReducerMap<State> = {
    customers: fromReducer.reducer,
  };