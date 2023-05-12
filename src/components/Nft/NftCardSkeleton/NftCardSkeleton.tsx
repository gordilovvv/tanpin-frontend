import styles from './NftCardSkeleton.module.scss';
import { Skeleton } from '@/uikit';

export function NftCardSkeleton() {
    return (
        <div className={styles.card}>
            <div className={styles.image}>
                <Skeleton className={styles.imageSkeleton} />
            </div>

            <div className={styles.info}>
                <div className={styles.header}>
                    <Skeleton className={styles.headerFirst} />
                    <Skeleton className={styles.headerSecond} />
                </div>

                <div className={styles.body}>
                    <div className={styles.item}>
                        <Skeleton className={styles.itemFirst} />
                        <Skeleton className={styles.itemSecond} />
                    </div>

                    <div className={styles.item}>
                        <Skeleton className={styles.itemFirst} />
                        <Skeleton className={styles.itemSecond} />
                    </div>
                </div>
            </div>
        </div>
    );
}