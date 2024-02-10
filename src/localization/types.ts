import { KeyPrefix, Namespace, TFunction } from 'i18next';

export interface Language {
    locale: string,
    language: string,
    image: string
}

export type TranslateFunction = TFunction<Namespace, KeyPrefix<Namespace>>;