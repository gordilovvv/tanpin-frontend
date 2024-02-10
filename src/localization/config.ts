import { Language } from '.';

export const EN: Language = { locale: 'en', language: 'English' };
export const RU: Language = { locale: 'ru', language: 'Русский' };

export const languages: Record<'en' | 'ru', Language> = {
    'en': EN,
    'ru': RU
};

export const languageList = Object.values(languages);
export const supportedLanguages = languageList.map(language => language.locale);

export const namespace = 'translations';
export const defaultLanguage = EN;