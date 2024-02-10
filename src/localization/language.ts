import { useEffect, useRef } from 'react';
import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import { namespace, supportedLanguages } from './config';
import { fetchTranslations, getPreferredLanguage } from './utils';

export function useResourceBundleLoader() {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const prevLanguageRef = useRef(currentLanguage);

    useEffect(() => {
        let isMounted = true;

        if (!i18next.hasResourceBundle(currentLanguage, namespace)) {
            const prevLanguage = prevLanguageRef.current;

            if (i18next.hasResourceBundle(prevLanguage, namespace)) {
                const resources = i18n.getResourceBundle(prevLanguage, namespace);

                i18n.addResources(currentLanguage, namespace, resources);
            }

            const loadResourceBundle = async (language: string) => {
                const loadPromises = [fetchTranslations(language)];

                return Promise.all(loadPromises);
            };

            loadResourceBundle(currentLanguage)
                .then((resources) => {
                    resources.forEach(({ languageCode, resource }) => {
                        i18n.addResources(
                            languageCode,
                            namespace,
                            resource
                        );
                    });

                    if (isMounted) {
                        prevLanguageRef.current = currentLanguage;
                        // @ts-ignore
                        i18n.store.emit('custom-events/bundle-loaded');
                    }
                });
        }

        return () => {
            isMounted = false;
        };
    }, [i18n, currentLanguage]);

    return {
        isLoading: !i18next.hasResourceBundle(currentLanguage, namespace) && !i18next.hasResourceBundle(prevLanguageRef.current, namespace)
    };
}

const preferredLanguage = getPreferredLanguage();
const resources = supportedLanguages.reduce((resources, lang) => {
    resources[lang] = {};

    return resources;
}, {});

i18next
    .use(initReactI18next)
    .init({
        fallbackLng: false,
        lng: preferredLanguage,
        supportedLngs: supportedLanguages,
        resources,
        interpolation: {
            escapeValue: false
        },
        react: {
            transSupportBasicHtmlNodes: true,
            bindI18nStore: 'custom-events/bundle-loaded'
        }
    });