import { v4 as uuid } from 'uuid';
import { create } from 'zustand';

export type CollectionsFilterState = {
    sort?: CollectionsSort,
    gameID?: string,
    popular?: boolean
}

export enum CollectionsSort {
    NEWEST = 'newest',
    OLDEST = 'oldest'
}

type Actions = {
    setSort: (sort: CollectionsFilterState['sort']) => void
    replaceFilterState: (newState: Partial<CollectionsFilterState>) => void
}

export const initialCollectionsFilterState: CollectionsFilterState = {
    sort: CollectionsSort.NEWEST,
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
        replaceFilterState: set
    })
);