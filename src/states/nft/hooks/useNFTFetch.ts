import { useCallback, useEffect } from 'react';
import useSWRImmutable from 'swr/immutable';
import { mutate } from 'swr';
import { useTranslation } from '@/localization';
import { useNFTStore } from '../store';
import { fetchNFT as fetchNFTRequest } from '../fetch/fetchNFT';
import { logError } from '@/utils/sentry';
import { AxiosError } from 'axios';
import { NORMAL_INTERVAL } from '@/config/constants';

export function useNFTFetch(nftID: string) {
    const { t } = useTranslation();
    const nft = useNFTStore(state => state.nft);
    const setNFT = useNFTStore(state => state.setNFT);

    const { data, isLoading, error } = useSWRImmutable(
        [`fetch.token.${nftID}`],
        () => fetchNFTRequest(nftID),
        {
            refreshInterval: NORMAL_INTERVAL,
            revalidateOnFocus: true
        }
    );

    let formattedError: string | undefined;

    if (error) {
        if (error instanceof AxiosError) {
            formattedError = t('NFT with key %nftID% not found', { nftID });
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

export function useNFTRefetch(nftID: string) {
    const refetchNFT = useCallback(async () => {
        return mutate([`fetch.token.${nftID}`]);
    }, []);

    return { refetchNFT };
}