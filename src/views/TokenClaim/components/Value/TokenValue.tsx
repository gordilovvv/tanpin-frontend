import styles from './TokenValue.module.scss';

type TokenValueProps = {
    label: string,
    value: string | number
}

export function TokenValue({ label, value }: TokenValueProps) {
    return (
        <div className={styles.item}>
            <div className={styles.label}>{label}</div>
            <div className={styles.value}>{value}</div>
        </div>
    );
}