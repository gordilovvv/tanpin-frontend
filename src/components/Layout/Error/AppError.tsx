import styles from './AppError.module.scss';

export function AppError() {
    return <div className={styles.error}>
        Something failed!<br />
        Try to reload page
    </div>;
}