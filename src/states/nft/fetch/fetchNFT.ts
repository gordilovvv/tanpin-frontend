import { api } from '@/app/api';
import { NFTQueryBody } from '../types';
import { NFT } from '@/states/types';

export async function fetchNFT(body: NFTQueryBody) {
    const { data } = await api.post<NFT>(
        '/token/get.list',
        body
    );
    return data;
}
