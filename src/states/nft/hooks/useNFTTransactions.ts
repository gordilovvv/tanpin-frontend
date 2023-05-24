import useSWR from 'swr';
import { TokenHistory } from '../../types'
import { nftTransactions } from '../fetch/nftTransactions';

export function useNFTTransaction(tokenID: string) {
    const { data: transactions, isLoading, error }
        = useSWR<TokenHistory>(
            `tokentTransactions-${tokenID}`,
            () => nftTransactions(tokenID)
        );

    return {
        transactions,
        isLoading,
        error
    };
}
