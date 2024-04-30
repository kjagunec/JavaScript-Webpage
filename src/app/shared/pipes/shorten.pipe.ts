import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
  standalone: true
})
export class ShortenPipe implements PipeTransform {

  transform(text: string, numOfChar: number): string {
    if (text.length <= numOfChar) {
      return text;
    } else {
      let index = 0;
      while (index < numOfChar) {
        index = text.indexOf(" ", index + 1);
      }
      return text.slice(0, index) + "...";
    }
  }

}
