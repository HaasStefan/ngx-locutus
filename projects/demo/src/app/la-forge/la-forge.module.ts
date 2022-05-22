import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaForgeComponent } from './la-forge.component';
import { LazyLocutusGuard, LocutusModule } from 'projects/ngx-locutus/src/public-api';
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
        canActivate: [LazyLocutusGuard],
        component: LaForgeComponent
      }
    ]),
    LocutusModule.forChild({
      scope: 'laForge',
      loaders: LaForgeLoaders
    })
  ]
})
export class LaForgeModule { }
