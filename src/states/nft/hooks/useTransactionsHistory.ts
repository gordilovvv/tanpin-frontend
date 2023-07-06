import { useEffect } from 'react';
import { useNFTStore } from '../store';
import { useActivity } from '@/states/activity/hooks/useActivity';
import { ActivityType } from '@/states/activity/types';

export function useTransactionsHistory(nftID: string) {
    const setIsLoading = useNFTStore(state => state.setIsLoadingActivity);
    const { isLoading } = useActivity({
        tokenID: nftID,
        types: [ActivityType.MINT, ActivityType.TRANSFER, ActivityType.LISTED, ActivityType.UNLISTED] // TODO: ДОБАВИТЬ АУКЦИОН
    });

    useEffect(() => {
        setIsLoading(isLoading);
    }, [isLoading]);
}