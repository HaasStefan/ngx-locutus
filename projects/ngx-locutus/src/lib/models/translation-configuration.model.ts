import { Language } from "./languages.model";
import { TranslationLoader } from "./translation-loader.model";

export interface TranslationConfiguration {
  scope: string,
  loaders: TranslationLoader[]
}

export interface RootTranslationConfiguration extends TranslationConfiguration {
  scope: string,
  loaders: TranslationLoader[],
  language: Language
}
