import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RadarSettingsActions } from '../../store/core/core.actions';
import { selectRadarEnabled } from '../../store/core/core.selectors';

@Component({
  selector: 'laamap-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
})
export class SettingsDialogComponent {
  radarEnabled$ = this.store.select(selectRadarEnabled);

  constructor(private readonly store: Store) {}

  enableRadar(value: boolean): void {
    this.store.dispatch(
      RadarSettingsActions.enabledChanged({ enabled: value })
    );
  }
}
