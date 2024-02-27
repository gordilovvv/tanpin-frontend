import { useCallback, useState } from 'react';
import { useToast } from '@/uikit';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useTranslation } from '@/localization';
import { createPayment } from '../fetch/createPayment';
import { getReferralCode } from './useReferralCode';
import { AxiosError } from 'axios';

export function useBuyCallback(
    amountIn?: string,
    inputError?: string
) {
    const { t } = useTranslation();
    const { address } = useAccount();
    const { toastDanger } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const buyCallback = useCallback(async () => {
        try {
            if (!amountIn || !address || inputError) {
                throw new Error('BuyCallback called unnecessary!');
            }

            setIsLoading(true);

            const referralCode = getReferralCode();
            const { redirectURL } = await createPayment(
                amountIn,
                address,
                referralCode
            );

            if (!redirectURL) {
                throw new Error('redirectURL is undefined!');
            }

            window.location.href = redirectURL;
        } catch (error) {
            let errorMessage = t('Something went wrong!');

            if (error instanceof AxiosError) {
                const response = error.response?.data;

                if (response && response.error) {
                    errorMessage = `${t('Error')}: ${response.error}`;
                }
            }

            setIsLoading(false);
            toastDanger(errorMessage);
        }
    }, [amountIn, address, inputError, setIsLoading, toastDanger, t]);

    return {
        isLoadingBuy: isLoading,
        buyCallback
    };
}