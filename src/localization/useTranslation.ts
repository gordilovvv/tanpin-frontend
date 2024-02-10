import { useTranslation as useTranslationI18Next } from 'react-i18next';
import { namespace } from './config';

export function useTranslation() {
    const context = useTranslationI18Next(namespace);
    const locale = context.i18n.language;

    return {
        ...context,
        locale
    };
}