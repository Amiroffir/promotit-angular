import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  transform(items: any[], selectedValue: string, direction: string): any[] {
    if (!items) return [];
    if (!selectedValue || selectedValue === '') return items;

    return items.sort((a, b) => {
      if (typeof items[0][selectedValue] === 'string') {
        if (a[selectedValue] < b[selectedValue]) {
          return direction === 'asc' ? -1 : 1;
        }
        if (a[selectedValue] > b[selectedValue]) {
          return direction === 'asc' ? 1 : -1;
        }
        return 0;
      } else {
        return direction === 'asc'
          ? a[selectedValue] - b[selectedValue]
          : b[selectedValue] - a[selectedValue];
      }
    });
  }
}
