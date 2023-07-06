import { Owner } from '@/components/User';
import { Address } from 'viem';
import styles from './UserAbout.module.scss';

type UserAboutProps = {
    address: Address
}

export function UserAbout({ address }: UserAboutProps) {
    return (
        <div className={styles.wrap}>
            <Owner
                size='xl'
                address={address}
                showLink
            />

            {/* <div className={styles.counts}>
                <div className={styles.item}>
                    <div className={styles.itemLabel}>NFTs</div>
                    <div className={styles.itemValue}>{nftCount}</div>
                </div>

                <div className={styles.item}>
                    <div className={styles.itemLabel}>Collections</div>
                    <div className={styles.itemValue}>{collectionsCount}</div>
                </div>
            </div> */}
        </div>
    );
}