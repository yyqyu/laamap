import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, share, switchMap } from 'rxjs';
import { IRainViewerUrls } from './rain-viewer.interface';

@Injectable({
  providedIn: 'root',
})
export class RainViewerService {
  readonly tileSize = 256;
  constructor(private http: HttpClient) {}

  getDef$(): Observable<string[]> {
    // todo reload every 10minutes
    return this.http
      .get<IRainViewerUrls>(
        'https://api.rainviewer.com/public/weather-maps.json'
      )
      .pipe(
        map(defs=> ({...defs, coverage: `/v2/coverage/0/{size}/{z}/{x}/{y}/0/0_0.png`})),
        map((defs) => {
          const color = 1;
          const options = `1_0`;

          return defs.radar.past.map(
            (past) =>
              `${defs.host}${past.path}/${this.tileSize}/{z}/{x}/{y}/${color}/${options}.png`
          );
        }),
        share()
      );
  }
}
