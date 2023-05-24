import styles from './Owner.module.scss';
import { ellipseAddress } from '@/utils/addressHelper';

type OwnerProps = {
    address: string
}

export function Owner({ address }: OwnerProps) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.circle} />

            <span className={styles.text}>
                {ellipseAddress(address)}
            </span>
        </div>
    );
}