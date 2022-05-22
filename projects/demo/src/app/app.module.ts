import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocutusModule } from 'projects/ngx-locutus/src/public-api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LocutusModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
