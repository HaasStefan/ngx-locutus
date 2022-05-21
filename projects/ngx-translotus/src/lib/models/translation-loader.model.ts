import { Observable } from "rxjs";

export interface TranslationLoader<T> {
  [key: string]: () => Observable<T>;
};
