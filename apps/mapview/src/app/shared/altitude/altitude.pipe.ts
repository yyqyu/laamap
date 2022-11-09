import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { EHeightUnit, EReferenceDatum } from '../../services/open-aip/airport.interfaces.';

@Pipe({
  name: 'altitude',
})
export class AltitudePipe implements PipeTransform {
  constructor(private transloco: TranslocoService) {}
  transform(value: {
    value: number;
    unit: EHeightUnit;
    referenceDatum: EReferenceDatum;
  }): unknown {
    return `${value.value}${this.transloco.translate(
      'shared.altitude.heighUnit.' + value.unit
    )} ${this.transloco.translate(
      'shared.altitude.referenceDatum.' + value.referenceDatum
    )}`;
  }
}
