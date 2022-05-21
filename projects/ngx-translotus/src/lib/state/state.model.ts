// State Management from here:
// https://dev.to/angular/simple-yet-powerful-state-management-in-angular-with-rxjs-4f8g
// Shoutout to Florian Spier for this cool solution!

import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

export class State<T> {
  private state$: BehaviorSubject<T>;
  private initialState: T;

  constructor(initialState: T) {
    this.initialState = { ...initialState };
    this.state$ = new BehaviorSubject<T>(this.initialState);
  }

  protected get state(): T {
    return this.state$.getValue();
  }

  protected select<K>(mapFunction: (state: T) => K): Observable<K> {
    return this.state$.asObservable().pipe(
      map((state: T) => mapFunction(state)),
      distinctUntilChanged()
    );
  }

  protected setState(newState: Partial<T>) {
    this.state$.next({
      ...this.state,
      ...newState,
    });
  }
}
