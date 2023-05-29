import type { HistoryTransactionType } from '@/states/types';
import { TransitionRow } from '../TransitionRow/TransitionRow';
import { UnstyleLink } from '@/uikit';
import { ellipseAddress } from '@/utils/addressHelper';
import { getAddressExplorerURL } from '@/utils/explorer';
import { TransactionType } from '@/states/types';
import { memo, useCallback } from 'react';
import classNames from 'classnames';
import styles from './HistoryTransaction.module.scss';

type HistoryTransactionProps = {
    transaction: HistoryTransactionType
}



export const HistoryTransaction = memo(({ transaction }: HistoryTransactionProps) => {
    const renderContent = useCallback(() => {
        if (transaction.type === TransactionType.mint) {
            return (
                <>

                    <UnstyleLink
                        rel='noreferrer noopener'
                        target='_blank'
                        href={getAddressExplorerURL(transaction.owner)}
                        className={classNames(styles.link, styles.white)}
                    >{ellipseAddress(transaction.owner)}</UnstyleLink> minted
                </>
            );
        }
        if (transaction.type === TransactionType.buy) {
            return (
                <>
                    address bought for  < span className={styles.white} > {transaction!.price!.amount} {transaction!.price!.currency}</span >
                </>
            );
        }
        if (transaction.type === TransactionType.listed) {
            return (
                <>
                    <UnstyleLink
                        rel='noreferrer noopener'
                        target='_blank'
                        href={getAddressExplorerURL(transaction.owner)}
                        className={classNames(styles.link, styles.white)}
                    >{ellipseAddress(transaction.owner)}</UnstyleLink> listed < span className={styles.white} > {transaction.price?.amount} {transaction.price?.currency}</span >
                </>
            );
        }
        if (transaction.type === TransactionType.unlisted) {
            return (
                <>
                    <UnstyleLink
                        rel='noreferrer noopener'
                        target='_blank'
                        href={getAddressExplorerURL(transaction.owner)}
                        className={classNames(styles.link, styles.white)}
                    >{ellipseAddress(transaction.owner)}</UnstyleLink> unlisted < span className={styles.white} > {transaction.price?.amount} {transaction.price?.currency}</span >
                </>
            );
        }
        if (transaction.type === TransactionType.transfer) {
            return (
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
            );
        }

        return (
            <>
                Unknow transaction
            </>
        );


    }, [transaction]);


    return (
        <TransitionRow
            date={transaction.date}
            userAddress={transaction.owner}
            transactionHash={transaction.transactionHash}
        >
            {renderContent()}
        </TransitionRow>);

});

HistoryTransaction.displayName = 'HistoryTransaction';