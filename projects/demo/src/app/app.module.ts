import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LazyLocutusGuard, LocutusModule } from 'projects/ngx-locutus/src/public-api';
import { Scope1Loaders } from '../assets/i18n/scope1/scope1';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'picard',
        loadChildren: () => import('./picard/picard.module').then(m => m.PicardModule)
      },
      {
        path: 'la-forge',
        loadChildren: () => import('./la-forge/la-forge.module').then(m => m.LaForgeModule)
      }
    ]),
    LocutusModule.forRoot([
      {
        loaders: Scope1Loaders,
        scope: 'scope1',
        language: 'de'
      },
      {
        loaders: Scope1Loaders,
        scope: 'duplicate'
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
