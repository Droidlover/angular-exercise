import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchString: string, propNameToBeMatched: string): any {
    if (value) {
      if (!searchString || searchString === '') {
        return value;
      }
      return value.filter((element) => {
        return element[propNameToBeMatched].toLowerCase().includes(searchString);
      });

    }
  }

}
