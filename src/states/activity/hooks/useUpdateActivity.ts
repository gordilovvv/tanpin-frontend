import { useCallback } from 'react';
import { useActivityStore } from '../store';
import { ActivityTransaction } from '../types';

export function useUpdateActivity() {
    const [activityList, setActivityList] = useActivityStore(state => [
        state.activityList,
        state.setActivityList
    ]);

    const updateActivity = useCallback(
        (activityID: string, newActivity: Partial<ActivityTransaction>) => {
            if (!activityList) {
                return;
            }

            const list: ActivityTransaction[] = [];

            for (const activity of activityList) {
                if (activity.ID === activityID) {
                    list.push({
                        ...activity,
                        ...newActivity
                    });
                } else {
                    list.push(activity);
                }
            }

            setActivityList(list);
        },
        [activityList, setActivityList]
    );

    return updateActivity;
}