import { Link, UnstyleLink } from '@/uikit';
import { ellipseAddress } from '@/utils/addressHelper';
import { formatDate } from '@/utils/formatDate';
import styles from './BidsList.module.scss';

type bidInfo = {
    contractAddress: string
    currency: string
    amount: string
    date: Date
}

type BidsListProps = {
    bids: bidInfo[]
}

//todo неясно куда ссылки должны вести

export function BidsList({ bids }: BidsListProps) {
    return (
        <div
            className={styles.bids}
        >
            {
                bids.map((bid, idx) => {
                    return (
                        <div
                            key={idx}
                            className={styles.bidsItem}
                        >
                            <div className={styles.bidsLogo} />


                            <div className={styles.bidsInfo}>
                                <div className={styles.bidsTitle}>
                                    <span className={styles.white}><UnstyleLink className={styles.link}>{ellipseAddress(bid.contractAddress)}</UnstyleLink></span> bid <span className={styles.white}>{bid.amount} {bid.currency}</span>
                                </div>

                                <div className={styles.bidsMeta}>
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