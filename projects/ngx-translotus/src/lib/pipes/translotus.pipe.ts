import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';
import { concatMap, EMPTY, map, mergeMap, switchMap } from 'rxjs';
import { Observable } from 'rxjs';
import { TranslotusService } from '../services/translotus.service';

@Pipe({
  name: 'translotus'
})
export class TranslotusPipe implements PipeTransform {
  constructor(private translotus: TranslotusService) { }

  transform(value: string, ...args: string[]): Observable<string> {
    if (!value) return EMPTY;
    if (!args) return EMPTY;
    if (args.length < 1) return EMPTY;

    return this.translotus.getTranslations(args[0]).pipe(
      map(translations => {
        if (!translations) return value;
        return translations[value] as string ?? value;
      })
    );
  }
}
