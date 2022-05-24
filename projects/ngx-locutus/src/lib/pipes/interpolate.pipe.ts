import { Pipe, PipeTransform } from '@angular/core';
import { LocutusService } from '../services/locutus.service';

@Pipe({
  name: 'interpolate'
})
export class InterpolatePipe implements PipeTransform {
  constructor(private locutus: LocutusService) {}

  transform(value: string, ...args: string[]): string {
    return this.locutus.interpolate(value, args);
  }

}
