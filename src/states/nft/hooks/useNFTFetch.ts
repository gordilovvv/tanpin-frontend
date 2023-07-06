import { useCallback, useEffect, useState } from 'react';
import { useToast } from '@/uikit';
import { useNFTStore } from '../store';
import { fetchNFT as fetchNFTRequest } from '../fetch/fetchNFT';
import { logError } from '@/utils/sentry';

// TODO: ДОБАВИТЬ АУКЦИОН
/**
 * Hook for NFT Fetch and Refetch.
 * You can refetch nft after Auction End for example.
 */
export function useNFTFetch(nftID: string) {
    const { toastDanger } = useToast();
    const [error, setError] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const setNFT = useNFTStore(state => state.setNFT);

    const fetchNFT = async () => {
        try {
            setIsLoading(true);

            const nft = await fetchNFTRequest(nftID);

            setNFT(nft);
            setIsLoading(false);

            // setAuction(auction);
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const refetchNFT = useCallback(async () => {
        try {
            if (isLoading) {
                return;
            }

            const nft = await fetchNFTRequest(nftID);

            setNFT(nft);
            // setAuction(auction);
        } catch (error) {
            logError(error);
            toastDanger('NFT update was failed!');
        }
    }, [isLoading, setNFT, toastDanger]);

    useEffect(() => {
        fetchNFT();
    }, []);

    return {
        error,
        isLoading,
        refetchNFT
    };
}