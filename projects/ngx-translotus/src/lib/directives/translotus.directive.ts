import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslotusService } from '../services/translotus.service';

@Directive({
  selector: '[translotus]'
})
export class TranslotusDirective implements OnDestroy {
  subscription = new Subscription();

  @Input()
  set translotusOf(scope: string) {
    this.view.clear();

    this.subscription.add(
      this.translotus.getTranslations(scope).subscribe(translations => {
        this.view.createEmbeddedView(this.template, {
          $implicit: translations
        });
      })
    );
  }

  constructor(
    private translotus: TranslotusService,
    private view: ViewContainerRef,
    private template: TemplateRef<any>
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
