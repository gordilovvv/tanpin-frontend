import { Link, UnstyleLink } from '@/uikit';
import { ellipseAddress } from '@/utils/addressHelper';
import { formatDate } from '@/utils/formatDate';
import styles from './TransactionsList.module.scss';

type transactionsInfo = {
    contractAddress: string
    currency: string
    amount: string
    date: Date
}


type TransactionsListProps = {
    transactions: transactionsInfo[]
    // тут пропсом еще должен быть тип транзакции TODO, и отрисовка по условию типа
}

//todo неясно куда ссылки должны вести

export function TransactionsList({ transactions }: TransactionsListProps) {
    return (
        <div
            className={styles.transactions}
        >
            {
                transactions.map((bid, idx) => {
                    return (
                        <div
                            key={idx}
                            className={styles.transactionsItem}
                        >
                            <div className={styles.transactionsLogo} />


                            <div className={styles.transactionsInfo}>
                                <div className={styles.transactionsTitle}>
                                    <span className={styles.white}><UnstyleLink className={styles.link}>{ellipseAddress(bid.contractAddress)}</UnstyleLink></span> bid <span className={styles.white}>{bid.amount} {bid.currency}</span>
                                </div>

                                <div className={styles.transactionsMeta}>
                                    {formatDate(bid.date)}<UnstyleLink className={styles.linkHover}> <Link /></UnstyleLink>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}