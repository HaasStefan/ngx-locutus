import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LocutusModule } from 'projects/ngx-locutus/src/public-api';
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
        path: '',
        loadChildren: () => import('./picard/picard.module').then(m => m.PicardModule)
      }
    ]),
    LocutusModule.forRoot({
      loaders: Scope1Loaders,
      scope: 'scope1',
      language: 'de'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
