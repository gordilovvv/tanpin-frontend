import { Spin } from '@/uikit';
import { FriendRow } from './FriendRow';
import { useTranslation } from '@/localization';
import { ReferralFriend } from '@/states/deposit/types';
import styles from './FriendsTable.module.scss';

type FriendsTableProps = {
    friends?: ReferralFriend[],
    loading?: boolean
}

export function FriendsTable({ friends, loading }: FriendsTableProps) {
    const { t } = useTranslation();

    const renderBody = () => {
        if (!friends || loading) {
            return <div className={styles.placeholder}>
                <Spin
                    size='m'
                    style={{ borderWidth: '5px' }}
                />
            </div>;
        }

        if (!friends.length) {
            return <div className={styles.placeholder}>
                <div className={styles.nothing}>{t('Nothing found')}</div>
            </div>;
        }

        return friends.map(friend => <FriendRow
            key={friend.address}
            friend={friend}
        />);
    };

    return (
        <div className={styles.table}>
            <div className={styles.head}>
                {t('Users joined with your link:')}
            </div>

            <div className={styles.body}>
                {renderBody()}
            </div>
        </div>
    );
}