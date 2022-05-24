import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocutusService } from '../services/locutus.service';

@Directive({
  selector: '[locutus]'
})
export class LocutusDirective implements OnDestroy {
  subscription = new Subscription();

  @Input()
  set locutusOf(scope: string) {
    this.subscription.add(
      this.locutus.getTranslations(scope).subscribe(translations => {
        if (!translations) return;
        this.view.clear();
        this.view.createEmbeddedView(this.template, {
          $implicit: translations
        });
      })
    );
  }

  constructor(
    private locutus: LocutusService,
    private view: ViewContainerRef,
    private template: TemplateRef<any>
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
