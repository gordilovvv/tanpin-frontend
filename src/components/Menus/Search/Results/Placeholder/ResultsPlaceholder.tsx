import { Spin } from '@/uikit';
import styles from './ResultsPlaceholder.module.scss';

export function ResultsPlaceholder() {
    return (
        <div className={styles.placeholder}>
            <Spin size='s' />
        </div>
    );
}