import { useCallback, useEffect } from 'react';
import useSWRImmutable from 'swr/immutable';
import { mutate } from 'swr';
import { useTranslation } from '@/localization';
import { useNFTStore } from '../store';
import { fetchNFT as fetchNFTRequest } from '../fetch/fetchNFT';
import { logError } from '@/utils/sentry';
import { NORMAL_INTERVAL } from '@/config/constants';
import { AxiosError } from 'axios';

export function useNFTFetch(contractAddress: `0x${string}`, tokenID: string) {
    const { t } = useTranslation();
    const nft = useNFTStore(state => state.nft);
    const setNFT = useNFTStore(state => state.setNFT);

    const { data, isLoading, error } = useSWRImmutable(
        [`fetch.token.${contractAddress}.${tokenID}`],
        () => fetchNFTRequest(contractAddress, tokenID),
        {
            refreshInterval: NORMAL_INTERVAL,
            revalidateOnFocus: true
        }
    );

    let formattedError: string | undefined;

    if (error) {
        if (error instanceof AxiosError) {
            formattedError = t('NFT with key %nftID% not found', { nftID: `${contractAddress}:${tokenID}` });
        } else {
            formattedError = t('Something went wrong while loading the NFT. Please try reloading the page');
        }
    }

    useEffect(() => {
        if (data) {
            setNFT(data);
        }

        return () => setNFT(undefined);
    }, [data]);

    useEffect(() => {
        if (error) {
            logError(error);
        }
    }, [error]);

    return {
        error: formattedError,
        isLoading: !nft && isLoading
    };
}

export function useNFTRefetch(contractAddress: `0x${string}`, tokenID: string) {
    const refetchNFT = useCallback(async () => {
        return mutate([`fetch.token.${contractAddress}.${tokenID}`]);
    }, []);

    return { refetchNFT };
}