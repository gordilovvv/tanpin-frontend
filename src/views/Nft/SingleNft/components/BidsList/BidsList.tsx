import { Link, UnstyleLink } from '@/uikit';
import { ellipseAddress } from '@/utils/addressHelper';
import { formatDate } from '@/utils/formatDate';
import { UserAvatar } from '@/components/User/UserAvatar/UserAvatar';
import { HistoryTransaction } from '@/states/types';
import styles from './BidsList.module.scss';
import classNames from 'classnames';
import { getAddressExplorerURL, getTransactionExplorerURL } from '@/utils/explorer';


type BidsListProps = {
    bids: HistoryTransaction[]
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
                            <UserAvatar size="m" />

                            <div className={styles.bidsInfo}>
                                <div className={styles.bidsTitle}>
                                    <UnstyleLink
                                        rel='noreferrer noopener'
                                        target='_blank'
                                        href={getAddressExplorerURL(bid.owner)}
                                        className={classNames(styles.white, styles.link)}
                                    >{ellipseAddress(bid.owner)}</UnstyleLink> bid <span className={styles.white}>{bid.price?.amount} {bid.price?.currency}</span>
                                </div>

                                <div className={styles.bidsMeta}>
                                    <UnstyleLink
                                        rel='noreferrer noopener'
                                        target='_blank'
                                        href={getTransactionExplorerURL(bid.transactionHash)}
                                        className={styles.linkHover}
                                    > {formatDate(bid.date)} <Link /></UnstyleLink>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}