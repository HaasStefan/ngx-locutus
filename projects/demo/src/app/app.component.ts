import { Component, OnInit } from '@angular/core';
import { LocutusService } from 'projects/ngx-locutus/src/lib/services/locutus.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title$ = new Observable<string>();
  message!: string;

  constructor(private locutus: LocutusService) {}

  ngOnInit(): void {
    this.title$ = this.locutus.translate('scope1', 'title');

    // avoid this:
    // because the translation might not be registered yet
    // it even will throw an error in this demo because exactly that is the case!
    this.message = this.locutus.instant('scope1', 'message');
  }

  changeLang() {
    let newLanguage = this.locutus.getActiveLanguage() == 'de' ? 'en' : 'de';
    this.locutus.setActiveLanguage(newLanguage);
  }
}
