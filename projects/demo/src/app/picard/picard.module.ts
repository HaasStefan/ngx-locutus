import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PicardComponent } from './picard.component';
import { PicardLoaders } from '../../assets/i18n/picard/picard';
import { RouterModule } from '@angular/router';
import { LazyLocutusGuard, LocutusModule } from 'projects/ngx-locutus/src/public-api';


@NgModule({
  declarations: [
    PicardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        canActivate: [LazyLocutusGuard],
        component: PicardComponent
      },
    ]),
    LocutusModule.forChild({
      scope: 'picard',
      loaders: PicardLoaders
    })
  ]
})
export class PicardModule { }
