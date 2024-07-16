import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { dataReducer } from './user.reducers';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  //counter:countReducer,
  dataReducer: dataReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
