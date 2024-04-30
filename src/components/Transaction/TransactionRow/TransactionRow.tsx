import { PropsWithChildren } from 'react';
import { Link, Skeleton, UnstyleLink } from '@/uikit';
import { UserAvatar } from '@/components/User';
import { useTranslation } from '@/localization';
import { ActivityTransaction, ActivityType } from '@/states/activity/types';
import { getTransactionExplorerURL } from '@/utils/explorer';
import { formatDate } from '@/utils/date';
import classNames from 'classnames';
import styles from './TransactionRow.module.scss';


type TransactionRowProps = {
    transaction: ActivityTransaction
}

export function TransactionRow({ children, transaction }: PropsWithChildren<TransactionRowProps>) {
    const { locale } = useTranslation();

    return (
        <div className={styles.row}>
            {/* {transaction.type === ActivityType.MINT
                ? <CollectionLogo
                    image={transaction.data.gameLogoUrl}
                    size='s'
                    style={{ borderRadius: '50%' }}
                />
                : <UserAvatar
                    address={transaction.fromAddress}
                    size="l"
                />} */}
            <UserAvatar
                as={transaction.type === ActivityType.MINT ? undefined : 'link'}
                address={transaction.fromAddress}
                size="l"
            />

            <div className={styles.info}>
                <div className={styles.title}>
                    {children}
                </div>

                <div className={styles.meta}>
                    {transaction.type === ActivityType.MINT
                        ? <div className={styles.date}>{formatDate(transaction.createdAt, locale)}</div>
                        : <UnstyleLink
                            rel='noreferrer noopener'
                            target='_blank'
                            href={getTransactionExplorerURL(transaction.hash)}
                            className={classNames(styles.date, styles.dateLink)}
                        >
                            {formatDate(transaction.createdAt, locale)} <Link />
                        </UnstyleLink>}
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