import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MapMouseEvent } from 'maplibre-gl';
import { interval } from 'rxjs';
import { RainViewerService } from '../../services/rain-viewer.service';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';

@Component({
  selector: 'laamap-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  rainViewerTileUrl$ = this.rainViewer.getDef$();
  interval$ = interval(1000);
  constructor(
    private dialog: MatDialog,
    private rainViewer: RainViewerService
  ) {}

  click(event: MapMouseEvent): void {
    console.log(event);
  }

  radarTileIdentify(index: number, url: string): string {
    return url;
  }

  openDialog(): void {
    this.dialog.open(SettingsDialogComponent, {width: '100%'}).afterClosed();
  }
}
