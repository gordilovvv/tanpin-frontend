import { Hash, TransactionReceipt } from 'viem';

export type PendingTransaction = {
    hash: Hash,
    text: string,
    onReject?: () => void,
    onReceipt?: (receipt: TransactionReceipt) => void
}