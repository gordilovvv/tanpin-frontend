import { Bell } from '@/uikit';
import { Link } from 'react-router-dom';
import { useActivityStore } from '@/states/activity/store';
import { HTMLAttributes } from 'react';
import styles from './NotificationsButton.module.scss';


export function NotificationsButton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    const notificationsCount = useActivityStore(state => state.notificationsCount);
    
    return (
        <div
            className={className}
            {...props}
        >
            <Link
                to={'./activity'}
                className={styles.wrapper}
            >
                <div className={styles.inner}>
                    <Bell className={styles.icon} />
                    {notificationsCount > 0 && <div className={styles.circle} />}
                </div>
            </Link>
        </div>
    );
}