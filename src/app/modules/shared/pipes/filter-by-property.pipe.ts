import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByProperty',
})
export class FilterByPropertyPipe implements PipeTransform {
  transform(items: any[], selectedValue: string, propertyName: string): any[] {
    if (!items) return [];
    if (!selectedValue || selectedValue === '') return items;

    return items.filter((item) => {
      return item[propertyName] === selectedValue;
    });
  }
}
