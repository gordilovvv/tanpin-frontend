import { Button } from '@/uikit';
import { useTranslation } from '@/localization';
import styles from './PageError.module.scss';

type PageErrorProps = {
    error?: string,
    details?: string,
    onReload?: () => void
}

export function PageError({ error, details, onReload }: PageErrorProps) {
    const { t } = useTranslation();

    const handlePageReload = () => {
        if (onReload) {
            onReload();
        } else {
            location.reload();
        }
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.content}>
                <div className={styles.info}>
                    <div className={styles.title}>
                        {t('An error occurred')}
                    </div>

                    <div className={styles.description}>
                        {error ?? t('Something went wrong!')}
                    </div>

                    {details && <div className={styles.error}>
                        {details}
                    </div>}
                </div>

                <div className={styles.buttons}>
                    <Button
                        view='primary'
                        onClick={handlePageReload}
                    >
                        {t('Reload')}
                    </Button>

                    <Button
                        as='a'
                        href='/'
                        view='secondary'
                    >
                        {t('Go to homepage')}
                    </Button>
                </div>
            </div>
        </div>
    );
}