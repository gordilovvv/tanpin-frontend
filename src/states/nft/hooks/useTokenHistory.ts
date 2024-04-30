import { useEffect } from 'react';
import { useNFTStore } from '../store';
import { useActivity } from '@/states/activity/hooks/useActivity';
import { ActivityType } from '@/states/activity/types';

const filterTypes: ActivityType[] = [
    ActivityType.MINT,
    ActivityType.TRANSFER,
    ActivityType.CREATE_DIRECT_SALE,
    ActivityType.UPDATE_DIRECT_SALE,
    ActivityType.BUY_DIRECT_SALE,
    ActivityType.CLOSE_DIRECT_SALE
];

export function useTokenHistory(contractAddress: `0x${string}`, tokenID: string) {
    const setIsLoading = useNFTStore(state => state.setIsLoadingActivity);

    const { isLoading } = useActivity('nft', {
        address: contractAddress,
        tokenID: tokenID,
        types: filterTypes
    });

    useEffect(() => {
        setIsLoading(isLoading);
    }, [isLoading]);
}