import ErrorBoundary from '@/components/ErrorBoundary';
import styles from './EmptyLayout.module.scss';
import { Outlet } from 'react-router-dom';

export function EmptyLayout() {
    return (
        <div className={styles.wrap}>
            <div className={styles.content}>
                <ErrorBoundary>
                    <Outlet />
                </ErrorBoundary>
            </div>
        </div>
    );
}