import boxImage from '@/app/assets/images/box.png';
import styles from './EmptyResult.module.scss';

type EmptyResultProps = {
    title: string
    text: string
}

export function EmptyResult({ title, text }: EmptyResultProps) {
    return (
        <div className={styles.wrapper}>
            <img
                src={boxImage}
                alt=''
                className={styles.image}
            />

            <div className={styles.title}>{title}</div>
            <div className={styles.text}>{text}</div>
        </div>
    );
}