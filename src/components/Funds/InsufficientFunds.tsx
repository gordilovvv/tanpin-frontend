import { Button, Warning } from '@/uikit';
import { useTranslation } from '@/localization';
import styles from './InsufficientFunds.module.scss';

type InsufficientFundsProps = {
    text: string
}

export function InsufficientFunds({ text }: InsufficientFundsProps) {
    const { t } = useTranslation();

    return (
        <div className={styles.wrap}>
            <div className={styles.info}>
                <div className={styles.infoIcon}>
                    <Warning />
                </div>

                <div className={styles.infoText}>
                    {text}
                </div>
            </div>

            <Button
                to='/deposit'
                view='primary'
            >
                {t('Add funds with card')}
            </Button>
        </div>
    );
}