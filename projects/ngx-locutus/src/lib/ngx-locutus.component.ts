import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-ngx-locutus',
  template: `
    <p>
      ngx-locutus works!
    </p>

    <ng-container *locutus="let t of 'shared'">
      {{t.abc}}
    </ng-container>
    <br>
    {{ 'abc' | locutus:'shared' | async }}
  `,
  styles: [
  ]
})
export class NgxLocutusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
