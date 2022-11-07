import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { EHeightUnit } from '../../services/open-aip/airport';

@Pipe({
  name: 'dimension',
})
export class DimensionPipe implements PipeTransform {
  constructor(private transloco: TranslocoService) {}
  transform(value: { value: number; unit: EHeightUnit }): unknown {
    return `${value.value}${this.transloco.translate(
      'shared.altitude.heighUnit.' + value.unit
    )}`;
  }
}
