import { api } from '@/app/api';
import { NFT } from '@/states/types';
import { NFTListFilter } from '../types';

export async function fetchNFT(body: NFTListFilter) {
    const { data } = await api.post<NFT[]>(
        '/token/get.list',
        body
    );
    return data;
}
