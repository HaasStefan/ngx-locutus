import { Observable } from "rxjs";

export interface TranslationLoader {
  [key: string]: () => Observable<any>;
};
