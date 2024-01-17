import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'description',
  standalone: true
})
export class DescriptionPipe implements PipeTransform {

  transform(value: string, args: number): string {
    return value.length <= args ? value : `${value.substring(0,args)}...`;
  }

}
