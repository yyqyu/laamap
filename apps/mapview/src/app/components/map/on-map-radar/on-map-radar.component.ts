import { Component } from '@angular/core';
import { interval, map, switchMap } from 'rxjs';
import { RainViewerService } from '../../../services/rain-viewer.service';

@Component({
  selector: 'laamap-on-map-radar',
  templateUrl: './on-map-radar.component.html',
  styleUrls: ['./on-map-radar.component.scss'],
})
export class OnMapRadarComponent {
  rainViewerTileUrl$ = this.rainViewer.getDef$().pipe(
    switchMap((urls) =>
      interval(1000).pipe(
        map((interval) =>
          urls.map((url, index) => ({
            url,
            visible:
              index === interval % urls.length ||
              index - 1 === interval % urls.length,
            fadeOut: index === interval % urls.length,
          }))
        )
      )
    ),
    switchMap((value) =>
      interval(50).pipe(
        map((animationInterval) =>
          value.map((layer) => ({
            url: layer.url,
            opacity: !layer.visible
              ? 0
              : layer.fadeOut
              ? Math.max(
                  ((10 - (animationInterval ?? 0)) / 10) * 0.75 * 0.75,
                  0
                )
              : 1,
          }))
        )
      )
    )
  );

  constructor(private rainViewer: RainViewerService) {}

  radarTileIdentify(
    index: number,
    layer: {
      url: string;
    }
  ): string {
    return layer.url;
  }
}
