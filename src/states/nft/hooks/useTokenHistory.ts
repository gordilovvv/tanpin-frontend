import { useEffect } from 'react';
import { useNFTStore } from '../store';
import { useActivity } from '@/states/activity/hooks/useActivity';
import { ActivityType } from '@/states/activity/types';

export function useTokenHistory(nftID: string) {
    const setIsLoading = useNFTStore(state => state.setIsLoadingActivity);

    const { isLoading } = useActivity('token.activity', {
        tokenID: nftID,
        types: [ActivityType.MINT, ActivityType.TRANSFER, ActivityType.LISTED, ActivityType.UNLISTED, ActivityType.BUY, ActivityType.CREATE_AUCTION, ActivityType.WON_AUCTION]
    });

    useEffect(() => {
        setIsLoading(isLoading);
    }, [isLoading]);
}