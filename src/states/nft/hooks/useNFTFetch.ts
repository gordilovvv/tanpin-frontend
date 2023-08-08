import { useCallback, useEffect } from 'react';
import useSWRImmutable from 'swr/immutable';
import { useNFTStore } from '../store';
import { fetchNFT as fetchNFTRequest } from '../fetch/fetchNFT';
import { logError } from '@/utils/sentry';
import { AxiosError } from 'axios';
import { NORMAL_INTERVAL } from '@/config/constants';

export function useNFTFetch(nftID: string) {
    const nft = useNFTStore(state => state.nft);
    const setNFT = useNFTStore(state => state.setNFT);

    const { isLoading, error, mutate } = useSWRImmutable(
        [`fetch.token-${nftID}`],
        async () => {
            const nft = await fetchNFTRequest(nftID);

            return setNFT(nft);
        },
        {
            refreshInterval: NORMAL_INTERVAL,
            revalidateOnFocus: true
        }
    );

    let formattedError: string | undefined;

    if (error) {
        if (error instanceof AxiosError) {
            formattedError = `NFT with key "${nftID}" not found`;
        } else {
            formattedError = 'Something went wrong while loading the NFT. Please try reloading the page';
        }
    }

    useEffect(() => {
        if (error) {
            logError(error);
        }
    }, [error]);

    const loading = !nft && isLoading;
    const refetch = useCallback(async () => {
        return mutate();
    }, [mutate]);

    return {
        error: formattedError,
        isLoading: loading,
        refetchNFT: refetch
    };
}