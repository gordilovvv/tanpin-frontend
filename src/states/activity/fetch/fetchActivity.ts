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
                nftID: '1',
                nftName: 'Otherdeed #11710',
                nftImage: 'https://lh3.googleusercontent.com/IJZuXD8UCdsw_GB-Tjs0JpLjo1U1FwbNwCaXJeq0tWX-GP4Wnq7ocjDgitWvHxmIOE5wdQ8X1k5s9z38_53tmq9ABxKhrNzdRSg=s400',
                owner: '0xE45133bD72217782d834C43Eb54adA97dE1B7a93',
                date: '2023-05-29',
                transactionHash: '0x3987654321fedcba4',
            },
            {
                ID: '3',
                type: ActivityType.TRANSFER,
                nftID: '1',
                nftName: 'Squares #46',
                nftImage: 'https://lh3.googleusercontent.com/KVSobDugnNEZaBf6DUqEDDBM8L9rnqrvSMkbH5MKAByGSD_lJw5_eP4MB4RV_ZIshyCprjqn4rerXMt2OrDCZkMbvPa4VdC9gug=s400',
                owner: '0xB592a1A50490829e9EEcB64ED39A255b1F4d7935',
                transferedTo: '0xB592a1A50490829e9EEcB64ED39A255b1F4d7935',
                date: '2023-05-29',
                transactionHash: '0x0587654321fedcba4',
            },
            {
                ID: '2',
                type: ActivityType.LISTED,
                nftID: '1',
                nftName: 'Otherdeed #11710',
                nftImage: 'https://lh3.googleusercontent.com/IJZuXD8UCdsw_GB-Tjs0JpLjo1U1FwbNwCaXJeq0tWX-GP4Wnq7ocjDgitWvHxmIOE5wdQ8X1k5s9z38_53tmq9ABxKhrNzdRSg=s400',
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
                nftID: '1',
                nftName: 'Otherdeed #11710',
                nftImage: 'https://lh3.googleusercontent.com/IJZuXD8UCdsw_GB-Tjs0JpLjo1U1FwbNwCaXJeq0tWX-GP4Wnq7ocjDgitWvHxmIOE5wdQ8X1k5s9z38_53tmq9ABxKhrNzdRSg=s400',
                type: ActivityType.UNLISTED,
                owner: '0xB592a1A50490829e9EEcB64ED39A255b1F4d7935',
                date: '2023-05-29',
                transactionHash: '0x0987654321fedcba4',
            },
            {
                ID: '5',
                type: ActivityType.BUY,
                nftID: '1',
                nftName: 'Squares #46',
                nftImage: 'https://lh3.googleusercontent.com/KVSobDugnNEZaBf6DUqEDDBM8L9rnqrvSMkbH5MKAByGSD_lJw5_eP4MB4RV_ZIshyCprjqn4rerXMt2OrDCZkMbvPa4VdC9gug=s400',
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
                nftID: '1',
                nftName: 'Squares #46',
                nftImage: 'https://lh3.googleusercontent.com/KVSobDugnNEZaBf6DUqEDDBM8L9rnqrvSMkbH5MKAByGSD_lJw5_eP4MB4RV_ZIshyCprjqn4rerXMt2OrDCZkMbvPa4VdC9gug=s400',
                price: {
                    amount: '100',
                    currency: 'USDT',
                },
                owner: '0xB592a1A50490829e9EEcB64ED39A255b1F4d7935',
                date: '2023-05-29',
                transactionHash: '0x0987654321fedcba4',
            },
            {
                ID: '7',
                type: ActivityType.WON_AUCTION,
                nftID: '1',
                nftName: 'Squares #46',
                nftImage: 'https://lh3.googleusercontent.com/KVSobDugnNEZaBf6DUqEDDBM8L9rnqrvSMkbH5MKAByGSD_lJw5_eP4MB4RV_ZIshyCprjqn4rerXMt2OrDCZkMbvPa4VdC9gug=s400',
                price: {
                    amount: '100',
                    currency: 'USDT',
                },
                owner: '0xB592a1A50490829e9EEcB64ED39A255b1F4d7935',
                date: '2023-05-29',
                auctionID: '10',
                doneAuctionAction: false,
                transactionHash: '0x0987654321fedcba4',
            },
            {
                ID: '8',
                type: ActivityType.LOST_AUCTION,
                nftID: '1',
                nftName: 'Squares #46',
                nftImage: 'https://lh3.googleusercontent.com/KVSobDugnNEZaBf6DUqEDDBM8L9rnqrvSMkbH5MKAByGSD_lJw5_eP4MB4RV_ZIshyCprjqn4rerXMt2OrDCZkMbvPa4VdC9gug=s400',
                price: {
                    amount: '100',
                    currency: 'USDT',
                },
                owner: '0xB592a1A50490829e9EEcB64ED39A255b1F4d7935',
                date: '2023-05-29',
                auctionID: '10',
                doneAuctionAction: false,
                transactionHash: '0x0987654321fedcba4',
            },
            {
                ID: '9',
                type: ActivityType.CLOSE_AUCTION,
                nftID: '1',
                nftName: 'Otherdeed #11710',
                nftImage: 'https://lh3.googleusercontent.com/IJZuXD8UCdsw_GB-Tjs0JpLjo1U1FwbNwCaXJeq0tWX-GP4Wnq7ocjDgitWvHxmIOE5wdQ8X1k5s9z38_53tmq9ABxKhrNzdRSg=s400',
                price: {
                    amount: '100',
                    currency: 'USDT',
                },
                owner: '0xB592a1A50490829e9EEcB64ED39A255b1F4d7935',
                date: '2023-05-29',
                auctionID: '10',
                doneAuctionAction: false,
                transactionHash: '0x0987654321fedcba4',
            },
        ];
    }

    const { data } = await api.post<ActivityTransaction[]>('/activity/', { filter });

    return data;
}
