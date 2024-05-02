import { Outlet } from 'react-router-dom';
import LayoutContainer from '../LayoutContainer';
import ErrorBoundary from '@/components/ErrorBoundary';
import styles from './EmptyLayout.module.scss';

export function EmptyLayout() {
    return (
        <LayoutContainer>
            <div className={styles.wrap}>
                <div
                    className={styles.content}
                    style={{ overflow: 'hidden' }}
                >
                    <div className={styles.main}>
                        <ErrorBoundary>
                            <Outlet />
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
        </LayoutContainer>
    );
}