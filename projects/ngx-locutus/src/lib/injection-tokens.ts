import { InjectionToken } from "@angular/core";
import { TranslationConfiguration } from "./models/translation-configuration.model";

export const TRANSLATION_CONFIGURATION = new InjectionToken<TranslationConfiguration<any>>('');
