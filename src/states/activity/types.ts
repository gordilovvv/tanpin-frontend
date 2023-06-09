import {  TransactionType } from '@/states/types';

export type ActivityFilter =  {
    filter: {
        userAddress?: string
        tokenID?: string
        types: TransactionType[]
    }
}
