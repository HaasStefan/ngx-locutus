import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTranslotusComponent } from './ngx-translotus.component';



@NgModule({
  declarations: [NgxTranslotusComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxTranslotusComponent]
})
export class TranslotusModule {
  // todo:
  // forRoot --> TranslationConfiguration with defaultLanguage
  // forChild --> TranslationConfiguraiton without defaultLanguage
 }
