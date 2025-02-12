import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import {
  ColorSpecification,
  DataDrivenPropertyValueSpecification,
  ExpressionFilterSpecification,
  ExpressionSpecification,
} from 'maplibre-gl';

import { AirspacesDialogComponent } from '../../../components/airspaces-dialog/airspaces-dialog.component';
import { IAirSpaceSettingsObject } from '../../../store/core/airspaces-defaults';
import { MapHelperFunctionsService } from '../../map-helper-functions/map-helper-functions.service';
import { EAirSpaceType, IAirspace } from '../../open-aip/airspaces.interfaces';
import { MapService } from '../map.service';

@Injectable({
  providedIn: 'root',
})
export class OnMapAirSpacesService {
  constructor(
    private readonly mapService: MapService,
    private readonly dialog: MatDialog,
    private readonly mapHelper: MapHelperFunctionsService
  ) {}

  createLayers(
    airSpaces: GeoJSON.FeatureCollection<GeoJSON.Geometry, IAirspace>
  ): void {
    this.mapService.instance.addSource('airspacesSource', {
      type: 'geojson',
      data: airSpaces,
    });

    this.mapService.instance.addLayer(
      {
        id: 'airspacesLayerBorder',
        type: 'line',
        source: 'airspacesSource',
      },
      'notamsLayer'
    );

    this.mapService.instance.addLayer(
      {
        id: 'airspacesLayerClick',
        type: 'fill',
        source: 'airspacesSource',
      },
      'notamsLayer'
    );

    this.addClickListener();
  }

  reloadSettings(settings: IAirSpaceSettingsObject): void {
    this.mapService.instance.setFilter(
      'airspacesLayerBorder',
      this.createFilter(settings)
    );

    this.mapService.instance.setFilter(
      'airspacesLayerClick',
      this.createFilter(settings)
    );

    this.mapService.instance.setPaintProperty(
      'airspacesLayerClick',
      'fill-color',
      this.colors(settings)
    );
    this.mapService.instance.setPaintProperty(
      'airspacesLayerClick',
      'fill-opacity',
      this.opacity(settings)
    );
  }

  private addClickListener(): void {
    this.mapService.instance.on(
      'click',
      'airspacesLayerClick',
      (event: {
        features?: Feature<Geometry, GeoJsonProperties>[] | undefined;
      }) => {
        if (this.dialog.getDialogById('notamDialog')) {
          return;
        }
        const airspaces = event.features?.map(
          (feature) =>
            this.mapHelper.decodeGeoJsonProperties(
              feature.properties
            ) as IAirspace
        );

        this.dialog.open(AirspacesDialogComponent, {
          width: '100%',
          data: airspaces,
          id: 'airspaceDialog',
        });
      }
    );
  }

  private createFilter(
    value: IAirSpaceSettingsObject
  ): ExpressionFilterSpecification {
    const filterInTypes = Object.entries(value)
      .filter(([, value]) => value.enabled)
      .map(([key]) => Number.parseInt(key));

    const x = Object.entries(value).reduce<ExpressionSpecification>(
      (acc, [key, value]) =>
        [
          ...acc,
          Number(key),
          ['>=', ['zoom'], value.minZoom],
        ] as ExpressionSpecification,
      [
        'match',
        ['number', ['get', 'type']],
      ] as unknown as ExpressionSpecification
    );

    return [
      'all',
      ['in', ['get', 'type'], ['literal', filterInTypes]],
      [...(x as unknown[]), true] as ExpressionSpecification,
    ];
  }

  private colors(
    value: IAirSpaceSettingsObject
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

  private opacity(
    value: IAirSpaceSettingsObject
  ): DataDrivenPropertyValueSpecification<number> {
    return [
      ...Object.keys(value)
        .map((key) => Number.parseInt(key) as EAirSpaceType)
        .reduce(
          (acc, key) => [
            ...acc,
            ['==', ['get', 'type'], key],
            value[key]?.opacity ?? 0.1,
          ],
          ['case'] as unknown[]
        ),
      0.1,
    ] as DataDrivenPropertyValueSpecification<number>;
  }
}
