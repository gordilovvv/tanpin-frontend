import { create } from 'zustand';

type State = {
    searchQuery: string,
    searchError: string | undefined
}

type Actions = {
    setSearchQuery: (query: State['searchQuery']) => void,
    setSearchError: (error: State['searchError']) => void
}

export const useSearchStore = create<State & Actions>((set) => ({
    searchQuery: '',
    searchError: '',

    setSearchQuery: (query) => {
        set({ searchQuery: query });
    },
    setSearchError: (error) => {
        set({ searchError: error });
    }
}));