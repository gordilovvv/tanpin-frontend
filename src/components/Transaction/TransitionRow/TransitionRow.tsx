import styles from './TransitionRow.module.scss';
import { getAddressExplorerURL } from '@/utils/explorer';
import { Link, UnstyleLink } from '@/uikit';
import { ellipseAddress } from '@/utils/addressHelper';
import { formatDate } from '@/utils/formatDate';
import { UserAvatar } from '@/components/User/UserAvatar/UserAvatar';
import { HistoryTransaction } from '@/states/types';
import classNames from 'classnames';

type TransitionRowProps = {
    transaction: HistoryTransaction
}

export function TransitionRow({ transaction }: TransitionRowProps) {
    return (
        <div
            className={styles.item}
        >
            <UserAvatar size="m" />

            <div className={styles.info}>
                <div className={styles.title}>
                    <UnstyleLink
                        rel='noreferrer noopener'
                        target='_blank'
                        href={getAddressExplorerURL(transaction.owner)}
                        className={classNames(styles.link, styles.white)}
                    >{ellipseAddress(transaction.owner)}</UnstyleLink> bid <span className={styles.white}>{transaction.price?.amount} {transaction.price?.currency}</span>
                </div>

                <div className={styles.meta}>
                    <UnstyleLink className={styles.linkHover}>{formatDate(new Date())} <Link /></UnstyleLink>
                </div>
            </div>
        </div>
    );
}