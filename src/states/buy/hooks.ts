import { useCallback, useMemo, useState } from 'react';
import BigNumber from 'bignumber.js';
import useSWRImmutable from 'swr/immutable';
import { useToast } from '@/uikit';
import { useBuyStore } from './store';
import { useAccount } from '../user/hooks/useAccount';
import { useTranslation } from '@/localization';
import { useTokenBalance } from '@/hooks/useTokenBalance';
import { activeChainId } from '@/config/chain';
import { CONTRACTS } from '@/config/constants/contracts';
import { fetchBlackRussiaCharacters, fetchBlackRussiaNFTs, saveBlackRussiaCharacter } from './fetch';
import { tryToParseAmount } from '@/utils/tryToParseAmount';
import { editionsSuffix, pluralize } from '@/utils/pluralize';
import { delayExecution } from '@/utils/delayExecution';
import { logError } from '@/utils/sentry';

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

export function useBuyDirectSaleInfo(
    price: string,
    currency: string,
    typedAmount: string,
    availableAmount: number,
    selectedCharacterID: number | undefined,
    isBlackRussiaNFT: boolean
) {
    const { t, locale } = useTranslation();
    const saleCurrency = CONTRACTS[currency][activeChainId];

    if (!saleCurrency) {
        throw new Error(`Unknown currency: ${currency} on chain ${activeChainId}`);
    }

    const { amount: tokenBalance, isLoading } = useTokenBalance(saleCurrency.address, saleCurrency.decimals);

    const parsedAmount = useMemo(() => {
        return tryToParseAmount(typedAmount)?.toNumber();
    }, [typedAmount]);

    const parsedPrice = useMemo(() => {
        return new BigNumber(price);
    }, [price]);

    // Цена токена * кол-во для покупки
    const totalPrice = parsedAmount ? parsedPrice.times(parsedAmount) : undefined;
    const isOutOfStock = !!parsedAmount && parsedAmount > availableAmount;

    let amountError: string | undefined;
    let balanceError: boolean | undefined;
    let insufficientBalance: string | undefined;
    let characterError: string | undefined;

    if (!parsedAmount) {
        amountError = t('Enter amount');
    }

    if (parsedAmount && parsedAmount <= 0) {
        amountError = t('Enter amount');
    }

    if (parsedAmount && parsedAmount > availableAmount) {
        amountError = t('Available for buy are %amount%', {
            amount: `${availableAmount} ${pluralize(availableAmount, locale, editionsSuffix)}`
        });
    }

    if (!isOutOfStock) {
        if (tokenBalance && totalPrice && totalPrice.isGreaterThan(tokenBalance)) {
            balanceError = true;
            insufficientBalance = totalPrice.minus(tokenBalance).plus(0.1).toString();
        }
    }

    if (isBlackRussiaNFT) {
        if (!selectedCharacterID) {
            characterError = t('Select a character');
        }
    }

    return {
        isLoading,
        parsedAmount,
        insufficientBalance,
        totalPrice: totalPrice?.toString(),
        amountError,
        balanceError,
        characterError
    };
}

/** Получить персонажей игрока в Black Russia */
export function useBlackRussiaCharacters(tokenID: string, address: `0x${string}`) {
    const { data: nftIds, isLoading: isLoadingNFTs } = useSWRImmutable(
        ['black.russia.nfts'],
        () => fetchBlackRussiaNFTs(),
        { revalidateOnMount: true }
    );

    const isBlackRussiaNFT = !!nftIds?.includes(parseInt(tokenID));
    const { data: characters, isLoading: isLoadingAccounts } = useSWRImmutable(
        isBlackRussiaNFT
            ? [`black.russia.${address}`]
            : null,
        () => fetchBlackRussiaCharacters(address),
        {
            revalidateOnMount: true,
            revalidateOnFocus: true
        }
    );

    return {
        characters,
        isLoading: isLoadingNFTs || isLoadingAccounts,
        isBlackRussiaNFT
    };
}

/** 
 * Выбрать персонажа в Black Russia и сохранить на сервере.
 * После успешной транзакции сервер отправит уведомление с выбранным персонажем
 * */
export function useBlackRussiaCharacterSelect(
    contractAddress: `0x${string}`,
    tokenID: string,
    saleID: string,
) {
    const { t } = useTranslation();
    const { address } = useAccount();
    const { toastDanger } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCharacterID, setSelectedCharacterID] = useState<number | undefined>();

    const onSelectCharacter = useCallback(async (characterID: number, serverID: number) => {
        if (selectedCharacterID === characterID) {
            return;
        }

        try {
            setIsLoading(true);

            if (!address) {
                throw new Error('Address is undefined');
            }

            setSelectedCharacterID(characterID);
            await delayExecution(() => saveBlackRussiaCharacter(characterID, serverID, {
                userAddress: address,
                contractAddress,
                tokenID,
                saleID
            }), 150);
        } catch (error) {
            setSelectedCharacterID(undefined);
            toastDanger(t('An error occurred'));
            logError(error);
        } finally {
            setIsLoading(false);
        }
    }, [t, address, contractAddress, tokenID, saleID, selectedCharacterID, toastDanger, setSelectedCharacterID, setIsLoading]);

    return {
        isLoading,
        selectedCharacterID,
        onSelectCharacter
    };
}