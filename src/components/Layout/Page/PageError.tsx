import { Button } from '@/uikit';
import styles from './PageError.module.scss';

type PageErrorProps = {
    error?: string,
    details?: string,
    onReload?: () => void
}

export function PageError({ error, details, onReload }: PageErrorProps) {
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
                        An error occurred
                    </div>

                    <div className={styles.description}>
                        {error ?? 'Something went wrong'}
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
                        Reload
                    </Button>

                    <Button
                        as='a'
                        href='/'
                        view='secondary'
                    >
                        Go to homepage
                    </Button>
                </div>
            </div>
        </div>
    );
}