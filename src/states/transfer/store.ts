import { Hash } from 'viem';
import { create } from 'zustand';

type State = {
    typedAddress: string,
    typedAmount: string,
    transactionSent: { hash: Hash, amount: string } | undefined,
    transactionError: string | undefined
}

type Action = {
    typeAddress: (value: string) => void,
    typeAmount: (value: string) => void,
    onTransactionSent: (transaction: State['transactionSent']) => void,
    onTransactionError: (error: State['transactionError']) => void,
    replaceState: (state: Partial<State>) => void
}

export const useTransferStore = create<State & Action>(set => ({
    typedAddress: '',
    typedAmount: '',

    transactionSent: undefined,
    transactionError: undefined,

    typeAddress: (value) => {
        set({ typedAddress: value });
    },
    typeAmount: (value) => {
        set({ typedAmount: value });
    },

    onTransactionSent: (transaction) => {
        set({ transactionSent: transaction });
    },
    onTransactionError: (error) => {
        set({ transactionError: error });
    },
    replaceState: (state) => {
        set({ ...state });
    }
}));