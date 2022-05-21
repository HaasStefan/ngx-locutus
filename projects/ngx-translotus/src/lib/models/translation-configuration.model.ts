import { TranslationLoader } from "./translation-loader.model";

export interface TranslationConfiguration<T> {
  scope: string,
  loaders: TranslationLoader<T>[]
}
