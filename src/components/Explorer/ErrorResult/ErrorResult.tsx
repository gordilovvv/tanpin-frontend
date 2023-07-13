import { Button } from '@/uikit';
import styles from './ErrorResult.module.scss';

type ErrorResultProps = {
    title: string
    text: string
    onRetry?: () => void
}

export function ErrorResult({ title, text, onRetry }: ErrorResultProps) {
    return (
        <div className={styles.wrap}>
            <div className={styles.content}>
                <div className={styles.top}>
                    <div className={styles.title}>
                        {title}
                    </div>

                    <div className={styles.text}>
                        {text}
                    </div>
                </div>

                {onRetry && <div className={styles.action}>
                    <Button
                        view='secondary'
                        onClick={onRetry}
                    >
                        Try again
                    </Button>
                </div>}
            </div>
        </div>
    );
}