import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PicardComponent } from './picard.component';
import { PicardLoaders } from '../../assets/i18n/picard/picard';
import { RouterModule } from '@angular/router';
import { LocutusModule } from 'projects/ngx-locutus/src/public-api';
import { TroiLoaders } from '../../assets/i18n/troi/troi';


@NgModule({
  declarations: [
    PicardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PicardComponent
      },
    ]),
    LocutusModule.forChild([
      {
        scope: 'picard',
        loaders: PicardLoaders
      },
      {
        scope: 'troi',
        loaders: TroiLoaders
      }
    ])
  ]
})
export class PicardModule { }
