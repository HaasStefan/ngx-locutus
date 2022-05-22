import { TranslationLoader } from 'projects/ngx-locutus/src/public-api'
import { from } from 'rxjs'

export interface LaForge {
  name: string,
  interest: string
}

// the translation files must be referenced hardcoded to avoid them from beeing treeshaken
export const LaForgeLoaders: TranslationLoader<LaForge>[] = [
  { de: () => from(import('./de').then(t => t.DE)) },
  { en: () => from(import('./en').then(t => t.EN)) }
]
