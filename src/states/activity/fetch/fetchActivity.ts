import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';
import { ActivityFilter, ActivityTransaction, ActivityType } from '../types';

export async function fetchActivity({ filter }: { filter: ActivityFilter }): Promise<ActivityTransaction[]> {
    if (MOCK_API_CALLS) {
        await new Promise((res) => setTimeout(res, 300));

        return [
            {
                ID: '1',
                type: ActivityType.MINT,
                owner: '0xE45133bD72217782d834C43Eb54adA97dE1B7a93',
                date: '2023-05-29',
                transactionHash: '0x3987654321fedcba4',
            },
            {
                ID: '3',
                type: ActivityType.TRANSFER,
                owner: '0xB592a1A50490829e9EEcB64ED39A255b1F4d7935',
                transferedTo: '0xB592a1A50490829e9EEcB64ED39A255b1F4d7935',
                date: '2023-05-29',
                transactionHash: '0x0587654321fedcba4',
            },
            {
                ID: '2',
                type: ActivityType.LISTED,
                owner: '0xB592a1A50490829e9EEcB64ED39A255b1F4d7935',
                price: {
                    amount: '100',
                    currency: 'USDT',
                },
                date: '2023-05-29',
                transactionHash: '0x0987654321fedcba4',
            },
            {
                ID: '4',
                type: ActivityType.UNLISTED,
                owner: '0xB592a1A50490829e9EEcB64ED39A255b1F4d7935',
                date: '2023-05-29',
                transactionHash: '0x0987654321fedcba4',
            },
            {
                ID: '5',
                type: ActivityType.BUY,
                price: {
                    amount: '100',
                    currency: 'USDT',
                },
                owner: '0xB592a1A50490829e9EEcB64ED39A255b1F4d7935',
                date: '2023-05-29',
                transactionHash: '0x0987654321fedcba4',
            },
            {
                ID: '6',
                type: ActivityType.SALE,
                price: {
                    amount: '100',
                    currency: 'USDT',
                },
                owner: '0xB592a1A50490829e9EEcB64ED39A255b1F4d7935',
                date: '2023-05-29',
                transactionHash: '0x0987654321fedcba4',
            },
        ];
    }

    const { data } = await api.post<ActivityTransaction[]>('/activity/', { filter });

    return data;
}
