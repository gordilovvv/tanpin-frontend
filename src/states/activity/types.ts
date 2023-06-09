import {  TransactionType } from '@/states/types';

export type ActivityFilter =  {
    userAddress?: string
    tokenID?: string
    types: TransactionType[]
}
