import { Language } from "ngx-locutus";
import { TranslationLoader } from "./translation-loader.model";

export class TranslationConfiguration {
  scope!: string;
  loaders!: TranslationLoader[];
}


export class RootTranslationConfiguration extends TranslationConfiguration {
  override scope!: string;
  override loaders!: TranslationLoader[];
  language!: Language
}
