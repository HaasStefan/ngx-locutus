import { Pipe, PipeTransform } from '@angular/core';
import { EMPTY, map, Observable } from 'rxjs';
import { LocutusService } from '../services/locutus.service';

@Pipe({
  name: 'locutus'
})
export class LocutussPipe implements PipeTransform {
  constructor(private locutus: LocutusService) { }

  transform(value: string, ...args: string[]): Observable<string> {
    if (!value) return EMPTY;
    if (!args) return EMPTY;
    if (args.length < 1) return EMPTY;

    return this.locutus.getTranslations(args[0]).pipe(
      map(translations => {
        if (!translations) return value;
        return translations[value] as string ?? value;
      })
    );
  }
}
