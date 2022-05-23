import { BehaviorSubject } from "rxjs";
import { TranslationConfiguration } from "./translation-configuration.model";

export var registrationQueue$ = new BehaviorSubject<TranslationConfiguration | null>(null);
