import styles from './Owner.module.scss';
import { ellipseAddress } from '@/utils/addressHelper';

type OwnerProps = {
    contractAddress: string
}

export function Owner({ contractAddress }: OwnerProps) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.circle} />

            <span className={styles.text}>
                {ellipseAddress(contractAddress)}
            </span>
        </div>
    );
}