import { create } from 'zustand';
import { Address } from 'viem';
import { activeChainId } from '@/config/chain';
import { CONTRACTS } from '@/config/constants/contracts';

// TODO: ДОБАВИТЬ АУКЦИОН
type State = {
    amount: string, // For unique tokens always should be 1!
    price: string,
    currency: {
        symbol: string,
        address: Address
    }
}

type Actions = {
    setAmount: (amount: State['amount']) => void,
    setPrice: (price: State['price']) => void,
    replaceSaleState: (state: Partial<State>) => void
}

export const useSaleStore = create<State & Actions>()(
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