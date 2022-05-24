import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { registrationQueue$ } from '../models/registration-queue.model';
import { LocutusService } from './locutus.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService implements OnDestroy {
  subscription = new Subscription();

  constructor(private locutus: LocutusService) {
    this.subscription.add(
      registrationQueue$.subscribe(configs => {
        configs.forEach(config => {
          this.locutus.registerChild(config);
        })
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
