import { useMemo } from 'react';
import { RewardItem, RewardItemSkeleton } from './RewardItem';
import { useTranslation } from '@/localization';
import { AffiliateReward } from '@/states/deposit/types';
import { times } from 'lodash';
import styles from './RewardList.module.scss';

type RewardListProps = {
    rewards?: AffiliateReward,
    loading?: boolean
}

export function RewardList({ rewards, loading }: RewardListProps) {
    const { t, locale } = useTranslation();

    const affiliateRewards = useMemo(() => {
        if (!rewards) {
            return;
        }

        // TODO: logic
        return [
            {
                threshold: 5000,
                amount: 3,
                label: t('Up to')
            },
            {
                threshold: 9999,
                amount: 5,
                label: t('Up to')
            },
            {
                threshold: 10000,
                amount: 10,
                label: t('From')
            },
        ];
    }, [rewards, t]);

    if (loading || !affiliateRewards) {
        return (
            <div className={styles.list}>
                {times(3).map(index => <RewardItemSkeleton key={index} />)}
            </div>
        );
    }

    return (
        <div className={styles.list}>
            {affiliateRewards.map((reward) => <RewardItem
                key={reward.amount}
                threshold={reward.threshold}
                amount={reward.amount}
                label={reward.label}
                locale={locale}
            />)}
        </div>
    );
}