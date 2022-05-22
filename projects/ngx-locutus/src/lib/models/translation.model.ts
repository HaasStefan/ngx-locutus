import { Language } from "./languages.model";

export interface Translation {
  scope: string,
  language: Language,
  translations: any
}
