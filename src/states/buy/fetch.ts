import axios from 'axios';
import { api } from '@/app/api';
import { urlSearchParams } from '@/utils/searchParams';
import { logError } from '@/utils/sentry';
import { getAddress } from 'viem';

export async function fetchBlackRussiaNFTs() {
    try {
        const response = await api.get<number[]>('/black-russia/nfts');

        return response.data;
    } catch (error) {
        logError(error);
        throw error;
    }
}

export type BlackRussiaCharacter = {
    id: number
    name: string
    server: {
        id: number
        name: string
    }
}

export async function fetchBlackRussiaCharacters(address: `0x${string}`): Promise<BlackRussiaCharacter[]> {
    try {
        const searchParams = urlSearchParams({ address: getAddress(address) });
        const response = await axios.get<BlackRussiaCharacter[]>(`black-russia.online/nft?${searchParams}`);

        if (typeof response.data !== 'object') {
            throw new Error(`Bad characters for user ${address}`);
        }

        return response.data;
    } catch (error) {
        logError(error);
        throw error;
    }
}

export async function saveBlackRussiaCharacter(characterID: number, serverID: number, params: {
    userAddress: `0x${string}`
    contractAddress: `0x${string}`
    tokenID: string
    saleID: string
}) {
    const { contractAddress, tokenID, saleID, userAddress } = params;

    await api.post('/black-russia/character', {
        characterId: characterID,
        serverId: serverID,
        nftAddress: contractAddress,
        nftId: parseInt(tokenID),
        saleId: parseInt(saleID),
        userAddress: userAddress
    });
}