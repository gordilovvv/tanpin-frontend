import { UnstyleButton } from '@/uikit';
import { languageList } from '@/localization';
import styles from './LanguagesList.module.scss';

type LanguagesListProps = {
    onChange: (locale: string) => void
}

export function LanguagesList({ onChange }: LanguagesListProps) {
    return (
        <div className={styles.list}>
            {languageList.map(({ language, locale, image }) => <UnstyleButton
                key={locale}
                className={styles.button}
                onClick={() => onChange(locale)}
            >
                <div className={styles.buttonIcon}>
                    <img
                        src={image}
                        alt={locale}
                    />
                </div>

                <div className={styles.buttonText}>
                    {language}
                </div>
            </UnstyleButton>)}
        </div>
    );
}