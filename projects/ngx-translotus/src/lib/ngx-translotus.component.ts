import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-ngx-translotus',
  template: `
    <p>
      ngx-translotus works!
    </p>

    <ng-container *translotus="let t of 'shared'">
      t.abc: {{t.abc}}
    </ng-container>
  `,
  styles: [
  ]
})
export class NgxTranslotusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
