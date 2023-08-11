import { v4 as uuid } from 'uuid';
import { create } from 'zustand';

export type CollectionsFilterState = {
    search?: string,
    sort?: CollectionsSort,
    gameID?: string,
    popular?: boolean
}

export enum CollectionsSort {
    TRENDING = 'TRENDING',
    RECENTLY_ADDED = 'RECENTLY_ADDED'
}

type Actions = {
    setSearch: (search: CollectionsFilterState['search']) => void
    setSort: (sort: CollectionsFilterState['sort']) => void
    replaceFilterState: (newState: Partial<CollectionsFilterState>) => void
}

export const initialCollectionsFilterState: CollectionsFilterState = {
    search: '',
    sort: CollectionsSort.TRENDING,
    gameID: undefined,
    popular: undefined
};

function generateFilterHash() {
    return `explorer-collections-${uuid()}`;
}

export const useCollectionsFilterStore = create<CollectionsFilterState & Actions>()(
    (set) => ({
        hash: generateFilterHash(),

        ...initialCollectionsFilterState,

        setSort: (sort) => {
            set({ sort });
        },
        setSearch: (search) => {
            set({ search });
        },
        replaceFilterState: set
    })
);