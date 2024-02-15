import { Skeleton } from '@/uikit';
import { fiatCurrencies } from '@/config/constants/fiatCurrencies';
import { formatFiatCurrency } from '@/utils/fiat';
import styles from './RewardItem.module.scss';

type RewardItemProps = {
    threshold: number,
    amount: number,
    locale: string,
    label: string
}

export function RewardItem({ threshold, amount, locale, label }: RewardItemProps) {
    return (
        <div className={styles.reward}>
            <div className={styles.label}>
                {label} <span>{formatFiatCurrency(threshold, locale, fiatCurrencies.rub.code, { int: true })}</span>
            </div>

            <div className={styles.value}>
                {amount}%
            </div>
        </div>
    );
}

export function RewardItemSkeleton() {
    return <Skeleton className={styles.rewardSkeleton} />;
}