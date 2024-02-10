import { useCallback } from 'react';
import { useTranslation } from '@/localization';
import { useActivityStore } from '@/states/activity/store';
import { ActivityFilterOption } from './ActivityFilterOption/ActivityFilterOption';
import { ActivityType } from '@/states/activity/types';
import classNames from 'classnames';
import styles from './ActivityFilter.module.scss';

type ActivityFilterProps = {
    className?: string
}

export function ActivityFilter({ className }: ActivityFilterProps) {
    const { t } = useTranslation();
    const [selectUserActivityOption, removeUserActivityOption] = useActivityStore(state => [
        state.selectUserActivityOption,
        state.removeUserActivityOption
    ]);

    const options = [
        { value: ActivityType.SALE, label: t('Sales') },
        {
            value: [
                ActivityType.LISTED,
                ActivityType.UNLISTED
            ],
            label: t('Listings')
        },
        {
            value: [
                ActivityType.BID,
                ActivityType.CREATE_AUCTION,
                ActivityType.CLOSE_AUCTION,
                ActivityType.LOST_AUCTION,
                ActivityType.WON_AUCTION
            ],
            label: t('Auctions')
        },
        { value: ActivityType.TRANSFER, label: t('Transfers') },
        { value: ActivityType.BUY, label: t('Purchases') },
        { value: ActivityType.MINT, label: t('Mints') },
    ];

    const handleChange = useCallback((value: ActivityType | ActivityType[], isActive: boolean) => {
        if (isActive) {
            selectUserActivityOption(value);
        } else {
            removeUserActivityOption(value);
        }
    }, [selectUserActivityOption, removeUserActivityOption]);

    return (
        <div className={classNames(styles.wrapper, className)}>
            <div className={styles.title}>{t('Filters')}</div>

            <div className={styles.inner}>
                {options.map(({ label, value }) => <ActivityFilterOption
                    key={label}
                    title={label}
                    value={value}
                    initialActive={false}
                    onChange={handleChange}
                />)}
            </div>
        </div>
    );
}