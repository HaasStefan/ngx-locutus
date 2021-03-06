import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocutusDirective } from './directives/locutus.directive';
import { LocutussPipe } from './pipes/locutus.pipe';
import { LocutusService } from './services/locutus.service';
import { RootTranslationConfiguration, TranslationConfiguration } from './models/translation-configuration.model';
import { TRANSLATION_CONFIGURATIONS } from './injection-tokens';
import { RegistrationService } from './services/registration.service';
import { registrationQueue$ } from './models/registration-queue.model';
import { InterpolatePipe } from './pipes/interpolate.pipe';


function initializeAppFactory(configs: (TranslationConfiguration | RootTranslationConfiguration)[], locutus: LocutusService): () => void {
  return () => {
      configs.forEach(config => {
        if (Object.keys(config).includes('language')) {
          locutus.registerRoot(config as RootTranslationConfiguration);
        }
        else {
          locutus.registerChild({
            scope: config.scope,
            loaders: config.loaders
          });
        }
      });
  };
}

@NgModule({
  declarations: [
    LocutusDirective,
    LocutussPipe,
    InterpolatePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LocutusDirective,
    LocutussPipe,
    InterpolatePipe
  ]
})
export class LocutusModule {

  constructor(private registration: RegistrationService) {}

  static forRoot(configs: (TranslationConfiguration | RootTranslationConfiguration)[]): ModuleWithProviders<LocutusModule> {
    return {
      ngModule: LocutusModule,
      providers: [
        {
          provide: TRANSLATION_CONFIGURATIONS,
          useValue: configs,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initializeAppFactory,
          deps: [
            TRANSLATION_CONFIGURATIONS,
            LocutusService
          ],
          multi: true
        },
      ]
    };
  }

  static forChild(configs: TranslationConfiguration[]): ModuleWithProviders<LocutusModule> {
      registrationQueue$.next(configs);

    return {
      ngModule: LocutusModule,
      providers: [
      ]
    };
  }
}
