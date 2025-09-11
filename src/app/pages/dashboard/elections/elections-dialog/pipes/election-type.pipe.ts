import { Pipe, PipeTransform } from '@angular/core';
import { ElectionTypeEnum } from '@api/backend-api';
import { getValueOfKey } from '@utils/type-utils';

export const electionTypeLabels = {
  general_election: 'General',
  by_election: 'By-election',
  council_rep_election: 'Council Representative'
} as const;

export type ElectionType = keyof typeof electionTypeLabels;

@Pipe({
  name: 'electionType'
})
export class ElectionTypePipe implements PipeTransform {
  transform(value: ElectionTypeEnum): unknown {
    return getValueOfKey(electionTypeLabels, value) ?? value;
  }
}
