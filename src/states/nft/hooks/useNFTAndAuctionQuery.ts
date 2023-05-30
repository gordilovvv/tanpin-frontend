import { useCallback, useEffect, useState } from 'react';
import { useNFTStore } from '../store';
import { fetchNFT as fetchNFTRequest } from '../fetch/fetchNFT';

/**
 * Hook for NFT Fetch and Refetch.
 * You can refetch nft after Auction End for example.
 */
export function useNFTAndAuctionQuery(tokenID: string) {
    const [error, setError] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [
        setNFT,
        setAuction,
    ] = useNFTStore(state => [state.setNFT, state.setAuction]);

    const fetchNFT = async () => {
        try {
            setIsLoading(true);

            const { nft, auction } = await fetchNFTRequest(tokenID);

            setNFT(nft);
            setAuction(auction);
            setIsLoading(false);
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const refetchNFT = useCallback(async () => {
        try {
            if (isLoading) {
                return;
            }

            const { nft, auction } = await fetchNFTRequest(tokenID);

            setNFT(nft);
            setAuction(auction);
        } catch (error) {
            // TODO: error toast
            console.error(error);
        }
    }, [isLoading, setNFT, setAuction]);

    useEffect(() => {
        fetchNFT();
    }, []);

    return {
        error,
        isLoading,
        refetchNFT
    };
}