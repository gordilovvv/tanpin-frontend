import { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useBuyStore } from './store';
import { useTokenBalance } from '@/hooks/useTokenBalance';
import { activeChainId } from '@/config/chain';
import { CONTRACTS } from '@/config/constants/contracts';
import { tryToParseAmount } from '@/utils/tryToParseAmount';

export function useBuyState() {
    const [typedAmount, totalPrice] = useBuyStore(state => [
        state.typedAmount,
        state.totalPrice
    ]);

    return {
        typedAmount,
        totalPrice
    };
}

export function useBuyActions() {
    const [typeAmount, setTotalPrice, replaceBuyState] = useBuyStore(state => [
        state.typeAmount,
        state.setTotalPrice,
        state.replaceBuyState
    ]);

    return {
        handleAmountType: typeAmount,
        handleTotalPrice: setTotalPrice,
        handleReplaceBuyState: replaceBuyState
    };
}

// TODO: Добавить проверку на газ
export function useBuyDirectSaleInfo(
    tokenPrice: string,
    typedAmount: string,
    availableAmount: number
) {
    const { amount: tokenBalance, isLoading } = useTokenBalance(
        CONTRACTS.usdt[activeChainId].address,
        CONTRACTS.usdt[activeChainId].decimals
    );

    const parsedAmount = useMemo(() => {
        return tryToParseAmount(typedAmount)?.toNumber();
    }, [typedAmount]);

    const parsedPrice = useMemo(() => {
        return new BigNumber(tokenPrice);
    }, [tokenPrice]);

    // Цена токена * кол-во для покупки
    const totalPrice = parsedAmount ? parsedPrice.times(parsedAmount) : undefined;
    const isOutOfStock = !!parsedAmount && parsedAmount > availableAmount;

    let amountError: string | undefined;
    let balanceError: boolean | undefined;

    if (!parsedAmount) {
        amountError = 'Enter amount';
    }

    if (parsedAmount && parsedAmount <= 0) {
        amountError = 'Enter amount';
    }

    if (parsedAmount && parsedAmount > availableAmount) {
        amountError = `Available for buy are ${availableAmount} copies`;
    }

    if (!isOutOfStock) {
        if (tokenBalance && totalPrice && totalPrice.isGreaterThan(tokenBalance)) {
            balanceError = true;
        }
    }

    return {
        isLoading,
        parsedAmount,
        totalPrice: totalPrice?.toString(),
        amountError,
        balanceError
    };
}