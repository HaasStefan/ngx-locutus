import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaForgeComponent } from './la-forge.component';
import { LocutusModule } from 'projects/ngx-locutus/src/public-api';
import { LaForgeLoaders } from '../../assets/i18n/la-forge/la-forge';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LaForgeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LaForgeComponent
      }
    ]),
    LocutusModule.forChild([
      {
        scope: 'laForge',
        loaders: LaForgeLoaders
      },
      {
        scope: 'laForge2',
        loaders: LaForgeLoaders
      }
    ])
  ],
  exports: [LaForgeComponent]
})
export class LaForgeModule { }
