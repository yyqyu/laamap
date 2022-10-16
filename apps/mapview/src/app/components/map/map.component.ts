import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';

@Component({
  selector: 'laamap-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  constructor(private dialog: MatDialog) {}

  openSettingsDialog(): void {
    this.dialog.open(SettingsDialogComponent, { width: '100%' }).afterClosed();
  }
}
