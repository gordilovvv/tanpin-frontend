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
        { value: ActivityType.BUY_DIRECT_SALE, label: t('Purchases') },
        { value: ActivityType.SELL_DIRECT_SALE, label: t('Sales') },
        { value: ActivityType.TRANSFER, label: t('Transfers') },
        {
            value: [
                ActivityType.CREATE_DIRECT_SALE,
                ActivityType.UPDATE_DIRECT_SALE,
                ActivityType.CLOSE_DIRECT_SALE
            ],
            label: t('Listings')
        }
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