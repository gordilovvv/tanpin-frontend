import { Link, UnstyleLink } from '@/uikit';
import { ellipseAddress } from '@/utils/addressHelper';
import { formatDate } from '@/utils/formatDate';
import { UserAvatar } from '@/components/User/UserAvatar/UserAvatar';
import { HistoryTransaction } from '@/states/types';
import styles from './TransactionsList.module.scss';
import classNames from 'classnames';
import { getAddressExplorerURL } from '@/utils/explorer';


type TransactionsListProps = {
    transactions: HistoryTransaction[]
}

export function TransactionsList({ transactions }: TransactionsListProps) {
    return (
        <div
            className={styles.transactions}
        >
            {
                transactions.map((transaction, idx) => {
                    return (
                        <div
                            key={idx}
                            className={styles.transactionsItem}
                        >
                            <UserAvatar size="m" />

                            <div className={styles.transactionsInfo}>
                                <div className={styles.transactionsTitle}>
                                    <UnstyleLink
                                        rel='noreferrer noopener'
                                        target='_blank'
                                        href={getAddressExplorerURL(transaction.owner)}
                                        className={classNames(styles.link, styles.white)}
                                    >{ellipseAddress(transaction.owner)}</UnstyleLink> bid <span className={styles.white}>{transaction.price?.amount} {transaction.price?.currency}</span>
                                </div>

                                <div className={styles.transactionsMeta}>
                                    <UnstyleLink className={styles.linkHover}>{formatDate(transaction.date)} <Link /></UnstyleLink>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}