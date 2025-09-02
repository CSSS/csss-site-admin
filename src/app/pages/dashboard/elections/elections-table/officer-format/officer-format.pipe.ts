import { Pipe, PipeTransform } from '@angular/core';
import { getValueOfKey } from '../../../../../utils/type-utils';
import { officerLabels } from '../../../officers';

@Pipe({
  name: 'officerFormat'
})
export class OfficerFormatPipe implements PipeTransform {
  transform(value: string): string {
    return getValueOfKey(officerLabels, value) ?? value;
  }
}
