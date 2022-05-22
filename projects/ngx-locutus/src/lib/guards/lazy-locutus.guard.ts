import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TRANSLATION_CONFIGURATION } from '../locutus.module';
import { TranslationConfiguration } from '../models/translation-configuration.model';
import { LocutusService } from '../services/locutus.service';

@Injectable({
  providedIn: 'root'
})
export class LazyLocutusGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    @Inject(TRANSLATION_CONFIGURATION) private config: TranslationConfiguration<any>,
    private locutus: LocutusService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.locutus.registerChild(this.config);
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.locutus.registerChild(this.config);
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.locutus.registerChild(this.config);
    return true;
  }
}
