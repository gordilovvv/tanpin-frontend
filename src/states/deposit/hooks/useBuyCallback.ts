import { useCallback, useState } from 'react';
import { useToast } from '@/uikit';
import { useAccount } from '@/states/user/hooks/useAccount';
import { createPayment } from '../fetch/createPayment';

export function useBuyCallback(
    amountIn?: string,
    inputError?: string
) {
    const { address } = useAccount();
    const { toastDanger } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const buyCallback = useCallback(async () => {
        try {
            if (!amountIn || !address || inputError) {
                throw new Error('BuyCallback called unnecessary!');
            }

            setIsLoading(true);

            const { redirectURL } = await createPayment(
                amountIn,
                address
            );

            setIsLoading(false);

            if (!redirectURL) {
                throw new Error('redirectURL is undefined!');
            }

            window.location.href = redirectURL;
        } catch (error) {
            toastDanger('Something went wrong!');
        }
    }, [amountIn, address, inputError, setIsLoading, toastDanger]);

    return {
        isLoadingBuy: isLoading,
        buyCallback
    };
}