import { Language } from './types';
import enImage from '@/app/assets/images/locales/en.png';
import ruImage from '@/app/assets/images/locales/ru.png';

export const version = '1.2';

export const EN: Language = { locale: 'en', language: 'English', image: enImage };
export const RU: Language = { locale: 'ru', language: 'Русский', image: ruImage };

export const languages: Record<'en' | 'ru', Language> = {
    'en': EN,
    'ru': RU
};

export const languageList = Object.values(languages);
export const supportedLanguages = languageList.map(language => language.locale);

export const namespace = 'translations';
export const defaultLanguage = EN;