import { Address } from 'viem';

export type TokenLock = {
    id: string,
    token: Address,
    amount: string,
    receiver: Address,
    lockTimestamp: number,
    unlockTimestamp: number,
    claimed: boolean
}