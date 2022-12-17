import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventData } from '@maplibre/ngx-maplibre-gl';
import { MapLibreEvent } from 'maplibre-gl';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const AbsoluteOrientationSensor: any;

@Component({
  selector: 'laamap-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  constructor(private dialog: MatDialog) {
    if (`AbsoluteOrientationSensor` in window) {
      const sensor = new AbsoluteOrientationSensor();
      sensor.addEventListener(
        'reading',
        (e: { target: { quaternion: number[] } }) => {
          const q = e.target.quaternion;
          const heading =
            Math.atan2(
              2 * q[0] * q[1] + 2 * q[2] * q[3],
              1 - 2 * q[1] * q[1] - 2 * q[2] * q[2]
            ) *
            (180 / Math.PI);
          console.log('heading', heading);

          document.documentElement.style.setProperty('--heading', `${heading}`);
        }
      );
      sensor.start();
    }
  }

  openSettingsDialog(): void {
    this.dialog.open(SettingsDialogComponent, { width: '100%' }).afterClosed();
  }

  rotate(
    event: MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  ): void {
    document.documentElement.style.setProperty(
      '--bearing',
      `${event.target.getBearing()}`
    );
  }
}
