import { useMemo } from 'react';
import { isAddress } from 'viem';
import { useTranslation } from '@/localization';
import { tryToParseAmount } from '@/utils/tryToParseAmount';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import BigNumber from 'bignumber.js';

export function useERC20TokenTransferError(
    balance: string | undefined,
    amount: string,
    address: string
) {
    const { t } = useTranslation();

    const parsedAmount = useMemo(() => {
        return tryToParseAmount(amount);
    }, [amount]);

    const parsedAddress = useMemo(() => {
        return address && isAddress(address) ? address : undefined;
    }, [address]);

    let amountError: string | undefined;
    let addressError: string | undefined;

    if (!parsedAmount || parsedAmount.isLessThanOrEqualTo(0)) {
        amountError = t('Enter amount');
    }

    if (balance && parsedAmount && parsedAmount.isGreaterThan(balance)) {
        amountError = t('Maximum is %amount%', { amount: formatTokenAmount(balance) });
    }

    if (!parsedAddress) {
        addressError = t('Enter address');
    }

    const isZeroBalance = balance
        ? new BigNumber(balance).isLessThanOrEqualTo(0.01)
        : undefined;

    return {
        parsedAmount: parsedAmount?.toString(),
        parsedAddress,
        amountError,
        addressError,
        isZeroBalance
    };
}