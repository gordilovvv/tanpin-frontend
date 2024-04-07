import { create } from 'zustand';

// TODO: ДОБАВИТЬ АУКЦИОН
type CreateDirectSaleState = {
    amount: string,
    price: string,
    currencyId: string
}

type CreateDirectSaleActions = {
    setAmount: (amount: CreateDirectSaleState['amount']) => void,
    setPrice: (price: CreateDirectSaleState['price']) => void,
    replaceSaleState: (state: Partial<CreateDirectSaleState>) => void
}

export const useCreateDirectSaleStore = create<CreateDirectSaleState & CreateDirectSaleActions>()(
    (set) => ({
        amount: '',
        price: '',
        currencyId: 'tanpin',

        setAmount: (amount) => {
            set({ amount });
        },
        setPrice: (price) => {
            set({ price });
        },
        replaceSaleState: (state) => {
            set(prevState => ({
                ...prevState,
                ...state
            }));
        }
    })
);

type State = {
    price: string
}

type Actions = {
    setPrice: (price: State['price']) => void
}

export const useUpdateDirectSaleStore = create<State & Actions>()(
    (set) => ({
        price: '',
        setPrice: (price) => {
            set({ price });
        }
    })
);