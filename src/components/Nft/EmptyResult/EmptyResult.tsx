import styles from './EmptyResult.module.scss';


export function EmptyResult({ title, text }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{title}</div>
            <div className={styles.text}>{text}</div>
        </div>
    );
}