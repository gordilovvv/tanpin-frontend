import { api } from '@/app/api';

export async function nftTransactions(tokenID: string) {
    const { data } = await api.get(`token/get.history/${tokenID}/history`);
    return data;
}
