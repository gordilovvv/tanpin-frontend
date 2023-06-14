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
        open: setPendingTransaction,
        close: resetPendingTransaction
    };
}