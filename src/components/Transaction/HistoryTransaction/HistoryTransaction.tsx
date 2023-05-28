import type { HistoryTransaction as HistoryTransactionType } from '@/states/types';
import { TransitionRow } from '../TransitionRow/TransitionRow';
import { UnstyleLink } from '@/uikit';
import { ellipseAddress } from '@/utils/addressHelper';
import { getAddressExplorerURL } from '@/utils/explorer';
import { TransactionType } from '@/states/types';
import { memo } from 'react';
import classNames from 'classnames';
import styles from './HistoryTransaction.module.scss';

type HistoryTransactionProps = {
    transaction: HistoryTransactionType
}

function createTransactionComponent(transaction: HistoryTransactionType, additionalContent: JSX.Element) {
    const { date, owner, transactionHash } = transaction;
    return (
        <TransitionRow
            date={date}
            userAddress={owner}
            transactionHash={transactionHash}
        >
            {additionalContent}
        </TransitionRow>
    );
}

export const HistoryTransaction = memo(({ transaction }: HistoryTransactionProps) => {
    if (transaction.type === TransactionType.mint) {
        return (
            createTransactionComponent(transaction,
                <>
                    <UnstyleLink
                        rel='noreferrer noopener'
                        target='_blank'
                        href={getAddressExplorerURL(transaction.owner)}
                        className={classNames(styles.link, styles.white)}
                    >{ellipseAddress(transaction.owner)}</UnstyleLink> minted
                </>
            )

        );
    }

    if (transaction.type === TransactionType.buy) {
        return (
            createTransactionComponent(transaction,
                <>
                    address bought for  < span className={styles.white} > {transaction!.price!.amount} {transaction!.price!.currency}</span >
                </>
            )
        );
    }

    if (transaction.type === TransactionType.listed) {
        return (
            createTransactionComponent(transaction,
                <>
                    <UnstyleLink
                        rel='noreferrer noopener'
                        target='_blank'
                        href={getAddressExplorerURL(transaction.owner)}
                        className={classNames(styles.link, styles.white)}
                    >{ellipseAddress(transaction.owner)}</UnstyleLink> listed < span className={styles.white} > {transaction.price?.amount} {transaction.price?.currency}</span >
                </>
            )
        );
    }

    if (transaction.type === TransactionType.unlisted) {
        return (
            createTransactionComponent(transaction,
                <>
                    <UnstyleLink
                        rel='noreferrer noopener'
                        target='_blank'
                        href={getAddressExplorerURL(transaction.owner)}
                        className={classNames(styles.link, styles.white)}
                    >{ellipseAddress(transaction.owner)}</UnstyleLink> unlisted < span className={styles.white} > {transaction.price?.amount} {transaction.price?.currency}</span >
                </ >
            )
        );
    }

    if (transaction.type === TransactionType.transfer) {
        return (
            createTransactionComponent(transaction,
                <>
                    <UnstyleLink
                        rel='noreferrer noopener'
                        target='_blank'
                        href={getAddressExplorerURL(transaction.owner)}
                        className={classNames(styles.link, styles.white)}
                    >{ellipseAddress(transaction.owner)}</UnstyleLink> transfered to <UnstyleLink
                        rel='noreferrer noopener'
                        target='_blank'
                        href={getAddressExplorerURL(transaction.transferedTo)}
                        className={classNames(styles.link, styles.white)}
                    >{ellipseAddress(transaction.transferedTo)}</UnstyleLink>
                </ >
            )
        );
    }
});

HistoryTransaction.displayName = 'HistoryTransaction';