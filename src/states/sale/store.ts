import { create } from 'zustand';
import { Address } from 'viem';
import { activeChainId } from '@/config/chain';
import { CONTRACTS } from '@/config/constants/contracts';

// TODO: ДОБАВИТЬ АУКЦИОН
type CreateDirectSaleState = {
    amount: string, // For unique tokens always should be 1!
    price: string,
    currency: {
        symbol: string,
        address: Address
    }
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
        currency: {
            symbol: 'USDT',
            address: CONTRACTS.usdt[activeChainId].address
        },

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