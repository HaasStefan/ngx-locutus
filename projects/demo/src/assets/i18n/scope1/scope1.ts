
import { TranslationLoader } from 'projects/ngx-locutus/src/public-api'
import { from } from 'rxjs'

export interface Scope1 {
  title: string,
  message: string,
  text: string,
  helloWorld: string
}

// the translation files must be referenced hardcoded to avoid them from beeing treeshaken
export const Scope1Loaders: TranslationLoader<Scope1>[] = [
  { de: () => from(import('./de').then(t => t.DE)) },
  { en: () => from(import('./en').then(t => t.EN)) }
];
