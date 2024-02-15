import { memo } from 'react';
import { UnstyleLink } from '@/uikit';
import { UserAvatar } from '@/components/User';
import { ReferralFriend } from '@/states/deposit/types';
import { ellipseAddress } from '@/utils/addressHelper';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import { getAddressExplorerURL } from '@/utils/explorer';
import BigNumber from 'bignumber.js';
import tanpinCoin from '@/app/assets/images/tanpin-coin.png';
import styles from './FriendRow.module.scss';

type FriendRowProps = {
    friend: ReferralFriend
}

export const FriendRow = memo(({ friend }: FriendRowProps) => {
    const amountSign = new BigNumber(friend.totalReward).isGreaterThan(0) ? '+' : '';

    return (
        <div className={styles.row}>
            <UnstyleLink
                className={styles.user}
                href={getAddressExplorerURL(friend.address)}
                rel="noreferrer noopener"
                target="_blank"
            >
                <UserAvatar
                    address={friend.address}
                    size='s'
                />

                <div className={styles.address}>
                    {ellipseAddress(friend.address)}
                </div>
            </UnstyleLink>

            <div className={styles.income}>
                <div className={styles.amount}>
                    {amountSign}{formatTokenAmount(friend.totalReward)}
                </div>

                <div className={styles.token}>
                    <img
                        src={tanpinCoin}
                        alt={'TANPIN'}
                    />
                </div>
            </div>
        </div>
    );
});

FriendRow.displayName = 'FriendRow';