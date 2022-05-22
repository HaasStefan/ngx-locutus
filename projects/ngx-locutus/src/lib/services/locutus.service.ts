import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Language } from '../models/languages.model';
import { TranslationConfiguration } from '../models/translation-configuration.model';
import { EMPTY, map, of, Subscription, switchMap, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Translation } from '../models/translation.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocutusService implements OnDestroy {
  activeLanguage$ = new BehaviorSubject<Language | null>(null);
  translations$ = new BehaviorSubject<Translation[]>([]);
  actionLog$ = new BehaviorSubject<{ type: 'languageChanged' | 'registeredChild' | 'registeredRoot' | 'translationAdded' } | null>(null);
  private subscription = new Subscription();
  private activeLanguage: Language | null = null;
  private translations: Translation[] = [];
  private configurations: TranslationConfiguration<any>[] = [];

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setActiveLanguage(lang: Language) {
    console.log(this.translations)
    if (this.activeLanguage === lang) {
      console.warn(`Language: ${lang} is already the active language.`);
      return;
    }
    this.loadAllTranslations(this.configurations, lang).subscribe(_ => {
      this.activeLanguage = lang;
      this.activeLanguage$.next(this.activeLanguage);
      this.actionLog$.next({ type: 'languageChanged' });
    });
  }

  getActiveLanguage(): Language {
    return this.activeLanguage as Language;
  }

  getTranslations(scope: string): Observable<any> {
    return this.actionLog$.pipe(
      map(change => {
        if (!change) return EMPTY;

        const index = this.translations.findIndex(
          x => x.scope === scope && x.language === this.activeLanguage);
        if (index < 0) return EMPTY;

        return of(this.translations[index].translations);
      }),
      switchMap(translations => translations)
    );
  }

  translate(scope: string, key: string): string | null {
    const scopeIndex = this.translations.findIndex(x => x.scope === scope);
    if (scopeIndex < 0) return null;

    const translation = this.translations[scopeIndex].translations[key];
    return translation;
  }

  registerRoot<T>(config: TranslationConfiguration<T> & { language: Language }) {
    this.configurations = [
      ...this.configurations,
      config
    ];

    this.subscription.add(
      this.loadTranslation(config, config.language).subscribe(
        _ => {
          this.activeLanguage = config.language;
          this.activeLanguage$.next(this.activeLanguage);
          this.actionLog$.next({ type: 'registeredRoot' });
        }
      )
    );
  }

  registerChild<T>(config: TranslationConfiguration<T>) {
    this.configurations = [
      ...this.configurations,
      config
    ];

    this.subscription.add(
      this.loadAllTranslations([...this.configurations], this.activeLanguage as Language).subscribe(
        _ => this.actionLog$.next({ type: 'registeredChild' })
      )
    );
  }

  private loadAllTranslations(configs: TranslationConfiguration<any>[], lang: Language): Observable<any> {
    let config = configs.shift();
    if (!config) return of(null);

    return this.loadAllTranslations(configs, lang).pipe(
      switchMap(_ => this.loadTranslation(config as TranslationConfiguration<any>, lang))
    );
  }

  private loadTranslation<T>(config: TranslationConfiguration<T>, lang: Language): Observable<any> {
    if (this.isLoaded(config.scope, lang)) return EMPTY;

    const loaderIndex = config.loaders.findIndex(loader => lang in loader);
    if (loaderIndex < 0) return EMPTY;

    return config.loaders[loaderIndex][lang]()
      .pipe(
        tap(translations => {
          this.translations = [
            ...this.translations,
            {
              scope: config.scope,
              language: lang,
              translations: translations
            }
          ];
          this.translations$.next(this.translations);
          this.actionLog$.next({ type: 'translationAdded' });
        })
      );
  }


  private isLoaded(scope: string, lang: Language): boolean {
    return this.getTranslationIndex(scope, lang) >= 0;
  }

  private getTranslationIndex(scope: string, lang: Language): number {
    return this.translations.findIndex(t => t.scope === scope && t.language === lang);
  }
}