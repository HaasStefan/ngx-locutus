import { Component } from '@angular/core';
import { LocutusService } from 'projects/ngx-locutus/src/lib/services/locutus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo';

  constructor(private locutus: LocutusService) {}

  changeLang() {
    let newLanguage = this.locutus.getActiveLanguage() == 'de' ? 'en' : 'de';
    this.locutus.setActiveLanguage(newLanguage);
  }
}
