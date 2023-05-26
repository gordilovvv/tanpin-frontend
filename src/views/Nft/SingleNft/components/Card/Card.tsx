import { Button, Link, } from '@/uikit';
import styles from './Card.module.scss';

type CardProps = {
    link: string,
    photoUrl: string,
}

export function Card({ link, photoUrl }: CardProps) {
    return (
        <div className={styles.card}>
            <img
                className={styles.img}
                src={photoUrl}
            />

            <Button
                view="secondary"
                to={link}
                className={styles.btn}
                iconSlot={<Link />}
            >
                View original
            </Button>
        </div>
    );
}