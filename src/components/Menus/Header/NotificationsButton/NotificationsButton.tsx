import { Bell } from '@/uikit';
import { Link } from 'react-router-dom';
import { useActivityStore } from '@/states/activity/store';
import styles from './NotificationsButton.module.scss';



export function NotificationsButton() {
    const notificationsCount = useActivityStore(state => state.notificationsCount);
    return (
        <Link
            to={'./activity'}
            className={styles.wrapper}
        >
            <div className={styles.icon}>
                <Bell />
                {notificationsCount > 0 && <div className={styles.circle} />}
            </div>
        </Link>
    );
}