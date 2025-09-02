import { Pipe, PipeTransform } from '@angular/core';
import { slugify } from '@utils/string-utils';

@Pipe({
  name: 'slug'
})
export class SlugPipe implements PipeTransform {
  transform(value: string): string {
    return slugify(value);
  }
}
