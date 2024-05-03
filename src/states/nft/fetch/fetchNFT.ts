import { api } from '@/app/api';
import { NFT } from '@/states/types';

export async function fetchNFT(contractAddress: `0x${string}`, tokenID: string): Promise<NFT> {
    const response = await api.get<NFT>(`/tokens/${contractAddress}:${tokenID}`);

    return response.data;
}
