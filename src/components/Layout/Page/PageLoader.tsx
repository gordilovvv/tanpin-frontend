import { Spin } from '@/uikit';
import styles from './PageLoader.module.scss';

export function PageLoader() {
    return (
        <div className={styles.wrap}>
            <Spin size='m' />
        </div>
    );
}