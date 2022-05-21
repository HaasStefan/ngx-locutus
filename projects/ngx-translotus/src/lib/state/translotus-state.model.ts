import { Language } from "../models/languages.model"
import { TranslationConfiguration } from "../models/translation-configuration.model"

export interface TranslotusState {
  translations: Translation[],
  configurations: TranslationConfiguration<any>[],
  defaultLanguage: Language,
  activeLanguage: Language
}

export interface Translation {
  scope: string,
  translations: any
}
