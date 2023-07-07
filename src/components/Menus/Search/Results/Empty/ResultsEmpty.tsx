import styles from './ResultsEmpty.module.scss';

export function ResultsEmpty() {
    return (
        <div className={styles.empty}>
            Nothing found
        </div>
    );
}