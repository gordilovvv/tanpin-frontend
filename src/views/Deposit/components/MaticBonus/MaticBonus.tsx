import { Gift } from '@/uikit';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import { useTranslation } from '@/localization';
import styles from './MaticBonus.module.scss';

type MaticBonusProps = {
    amount?: string
}

export function MaticBonus({ amount }: MaticBonusProps) {
    const { t } = useTranslation();

    return (
        <div className={styles.maticBonus}>
            <div className={styles.maticBonusIcon}>
                <Gift />
            </div>

            {amount
                ? <div className={styles.maticBonusText}>
                    {t('You will also receive')} <span>{formatTokenAmount(amount)} MATIC</span> {t('to pay for gas')}
                </div>
                : <div className={styles.maticBonusText}>
                    {t('You will also receive')} <span>{t('free')}</span> MATIC {t('for gas!')}
                </div>}
        </div>
    );
}