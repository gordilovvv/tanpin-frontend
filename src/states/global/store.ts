import { create } from 'zustand';
import { PendingTransaction } from './types';

type State = {
    pendingTransaction: PendingTransaction | undefined
    wrongNetworkModalOpened: boolean
}

type Actions = {
    setPendingTransaction: (transaction: PendingTransaction) => void
    resetPendingTransaction: () => void
    openWrongNetworkModal: () => void
    closeWrongNetworkModal: () => void
}

export const useGlobalStore = create<State & Actions>()(
    set => ({
        pendingTransaction: undefined,
        setPendingTransaction: (pendingTransaction) => set({ pendingTransaction }),
        resetPendingTransaction: () => set({ pendingTransaction: undefined }),

        wrongNetworkModalOpened: false,
        openWrongNetworkModal: () => set({ wrongNetworkModalOpened: true }),
        closeWrongNetworkModal: () => set({ wrongNetworkModalOpened: false })
    })
);