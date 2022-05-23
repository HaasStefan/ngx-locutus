import { Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';
import { map, Observable } from 'rxjs';
import { LocutusService } from '../services/locutus.service';

@Pipe({
  name: 'locutus'
})
export class LocutussPipe implements PipeTransform {
  constructor(private locutus: LocutusService) { }

  transform(value: string, ...args: string[]): Observable<string> {
    if (!value) return of(value);
    if (!args) return of(value);
    if (args.length < 1) return of(value);

    return this.locutus.getTranslations(args[0])
      .pipe(
        map(translations => {
          if (!translations) return value;
          return this.getValue(translations, value.split('.')) as string ?? value;
        })
      );
  }

  private getValue(translation: any, keys: string[]): any {
    if (!translation) return null;
    if (keys.length == 0) return translation;
    if (!translation[keys[0]]) return null;
    const key = keys[0];
    keys.shift();
    return this.getValue(translation[key], keys);
  }
}
