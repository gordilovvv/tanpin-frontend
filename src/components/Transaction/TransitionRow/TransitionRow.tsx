import styles from './TransitionRow.module.scss';
import { getTransactionExplorerURL } from '@/utils/explorer';
import { Link, UnstyleLink } from '@/uikit';
import { formatDate } from '@/utils/formatDate';
import { UserAvatar } from '@/components/User';
import { PropsWithChildren } from 'react';

type TransitionRowProps = {
    date: string
    transactionHash: string
    userAddress: string
}

export function TransitionRow({ children, date, transactionHash, userAddress }: PropsWithChildren<TransitionRowProps>) {
    return (
        <div
            className={styles.item}
        >
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
                        className={styles.linkHover}
                    > {formatDate(new Date(date))} <Link /></UnstyleLink>
                </div>
            </div>
        </div>
    );
}
