import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLocutusComponent } from './ngx-locutus.component';
import { LocutusDirective } from './directives/locutus.directive';
import { LocutussPipe } from './pipes/locutus.pipe';



@NgModule({
  declarations: [NgxLocutusComponent, LocutusDirective, LocutussPipe],
  imports: [
    CommonModule
  ],
  exports: [NgxLocutusComponent]
})
export class LocutusModule {
  // todo:
  // forRoot --> TranslationConfiguration with defaultLanguage
  // forChild --> TranslationConfiguraiton without defaultLanguage
 }
