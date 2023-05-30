import { PropsWithChildren } from 'react';
import { Link, Skeleton, UnstyleLink } from '@/uikit';
import { UserAvatar } from '@/components/User';
import { formatDate } from '@/utils/date';
import { getTransactionExplorerURL } from '@/utils/explorer';
import styles from './TransactionRow.module.scss';

type TransactionRowProps = {
    date: string
    transactionHash: string
    userAddress: string
}

export function TransactionRow({ children, date, transactionHash, userAddress }: PropsWithChildren<TransactionRowProps>) {
    return (
        <div className={styles.row}>
            <UserAvatar
                address={userAddress}
                size="l"
            />

            <div className={styles.info}>
                <div className={styles.title}>
                    {children}
                </div>

                <div className={styles.meta}>
                    <UnstyleLink
                        rel='noreferrer noopener'
                        target='_blank'
                        href={getTransactionExplorerURL(transactionHash)}
                        className={styles.date}
                    >
                        {formatDate(date)} <Link />
                    </UnstyleLink>
                </div>
            </div>
        </div>
    );
}

export function TransactionRowSkeleton() {
    return (
        <div className={styles.row}>
            <Skeleton className={styles.avatarLoader} />

            <div className={styles.info}>
                <Skeleton className={styles.titleLoader} />
                <Skeleton className={styles.metaLoader} />
            </div>
        </div>
    );
}