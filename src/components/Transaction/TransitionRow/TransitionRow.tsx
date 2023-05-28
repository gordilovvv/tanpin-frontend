import { PropsWithChildren } from 'react';
import { Link, UnstyleLink } from '@/uikit';
import { UserAvatar } from '@/components/User';
import { formatDate } from '@/utils/date';
import { getTransactionExplorerURL } from '@/utils/explorer';
import styles from './TransitionRow.module.scss';

type TransitionRowProps = {
    date: string
    transactionHash: string
    userAddress: string
}

export function TransitionRow({ children, date, transactionHash, userAddress }: PropsWithChildren<TransitionRowProps>) {
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
