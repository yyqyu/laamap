import { createSelector } from '@ngrx/store';
import { AppState } from './core.reducer';

const selectCore = (state: object) => (state as AppState).core;

export const selectRadarEnabled = createSelector(
  selectCore,
  (state) => state.radar.enabled
);
