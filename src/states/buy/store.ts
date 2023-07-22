import { create } from 'zustand';

type State = {
    typedAmount: string,
    totalPrice: string | undefined
}

type Actions = {
    typeAmount: (amount: State['typedAmount']) => void,
    setTotalPrice: (amount: State['totalPrice']) => void,
    replaceBuyState: (state: State) => void
}

export const initialBuyStoreState: State = {
    typedAmount: '',
    totalPrice: undefined
};

export const useBuyStore = create<State & Actions>()(
    (set) => ({
        typedAmount: '',
        totalPrice: undefined,

        typeAmount: (amount) => {
            set({ typedAmount: amount });
        },
        setTotalPrice: (price) => {
            set({ totalPrice: price });
        },
        replaceBuyState: (state) => {
            set({ ...state });
        }
    })
);