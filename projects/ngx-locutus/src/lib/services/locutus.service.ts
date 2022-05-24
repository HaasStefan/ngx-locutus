import { Injectable, OnDestroy } from '@angular/core';
import { Language } from '../models/languages.model';
import { RootTranslationConfiguration, TranslationConfiguration } from '../models/translation-configuration.model';
import { distinctUntilChanged, EMPTY, map, of, Subscription, switchMap, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Translation } from '../models/translation.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocutusService implements OnDestroy {
  activeLanguage$ = new BehaviorSubject<Language | null>(null);
  private translations$ = new BehaviorSubject<Translation[]>([]);
  private subscription = new Subscription();
  private activeLanguage: Language | null = null;
  private translations: Translation[] = [];
  private configurations: TranslationConfiguration[] = [];
  private childConfigQueue: TranslationConfiguration[] = [];


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  setActiveLanguage(lang: Language) {
    if (this.activeLanguage === lang) {
      console.warn(`Language: ${lang} is already the active language.`);
      return;
    }

    this.activeLanguage = lang;
    this.activeLanguage$.next(this.activeLanguage);
    this.loadAllTranslations([...this.configurations], lang).subscribe(_ => {
      this.translations$.next(this.translations);
    });
  }

  getActiveLanguage(): Language {
    return this.activeLanguage as Language;
  }

  getTranslations(scope: string): Observable<any> {
    return this.translations$.pipe(
      map(_ => {
        const index = this.translations.findIndex(
          x => x.scope === scope && x.language === this.activeLanguage);
        if (index < 0) return of(null);
        return of(this.translations[index].translations);
      }),
      switchMap(translations => translations),
      distinctUntilChanged()
    );
  }

  translate(scope: string, key: string): Observable<string> {
    return this.getTranslations(scope).pipe(
      map(translations => {
        if (!translations) return EMPTY;
        if (!translations[key]) return EMPTY;

        return translations[key];
      })
    )
  }

  instant(scope: string, key: string): string {
    const scopeIndex = this.translations.findIndex(x => x.scope === scope && x.language === this.activeLanguage);
    if (scopeIndex < 0)
      throw { name: 'TranslationNotFoundError', message: `Translation with scope=${scope} not found!` };
    if (!this.translations[scopeIndex].translations[key])
      throw { name: 'TranslationNotFoundError', message: `Translation with scope=${scope} and key=${key} not found!` };

    return this.translations[scopeIndex].translations[key];
  }

  registerRoot(config: RootTranslationConfiguration) {
    this.configurations = [
      ...this.configurations,
      config
    ];
    this.activeLanguage = config.language;
    this.activeLanguage$.next(this.activeLanguage);

    this.subscription.add(
      this.loadTranslation(config, config.language).subscribe(_ => {
        this.workQueue();
      })
    );
  }

  registerChild(config: TranslationConfiguration) {
    if (this.configurations.findIndex(c => c.scope === config.scope) >= 0) return;
    if (this.translations.findIndex(t => t.scope === config.scope) >= 0) return;

    if (!this.activeLanguage) {
      this.childConfigQueue = [...this.childConfigQueue, config];
      return;
    }

    this.configurations = [
      ...this.configurations,
      config
    ];

    this.subscription.add(
      this.loadTranslation(config, this.activeLanguage as Language).subscribe()
    );
  }

  replace(replacement: TranslationConfiguration) {
    if (this.configurations.findIndex(c => c.scope === replacement.scope) < 0) {
      console.warn(`Could not replace scope=${replacement.scope} because it does not exist.`)
      return;
    }

    this.configurations = this.configurations.filter(c => c.scope !== replacement.scope);
    this.translations = this.translations.filter(c => c.scope !== replacement.scope);
    this.registerChild(replacement);
  }

  private loadAllTranslations(configs: TranslationConfiguration[], lang: Language): Observable<any> {
    let config = configs.shift();
    if (!config) return of(null);

    return this.loadAllTranslations(configs, lang).pipe(
      switchMap(_ => this.loadTranslation(config as TranslationConfiguration, lang))
    );
  }

  private loadTranslation(config: TranslationConfiguration, lang: Language): Observable<any> {
    if (this.isLoaded(config.scope, lang)) return of(null);

    const loaderIndex = config.loaders.findIndex(loader => lang in loader);
    if (loaderIndex < 0) return of(null);

    return config.loaders[loaderIndex][lang]()
      .pipe(
        map(translations => {
          const index = this.translations.findIndex(t => t.scope === config.scope && t.language === lang);
          if (index >= 0) return this.translations[index];
          this.translations = [
            ...this.translations,
            {
              scope: config.scope,
              language: lang,
              translations: translations
            }
          ];
          return translations;
        }),
        tap(_ => this.translations$.next(this.translations))
      );
  }


  private isLoaded(scope: string, lang: Language): boolean {
    return this.getTranslationIndex(scope, lang) >= 0;
  }

  private getTranslationIndex(scope: string, lang: Language): number {
    return this.translations.findIndex(t => t.scope === scope && t.language === lang);
  }

  private workQueue() {
    this.childConfigQueue.forEach(config => {
      this.registerChild(config);
    });
    this.childConfigQueue = [];
  }
}
