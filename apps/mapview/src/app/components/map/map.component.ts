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
    this.requestCompassPermission().then((res) => {
      if (res) {
        this.setupCompass()?.start();
      }
    });
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

  private async requestCompassPermission(): Promise<boolean> {
    navigator.permissions.query({ name: 'screen-wake-lock' });
    const results = await Promise.all([
      navigator.permissions.query({ name: 'accelerometer' as never }),
      navigator.permissions.query({ name: 'magnetometer' as never }),
      navigator.permissions.query({ name: 'gyroscope' as never }),
    ]);
    return results.every((result) => result.state === 'granted');
  }

  private setupCompass(): { start: () => void } | undefined {
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
            (-180 / Math.PI);

          switch (screen.orientation.type) {
            case 'landscape-primary':
              document.documentElement.style.setProperty(
                '--heading',
                `${heading}`
              );
              break;
            case 'landscape-secondary':
              document.documentElement.style.setProperty(
                '--heading',
                `${heading + 180}`
              );
              break;
            case 'portrait-primary':
              document.documentElement.style.setProperty(
                '--heading',
                `${heading - 90}`
              );
              break;
            case 'portrait-secondary':
              document.documentElement.style.setProperty(
                '--heading',
                `${heading + 90}`
              );
          }
        }
      );
      return sensor;
    }
    return undefined;
  }
}
