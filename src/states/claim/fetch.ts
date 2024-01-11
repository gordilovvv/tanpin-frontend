import { api } from '@/app/api';
import { Address } from 'viem';
import { TokenLock } from './types';
import { CLAIM_URL } from '@/config';

type LocksResponse = {
    locks: TokenLock[],
    total: number
}

export async function fetchLocks(address: Address) {
    const { data } = await api.get<LocksResponse>(`${CLAIM_URL}/locks?address=${address.toLowerCase().trim()}`);

    return data.locks;
}