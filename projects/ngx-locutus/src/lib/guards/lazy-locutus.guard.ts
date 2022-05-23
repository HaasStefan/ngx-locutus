import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { TRANSLATION_CONFIGURATIONS } from '../injection-tokens';
import { TranslationConfiguration } from '../models/translation-configuration.model';
import { LocutusService } from '../services/locutus.service';

@Injectable({
  providedIn: 'root'
})
export class LazyLocutusGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    @Inject(TRANSLATION_CONFIGURATIONS) private configs: TranslationConfiguration[],
    private locutus: LocutusService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.configs.forEach(config => {
      this.locutus.registerChild(config);
    });
    return true;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.configs.forEach(config => {
      this.locutus.registerChild(config);
    });
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean {
    this.configs.forEach(config => {
      this.locutus.registerChild(config);
    });
    return true;
  }
}
