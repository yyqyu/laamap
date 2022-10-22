import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { IRainViewerUrls } from '../../services/rain-viewer.interface';
import { AppState } from './core.reducer';

export const RadarSettingsActions = createActionGroup({
  source: 'Radar Settings',
  events: {
    'Enabled Changed': props<{ enabled: boolean }>(),
    'Enabled widget changed': props<{ enabled: boolean }>(),
    'Type changed': props<{ viewType: AppState['core']['radar']['type'] }>(),
    'Color scheme changed': props<{ colorScheme: number }>(),
    'Enabled snow changed': props<{ enabled: boolean }>(),
    'Enabled smooth changed': props<{ enabled: boolean }>(),
    'Animation speed': props<{ animationSpeed: number }>(),
    'Opacity changed': props<{ opacity: number }>(),
    'Widget bg color changed': props<{ color: string }>(),
    'Widget text color current changed': props<{ color: string }>(),
    'Widget text color past changed': props<{ color: string }>(),
    'Widget text color future changed': props<{ color: string }>(),
  },
});

export const rainViewersUrlsLoaded = createAction(
  '[core effect] Rain viewer URLs loaded',
  props<{ data: IRainViewerUrls }>()
);
