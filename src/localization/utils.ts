import { memoize } from 'lodash';
import { defaultLanguage, supportedLanguages } from './config';

export async function fetchTranslations(languageCode: string) {
    const response = await fetch(`/locales/${languageCode}.json?v=1`);
    const resource = await response.json();

    return {
        resource,
        languageCode
    };
}

export function normalizeLanguage(languageTag: string) {
    return languageTag.split('-')[0];
}

export const LANGUAGE_LS_KEY = 'tanpin.language';

export function getPreferredLanguage() {
    const savedLanguage = localStorage.getItem(LANGUAGE_LS_KEY);

    if (savedLanguage) {
        return savedLanguage;
    } else {
        const userLanguages = window.navigator && (window.navigator.languages || [window.navigator.language]);
        const preferredLanguage = userLanguages
            .map(language => normalizeLanguage(language))
            .find(language => supportedLanguages.includes(language));

        return preferredLanguage || defaultLanguage.locale;
    }
}

export function savePreferredLanguage(locale: string) {
    localStorage.setItem(LANGUAGE_LS_KEY, locale);
}

const includesVariableRegex = new RegExp(/%\S+?%/, 'gm');

export const translatedTextIncludesVariable = memoize((translatedText: string): boolean => {
    return !!translatedText?.match(includesVariableRegex);
});

export const getRegExpForDataKey = memoize((dataKey: string): RegExp => {
    return new RegExp(`%${dataKey}%`, 'g');
});
