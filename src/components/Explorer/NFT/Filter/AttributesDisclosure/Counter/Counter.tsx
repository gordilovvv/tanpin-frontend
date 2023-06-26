import styles from './Counter.module.scss';

type CounterProps = {
    attributesCount?: string | number
    selectedCount?: string | number
}

export function Counter({ attributesCount, selectedCount }: CounterProps) {
    if (selectedCount) {
        return <div className={styles.selected}>
            {selectedCount} selected
        </div>;
    }

    if (attributesCount) {
        return <div className={styles.total}>
            {attributesCount}
        </div>;
    }

    return null;
}