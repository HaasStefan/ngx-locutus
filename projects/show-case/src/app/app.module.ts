import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslotusModule } from 'projects/ngx-translotus/src/lib/translotus.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TranslotusModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
