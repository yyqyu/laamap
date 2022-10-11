import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const RadarSettingsActions = createActionGroup({
  source: 'Radar Settings',
  events: {
    'Enabled Changed': props<{ enabled: boolean }>(),
  },
});
