import { api } from '@/app/api';
import { AuctionBet } from '@/states/types';

export async function fetchNFTBets(betID: string) {
    const { data } = await api.get<AuctionBet[]>(`collection/get/${betID}`);
    return data;
}
