import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByProperty',
})
export class FilterByPropertyPipe implements PipeTransform {
  transform(items: any[], selectedValue: string, propertyName?: string): any[] {
    if (!items) return [];
    if (!selectedValue || selectedValue === '') return items;
    if (!propertyName || propertyName === '') {
      return items.filter((item) => {
        for (const prop in item) {
          if (
            item.hasOwnProperty(prop) &&
            item[prop]
              .toString()
              .toLowerCase()
              .includes(selectedValue.toLowerCase())
          ) {
            return true;
          }
        }
        return false;
      });
    }
    return items.filter((item) => {
      return item[propertyName] === selectedValue;
    });
  }
}
