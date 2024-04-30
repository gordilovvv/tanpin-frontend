import { create } from 'zustand';
import { ActivityTransaction, ActivityType } from './types';

type State = {
    activityList: ActivityTransaction[] | undefined,
    notificationsCount: number,
    userActivityFilter: ActivityType[]
}

type Actions = {
    setActivityList: (list: ActivityTransaction[] | undefined) => void
    selectUserActivityOption: (value: ActivityType | ActivityType[]) => void
    removeUserActivityOption: (value: ActivityType | ActivityType[]) => void
}

export enum ActivitySection {
    USER = 'user',
    TOKEN = 'token',
}

const defaultTypesFilter = [
    ActivityType.MINT,
    ActivityType.TRANSFER,
    ActivityType.BUY_DIRECT_SALE,
    ActivityType.SELL_DIRECT_SALE,
    ActivityType.CREATE_DIRECT_SALE,
    ActivityType.UPDATE_DIRECT_SALE,
    ActivityType.CLOSE_DIRECT_SALE
];

export const useActivityStore = create<State & Actions>()(
    (set, get) => ({
        activityList: [],
        notificationsCount: 0,
        userActivityFilter: defaultTypesFilter,

        setActivityList: (list) => {
            set({ activityList: list });
        },
        selectUserActivityOption: (value) => {
            let activeFilters = get().userActivityFilter;

            if (defaultTypesFilter.length === activeFilters.length) {
                activeFilters = [];
            }

            if (typeof value === 'string') {
                if (activeFilters.includes(value)) {
                    return;
                }

                return set({ userActivityFilter: [...activeFilters, value] });
            }

            const filters: ActivityType[] = [];

            for (const param of value) {
                if (!activeFilters.includes(param)) {
                    filters.push(param);
                }
            }

            if (filters.length) {
                return set({ userActivityFilter: [...activeFilters, ...filters] });
            }
        },
        removeUserActivityOption: (value) => {
            const activeFilters = get().userActivityFilter;

            if (typeof value === 'string') {
                if (!activeFilters.includes(value)) {
                    return;
                }

                const newActiveFilters = activeFilters.filter(filter => filter !== value);

                if (newActiveFilters.length) {
                    return set({ userActivityFilter: newActiveFilters });
                } else {
                    return set({ userActivityFilter: defaultTypesFilter });
                }
            }

            const filters: ActivityType[] = [];

            for (const param of value) {
                if (activeFilters.includes(param)) {
                    filters.push(param);
                }
            }

            if (filters.length) {
                const newActiveFilters = activeFilters.filter(filter => !filters.includes(filter));

                if (newActiveFilters.length) {
                    return set({ userActivityFilter: newActiveFilters });
                } else {
                    return set({ userActivityFilter: defaultTypesFilter });
                }
            }
        }
    })
);

