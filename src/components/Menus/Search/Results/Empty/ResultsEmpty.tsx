import { useTranslation } from '@/localization';
import styles from './ResultsEmpty.module.scss';

export function ResultsEmpty() {
    const { t } = useTranslation();

    return (
        <div className={styles.empty}>
            {t('Nothing found')}
        </div>
    );
}