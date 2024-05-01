import { Button } from '@/uikit';
import { useTranslation } from '@/localization';
import styles from './PageNotFound.module.scss';

export function PageNotFound() {
    const { t } = useTranslation();

    return (
        <div className={styles.wrap}>
            <div className={styles.content}>
                <div className={styles.info}>
                    <div className={styles.title}>
                        {t('This page does not exist.')}
                    </div>

                    <div className={styles.description}>
                        {t('We cannot find this page.')}
                    </div>
                </div>

                <div className={styles.buttons}>
                    <Button to='/'>
                        {t('Home')}
                    </Button>
                </div>
            </div>
        </div>
    );
}