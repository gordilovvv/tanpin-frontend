import { Hash } from 'viem';
import { create } from 'zustand';

type State = {
    pendingTransaction: { hash: Hash, text: string } | undefined
    wrongNetworkModalOpened: boolean
}

type Actions = {
    setPendingTransaction: (hash: Hash, text: string) => void
    resetPendingTransaction: () => void
    openWrongNetworkModal: () => void
    closeWrongNetworkModal: () => void
}

export const useGlobalStore = create<State & Actions>()(
    set => ({
        pendingTransaction: undefined,
        setPendingTransaction: (hash, text) => set({
            pendingTransaction: {
                hash,
                text
            }
        }),
        resetPendingTransaction: () => set({ pendingTransaction: undefined }),

        wrongNetworkModalOpened: false,
        openWrongNetworkModal: () => set({ wrongNetworkModalOpened: true }),
        closeWrongNetworkModal: () => set({ wrongNetworkModalOpened: false })
    })
);