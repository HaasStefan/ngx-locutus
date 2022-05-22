import { Inject, Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { TRANSLATION_CONFIGURATION } from '../locutus.module';
import { TranslationConfiguration } from '../models/translation-configuration.model';
import { LocutusService } from '../services/locutus.service';

@Injectable()
export class LazyLocutusResolver implements Resolve<boolean> {

  constructor(
    @Inject(TRANSLATION_CONFIGURATION) private config: TranslationConfiguration<any>,
    private locutus: LocutusService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.locutus.registerChild(this.config);
  }
}
