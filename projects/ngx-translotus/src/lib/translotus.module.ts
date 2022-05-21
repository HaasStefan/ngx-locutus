import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTranslotusComponent } from './ngx-translotus.component';
import { TranslotusDirective } from './directives/translotus.directive';
import { TranslotusPipe } from './pipes/translotus.pipe';



@NgModule({
  declarations: [NgxTranslotusComponent, TranslotusDirective, TranslotusPipe],
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
