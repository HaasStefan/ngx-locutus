import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { Observable, shareReplay } from 'rxjs';
import { Language } from '../models/languages.model';
import { State } from '../state/state.model';
import { Translation, TranslotusState } from '../state/translotus-state.model';

const INITIAL_STATE: TranslotusState = {
  translations: [],
  configurations: [],
  defaultLanguage: 'en',
  activeLanguage: 'en'
};

@Injectable({
  providedIn: 'root'
})
export class TranslotusService extends State<TranslotusState> {
  translations$: Observable<Translation[]> = this.select(state => state.translations).pipe(
    shareReplay({ refCount: true, bufferSize: 1 })
  );
  activeLanguage$: Observable<Language> = this.select(state => state.activeLanguage).pipe(
    shareReplay({ refCount: true, bufferSize: 1 })
    // todo: trigger configuration loading
  );

  // todo:
  // lazy load translations from configuration

  constructor() {
    super(INITIAL_STATE);
  }

  getDefaultLanguage(): Language {
    return this.state.defaultLanguage;
  }

  setDefaultLanguage(lang: Language) {
    this.setState({
      ...this.state,
      defaultLanguage: lang
    });
  }

  setActiveLanguage(lang: Language) {
    this.setState({
      ...this.state,
      activeLanguage: lang
    });
  }

  getTranslations(scope: string): Observable<any> {
    const index = this.state.translations.findIndex(x => x.scope === scope);
    if (index < 0) return EMPTY;

    return this.select(state => state.translations[index].translations).pipe(
      shareReplay({ refCount: true, bufferSize: 1 })
    )
  }

  translate(scope: string, key: string): string | null {
    const scopeIndex = this.state.translations.findIndex(x => x.scope === scope);
    if (scopeIndex < 0) return null;

    const translation = this.state.translations[scopeIndex].translations[key];
    return translation;
  }
}
