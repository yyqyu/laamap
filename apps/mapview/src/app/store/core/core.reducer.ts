import { createReducer, on } from '@ngrx/store';
import { RadarSettingsActions } from './core.actions';

const initialState = {
  radar: {
    enabled: false,
  },
};

export type AppState = { core: typeof initialState };

export const coreReducer = createReducer(
  initialState,
  on(
    RadarSettingsActions.enabledChanged,
    (state, { enabled }): AppState['core'] => ({
      ...state,
      radar: { ...state.radar, enabled },
    })
  )
);
