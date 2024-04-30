import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invert',
  standalone: true
})
export class InvertPipe implements PipeTransform {

  transform(array: any[]): any[] {
    let outArray : any[] = [];
    for (let i = array.length - 1; i >= 0; i--) {
      outArray.push({...array[i]});
    }
    return outArray;
  }

}
