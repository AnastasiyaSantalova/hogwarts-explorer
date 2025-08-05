import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyDash',
})
export class EmptyDashPipe implements PipeTransform {
  transform(value: any, placeholder: string = '— — —'): unknown {
    if (
      value === null ||
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' && Object.keys(value).length === 0)
    ) {
      return placeholder;
    }
    return String(value);
  }
}
