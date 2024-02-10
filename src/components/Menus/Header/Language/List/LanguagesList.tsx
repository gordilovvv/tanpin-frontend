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
                <span className={styles.buttonIcon}>
                    <img
                        src={image}
                        alt={locale}
                    />
                </span>

                <span className={styles.buttonText}>
                    {language}
                </span>
            </UnstyleButton>)}
        </div>
    );
}