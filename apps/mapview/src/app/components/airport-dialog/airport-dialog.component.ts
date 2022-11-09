import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAirport } from '../../services/open-aip/airport.interfaces.';
import lgZoom from 'lightgallery/plugins/zoom'

@Component({
  templateUrl: './airport-dialog.component.html',
  styleUrls: ['./airport-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AirportDialogComponent {
  gallerySettings = {
    counter: false,
    plugins: [lgZoom],
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: IAirport) {}
}
