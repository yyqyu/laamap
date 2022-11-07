import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, share } from 'rxjs';
import {
  ERunwayComposition,
  IAirport,
  IAirportResponse,
  IRunway,
} from './airport';

@Injectable({
  providedIn: 'root',
})
export class OpenAipService {
  constructor(private readonly http: HttpClient) {}

  getAirports$(): Observable<{ features: { properties: IAirport }[] }> {
    return this.http
      .get<{ features: { properties: IAirportResponse }[] }>(
        'assets/open-aip-db/sk_apt.geojson'
      )
      .pipe(
        map((json) => ({
          ...json,
          features: json.features.map((feature) => ({
            ...feature,
            properties: {
              ...feature.properties,
              mainRunway: this.runwayPaved(
                feature.properties.runways?.find((runway) => runway.mainRunway)
              ),
              runways: feature.properties.runways?.sort((a, b) =>
                a.mainRunway === b.mainRunway ? 0 : a.mainRunway ? -1 : 1
              ),
              mainFrequency:
                feature.properties.frequencies?.find((freq) => freq.primary) ??
                {},
              frequencies: feature.properties.frequencies?.sort((a, b) =>
                a.primary === b.primary ? 0 : a.primary ? -1 : 1
              ),
            },
          })),
        })),
        share()
      );
  }

  private runwayPaved(
    runway?: IRunway
  ): (IRunway & { paved: boolean }) | Record<string, never> {
    if (!runway) {
      return {};
    }
    return {
      ...runway,
      paved:
        runway.surface.mainComposite in
        [ERunwayComposition.ASPHALT, ERunwayComposition.CONCRETE],
    };
  }
}
