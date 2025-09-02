import { Pipe, PipeTransform } from '@angular/core';
import { officerLabels } from '@dashboard/officers';
import { getValueOfKey } from '@utils/type-utils';

@Pipe({
  name: 'officerFormat'
})
export class OfficerFormatPipe implements PipeTransform {
  transform(value: string): string {
    return getValueOfKey(officerLabels, value) ?? value;
  }
}
