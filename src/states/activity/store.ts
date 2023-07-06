import { create } from 'zustand';
import { ActivityTransaction, ActivityType } from './types';

type State = {
    notificationsCount: number,
    userActivity: ActivityTransaction[] | undefined
    userActivityFilter: ActivityType[]
    tokenActivity: ActivityTransaction[] | undefined
}

type Actions = {
    setActivityList: (type: ActivitySection, list: ActivityTransaction[] | undefined) => void
    appendToActivityList: (type: ActivitySection, transaction: ActivityTransaction) => void
    selectUserActivityOption: (value: ActivityType | ActivityType[]) => void
    removeUserActivityOption: (value: ActivityType | ActivityType[]) => void
}

export enum ActivitySection {
    USER = 'user',
    TOKEN = 'token',
}

const allUserActivityFilters = [
    ActivityType.MINT,
    ActivityType.TRANSFER,
    ActivityType.BUY,
    ActivityType.LISTED,
    ActivityType.UNLISTED,
    ActivityType.SALE,
    ActivityType.CREATE_AUCTION,
    ActivityType.CLOSE_AUCTION,
    ActivityType.BID
];

export const useActivityStore = create<State & Actions>()(
    (set, get) => ({
        notificationsCount: 0,
        tokenActivity: undefined,

        userActivity: undefined,
        userActivityFilter: allUserActivityFilters,

        setActivityList: (type, list) => {
            if (type === ActivitySection.USER) {
                return set({ userActivity: list });
            }

            if (type === ActivitySection.TOKEN) {
                return set({ tokenActivity: list });
            }
        },
        appendToActivityList: (type, transaction) => {
            if (type === ActivitySection.USER) {
                return set(state => {
                    if (!state.userActivity) {
                        return {
                            userActivity: [transaction]
                        };
                    }

                    return {
                        userActivity: [
                            ...state.userActivity,
                            transaction
                        ]
                    };
                });
            }

            if (type === ActivitySection.TOKEN) {
                return set(state => {
                    if (!state.userActivity) {
                        return {
                            userActivity: [transaction]
                        };
                    }

                    return {
                        userActivity: [
                            ...state.userActivity,
                            transaction
                        ]
                    };
                });
            }
        },
        selectUserActivityOption: (value) => {
            let activeFilters = get().userActivityFilter;

            if (allUserActivityFilters.length === activeFilters.length) {
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
                    return set({ userActivityFilter: allUserActivityFilters });
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
                    return set({ userActivityFilter: allUserActivityFilters });
                }
            }
        }
    })
);

