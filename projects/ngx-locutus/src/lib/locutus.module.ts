import { APP_INITIALIZER, InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocutusDirective } from './directives/locutus.directive';
import { LocutussPipe } from './pipes/locutus.pipe';
import { LocutusService } from './services/locutus.service';
import { LazyLocutusGuard } from './guards/lazy-locutus.guard';
import { TranslationConfiguration } from './models/translation-configuration.model';
import { Language } from './models/languages.model';
import { TRANSLATION_CONFIGURATION } from './injection-tokens';


function initializeAppFactory(config: TranslationConfiguration<any> & { language: Language }, locutus: LocutusService): () => void {
  return () => {
      if (config.language) {
        locutus.registerRoot(config);
        return;
      }

      locutus.registerChild({
        scope: config.scope,
        loaders: config.loaders
      });
  };
}

@NgModule({
  declarations: [
    LocutusDirective,
    LocutussPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LocutusDirective,
    LocutussPipe
  ]
})
export class LocutusModule {

  constructor() {}

  static forRoot<T>(config: TranslationConfiguration<T> & { language: Language }): ModuleWithProviders<LocutusModule> {
    return {
      ngModule: LocutusModule,
      providers: [
        {
          provide: TRANSLATION_CONFIGURATION,
          useValue: config,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initializeAppFactory,
          deps: [
            TRANSLATION_CONFIGURATION,
            LocutusService
          ],
          multi: true
        },
      ]
    };
  }

  static forChild<T>(config: TranslationConfiguration<T>): ModuleWithProviders<LocutusModule> {
    return {
      ngModule: LocutusModule,
      providers: [
        {
          provide: TRANSLATION_CONFIGURATION,
          useValue: config,
        },
        {
          provide: LazyLocutusGuard,
          deps: [TRANSLATION_CONFIGURATION, LocutusService]
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initializeAppFactory,
          deps: [
            TRANSLATION_CONFIGURATION,
            LocutusService
          ],
          multi: true
        },
      ]
    };
  }
}
