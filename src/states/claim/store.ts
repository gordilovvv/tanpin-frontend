import { create } from 'zustand';
import { TokenLock } from './types';

type State = {
    locks: TokenLock[] | undefined
}

type Actions = {
    setLocks: (locks: State['locks']) => void
}

export const useClaimStore = create<State & Actions>()(
    set => ({
        locks: undefined,
        total: undefined,

        setLocks: (locks) => {
            set({ locks });
        }
    })
);