import { APP_BASE_HREF } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Host,
  Inject,
  Optional,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MapComponent } from '@maplibre/ngx-maplibre-gl';
import { ExpressionFilterSpecification } from 'maplibre-gl';
import { forkJoin, fromEvent, map, Observable, take, tap } from 'rxjs';
import {
  EAirportType,
  IAirportResponse,
} from '../../../services/open-aip/airport.interfaces';
import { OpenAipService } from '../../../services/open-aip/open-aip.service';
import { AirportDialogComponent } from '../../airport-dialog/airport-dialog.component';

@Component({
  selector: 'laamap-on-map-airport',
  templateUrl: './on-map-airport.component.html',
  styleUrls: ['./on-map-airport.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnMapAirportComponent {
  airPorts$ = this.openApi.getAirports$();
  EAirportType = EAirportType;

  imageLoaded = false;
  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly openApi: OpenAipService,
    private readonly dialog: MatDialog,
    @Inject(APP_BASE_HREF) private readonly baseHref: string,
    @Optional() @Host() private readonly map?: MapComponent
  ) {
    this.loadAirportImages();
  }

  hover(): void {
    if (this.map) {
      this.map.mapInstance.getCanvasContainer().style.cursor = 'pointer';
    }
  }

  hoverEnd(): void {
    if (this.map) {
      this.map.mapInstance.getCanvasContainer().style.cursor = '';
    }
  }

  airportClicked(airPortDef?: import('geojson').GeoJsonProperties): void {
    if (airPortDef) {
      const airPort = this.decodeGeoJsonProperties(
        airPortDef
      ) as IAirportResponse;

      this.dialog.open(AirportDialogComponent, {
        width: '100%',
        data: airPort,
      });
    }
  }

  get zoomLevelBasedFilter(): ExpressionFilterSpecification {
    return [
      'match',
      ['number', ['get', 'type']],
      EAirportType.ULTRA_LIGHT_FLYING_SITE,
      ['>=', ['zoom'], 7.2],
      EAirportType.AERODROME_CLOSED,
      ['>=', ['zoom'], 7.2],
      EAirportType.AIRFIELD_CIVIL,
      ['>=', ['zoom'], 7],
      true,
    ];
  }

  private decodeGeoJsonProperties(
    data: import('geojson').GeoJsonProperties
  ): object | null {
    if (data) {
      return Object.entries(data)
        .map(([key, value]) =>
          typeof value === 'string' &&
          (value.startsWith('[') || value.startsWith('{'))
            ? ([key, JSON.parse(value)] as const)
            : ([key, value] as const)
        )
        .reduce(
          (acc, [key, value]) => ({ ...acc, [key]: value }),
          {} as object
        );
    }
    return data;
  }

  private loadAirportImages(): void {
    forkJoin([
      this.loadMapImages(
        'runway-paved',
        this.baseHref + 'assets/open-aip-images/runway_paved-small.svg'
      ),
      this.loadMapImages(
        'runway-unpaved',
        this.baseHref + 'assets/open-aip-images/runway_unpaved-small.svg'
      ),
      this.loadMapImages(
        'ULTRA_LIGHT_FLYING_SITE', // ULTRA_LIGHT_FLYING_SITE
        this.baseHref + 'assets/open-aip-images/light_aircraft-small.svg'
      ),
      this.loadMapImages(
        'AIRFIELD_CIVIL', // AIRFIELD_CIVIL
        this.baseHref + 'assets/open-aip-images/af_civil-small.svg'
      ),
      this.loadMapImages(
        'INTERNATIONAL_AIRPORT', // INTERNATIONAL_AIRPORT
        this.baseHref + 'assets/open-aip-images/apt-small.svg'
      ),
      this.loadMapImages(
        'MILITARY_AERODROME', // MILITARY_AERODROME
        this.baseHref + 'assets/open-aip-images/ad_mil-small.svg'
      ),
      this.loadMapImages(
        'AERODROME_CLOSED', // AERODROME_CLOSED
        this.baseHref + 'assets/open-aip-images/ad_closed-small.svg'
      ),
      this.loadMapImages(
        'HELIPORT_CIVIL', // HELIPORT_CIVIL
        this.baseHref + 'assets/open-aip-images/heli_civil-small.svg'
      ),
    ]).subscribe(() => {
      this.imageLoaded = true;
      this.cdr.detectChanges();
    });
  }

  private loadMapImages(name: string, url: string): Observable<true> {
    const img = new Image();
    const event = fromEvent(img, 'load').pipe(
      tap(() => {
        if (this.map) {
          this.map.mapInstance.addImage(name, img);
        }
      }),
      map(() => true as const),
      take(1)
    );
    img.src = url;
    return event;
  }
}
