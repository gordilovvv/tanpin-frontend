import { useGlobalStore } from './store';

export function usePendingTransactionModal() {
    const [pendingTransaction, setPendingTransaction, resetPendingTransaction] = useGlobalStore(state => [
        state.pendingTransaction,
        state.setPendingTransaction,
        state.resetPendingTransaction
    ]);
    const isOpen = !!pendingTransaction?.hash;

    return {
        isOpen,
        hash: pendingTransaction?.hash,
        text: pendingTransaction?.text,
        onReject: pendingTransaction?.onReject,
        onConfirm: pendingTransaction?.onConfirm,
        open: setPendingTransaction,
        close: resetPendingTransaction
    };
}

export function useWrongNetworkModal() {
    const [isOpen, open, close] = useGlobalStore(state => [
        state.wrongNetworkModalOpened,
        state.openWrongNetworkModal,
        state.closeWrongNetworkModal
    ]);

    return {
        isOpen,
        open,
        close
    };
}