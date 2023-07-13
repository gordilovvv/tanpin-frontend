import styles from './EmptyResult.module.scss';

type EmptyResultProps = {
    title: string
    text: string
}

export function EmptyResult({ title, text }: EmptyResultProps) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{title}</div>
            <div className={styles.text}>{text}</div>
        </div>
    );
}