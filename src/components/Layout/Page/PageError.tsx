import { Button } from '@/uikit';
import styles from './PageError.module.scss';

type PageErrorProps = {
    error?: string
}

export function PageError({ error }: PageErrorProps) {
    const handlePageReload = () => {
        location.reload();
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.content}>
                <div className={styles.info}>
                    <div className={styles.title}>
                        Something went wrong
                    </div>

                    <div className={styles.description}>
                        Try to reload the page
                    </div>

                    {error && <div className={styles.error}>
                        {error}
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