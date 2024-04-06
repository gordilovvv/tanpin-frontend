import { Button, Warning } from '@/uikit';
import { Currency } from '../Currency';
import { useTranslation } from '@/localization';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import styles from './InsufficientFunds.module.scss';

type InsufficientFundsProps = {
    amount?: string,
    currency: string
}

export function InsufficientFunds({ amount, currency }: InsufficientFundsProps) {
    const { t } = useTranslation();

    return (
        <div className={styles.wrap}>
            <div className={styles.info}>
                <div className={styles.infoIcon}>
                    <Warning />
                </div>

                <div className={styles.infoText}>
                    {t('You are short of')} {amount ? formatTokenAmount(amount) : ''} <Currency>{currency}</Currency>
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