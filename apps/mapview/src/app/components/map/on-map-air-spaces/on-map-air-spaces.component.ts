import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ColorSpecification,
  DataDrivenPropertyValueSpecification,
  ExpressionFilterSpecification,
  FillExtrusionLayerSpecification,
  FillLayerSpecification,
} from 'maplibre-gl';
import { BehaviorSubject, map } from 'rxjs';
import { EAirSpaceType } from '../../../services/open-aip/airspacesinterfaces';
import { OpenAipService } from '../../../services/open-aip/open-aip.service';

type IAirSpaceSettings = {
  [key in EAirSpaceType]?: { filterIn: boolean; color: string };
};

@Component({
  selector: 'laamap-on-map-air-spaces',
  templateUrl: './on-map-air-spaces.component.html',
  styleUrls: ['./on-map-air-spaces.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnMapAirSpacesComponent {
  zoomLevel3D = 24;
  airSpaces$ = this.openApi.getAirSPaces$();
  settings$ = new BehaviorSubject<IAirSpaceSettings>({
    [EAirSpaceType.OTHER]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.RESTRICTED]: { filterIn: true, color: 'orange' },
    [EAirSpaceType.DANGER]: { filterIn: true, color: 'brown' },
    [EAirSpaceType.PROHIBITED]: { filterIn: true, color: 'red' },
    [EAirSpaceType.CTR]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.TMZ]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.RMZ]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.TMA]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.TRA]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.TSA]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.FIR]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.UIR]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.ADIZ]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.ATZ]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.MATZ]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.AIRWAY]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.MTR]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.ALERT_AREA]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.WARNING_AREA]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.PROTECTED_AREA]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.HTZ]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.GLIDER_SECTOR]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.TRP]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.TIZ]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.TIA]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.MTA]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.CTA]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.ACC]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.SPORT]: { filterIn: true, color: 'grey' },
    [EAirSpaceType.LOW_OVERFLIGHT_RESTRICTION]: { filterIn: true, color: 'grey' },
  });
  filter$ = this.settings$.pipe(map((settings) => this.toFilter(settings)));
  paint3D$ = this.settings$.pipe(map((settings) => this.toPaint3D(settings)));
  paint2D$ = this.settings$.pipe(map((settings) => this.toPaint2D(settings)));

  constructor(private readonly openApi: OpenAipService) {}

  airspaceClicked(event: any): void {
    console.log(
      'layer',
      event.features.map((x: any) => ({
        name: x.properties.name,
        U: x.properties.upperLimitMetersMsl,
        L: x.properties.lowerLimitMetersMsl,
      })),
      event.features
    );
  }

  private toFilter(value: IAirSpaceSettings): ExpressionFilterSpecification {
    const filterInTypes = Object.entries(value)
      .filter(([, value]) => value.filterIn)
      .map(([key]) => Number.parseInt(key));
    return ['all', ['in', ['get', 'type'], ['literal', filterInTypes]]];
  }

  private toPaint3D(
    value: IAirSpaceSettings
  ): FillExtrusionLayerSpecification['paint'] {
    return {
      'fill-extrusion-color': this.colors(value),
      'fill-extrusion-height': ['get', 'upperLimitMetersMsl'],
      'fill-extrusion-base': ['get', 'lowerLimitMetersMsl'],
      'fill-extrusion-opacity': 0.3,
    };
  }

  private toPaint2D(value: IAirSpaceSettings): FillLayerSpecification['paint'] {
    return {
      'fill-color': this.colors(value),
      'fill-opacity': ['step', ['zoom'], 0.1, this.zoomLevel3D, 0],
    };
  }

  private colors(
    value: IAirSpaceSettings
  ): DataDrivenPropertyValueSpecification<ColorSpecification> {
    return [
      ...Object.keys(value)
        .map((key) => Number.parseInt(key) as EAirSpaceType)
        .reduce(
          (acc, key) => [
            ...acc,
            ['==', ['get', 'type'], key],
            value[key]?.color ?? 'grey',
          ],
          ['case'] as unknown[]
        ),
      'grey',
    ] as DataDrivenPropertyValueSpecification<ColorSpecification>;
  }
}
