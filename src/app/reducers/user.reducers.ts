import { createReducer, on } from '@ngrx/store';
import { setData } from '../Actions/user.actions';

export interface DataState {
  data: any[];
}

export const initialState: DataState = {
  data: [],
};

export const dataReducer = createReducer(
  initialState,
  on(setData, (state, { data }) => ({ ...state, data }))
);
