
import { useActivityStore } from '@/states/activity/store';
import { ActivityFilterOption } from './ActivityFilterOption/ActivityFilterOption';
import { ActivityType } from '@/states/activity/types';
import styles from './ActivityFilter.module.scss';
import { useMemo } from 'react';

export function ActivityFilter() {
    const [selectUserActivityOption, removeUserActivityOption] = useActivityStore(state => [
        state.selectUserActivityOption,
        state.removeUserActivityOption
    ]);

    const options = useMemo(() => {
        return [
            { value: ActivityType.SALE, label: 'Sales' },
            { value: [ActivityType.LISTED, ActivityType.UNLISTED], label: 'Listings' },
            { value: [ActivityType.BID, ActivityType.REFUND_BID], label: 'Bids' },
            { value: ActivityType.TRANSFER, label: 'Transfers' },
            { value: ActivityType.BUY, label: 'Purchases' },
            { value: ActivityType.MINT, label: 'Mints' },
        ];
    }, []);

    const handleChange = (value: ActivityType | ActivityType[], isActive: boolean) => {
        if (isActive) {
            selectUserActivityOption(value);
        } else {
            removeUserActivityOption(value);
        }
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Filters</div>

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