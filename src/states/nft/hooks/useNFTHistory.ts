import useSWR from 'swr';
import { useNFTStore } from '../store';
import { fetchNFTHistory } from '../fetch/fetchNFTHistory';
import { NFT_HISTORY_REFRESH_INTERVAL } from '@/config/constants/nft';
import { HistoryTransaction } from '@/states/types';

export function useNFTHistory(tokenID: string) {
    const setHistoryTxs = useNFTStore(state => state.setHistoryTxs);

    const { data: history, isLoading } = useSWR<HistoryTransaction[] | undefined>(
        ['token.get.history', tokenID],
        async () => {
            const history = await fetchNFTHistory(tokenID);

            setHistoryTxs(history);

            return history;
        },
        {
            dedupingInterval: NFT_HISTORY_REFRESH_INTERVAL,
            refreshInterval: NFT_HISTORY_REFRESH_INTERVAL
        }
    );

    return {
        history,
        isLoading
    };
}
