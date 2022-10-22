import { createSelector } from '@ngrx/store';
import { AppState } from './core.reducer';

const selectCore = (state: object) => (state as AppState).core;

export const selectRadar = createSelector(selectCore, (state) => state?.radar);


