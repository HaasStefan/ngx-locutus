import { Component, OnInit } from '@angular/core';
import { LocutusService } from 'projects/ngx-locutus/src/public-api';
import { LaForgeReplacementLoaders } from '../../assets/i18n/la-forge-replacement/la-forge';

@Component({
  selector: 'app-la-forge',
  templateUrl: './la-forge.component.html',
  styleUrls: ['./la-forge.component.scss']
})
export class LaForgeComponent implements OnInit {
  interest!: string;
  constructor(private locutus: LocutusService) { }

  ngOnInit(): void {
  }

  replace() {
    this.locutus.replace({
      scope: 'laForge',
      loaders: LaForgeReplacementLoaders
    });
  }

  instant() {
    this.interest = this.locutus.instant('laForge', 'interest');
  }
}
