import { Hash } from 'viem';

export type PendingTransaction = {
    hash: Hash,
    text: string,
    onReject?: () => Promise<void> | void,
    onConfirm?: () => Promise<void> | void,
}