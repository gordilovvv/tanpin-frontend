import { ActivityCard, ActivityCardSkeleton } from '@/components/Activity';
import { EmptyResult } from '@/components/Explorer';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useActivity } from '@/states/activity/hooks/useActivity';
import { useActivityStore } from '@/states/activity/store';
import { useTranslation } from '@/localization';
import { times } from 'lodash';
import styles from './ActivityList.module.scss';

export function ActivityList() {
    const { t } = useTranslation();
    const { address } = useAccount();

    const [activity, filter] = useActivityStore(state => [
        state.activityList,
        state.userActivityFilter
    ]);

    const { isLoading } = useActivity('user.activity', {
        userAddress: address,
        types: filter
    });

    // TODO: Error
    if (isLoading || !activity) {
        return (
            <div className={styles.wrap}>
                {times(6).map(index => <ActivityCardSkeleton key={index} />)}
            </div>
        );
    }

    if (!activity.length) {
        return (<EmptyResult
            title={t('Nothing found')}
            text={t('We couldn\'t find anything with this criteria')}
        />);
    }

    return (
        <div className={styles.wrap}>
            {activity.map((activity) => <ActivityCard
                key={activity.ID}
                activity={activity}
            />)}
        </div>
    );
}