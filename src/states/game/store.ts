import { create } from 'zustand';
import { GamesSort } from './types';

type State = {
    typedSearchQuery: string,
    activeSort: `${GamesSort}`
}

type Actions = {
    typeSearch: (value: string) => void,
    changeSort: (sort: `${GamesSort}`) => void
}

export const useGamesStore = create<State & Actions>()((set) => ({
    typedSearchQuery: '',
    activeSort: 'TRENDING',
    typeSearch: (value) => {
        set({ typedSearchQuery: value });
    },
    changeSort: (activeSort) => {
        set({ activeSort });
    }
}));
