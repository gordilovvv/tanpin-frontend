import { Link, UnstyleLink } from '@/uikit';
import { Owner } from '@/components/User';
import { Address } from 'viem';
import { getAddressExplorerURL } from '@/utils/explorer';
import styles from './UserAbout.module.scss';

type UserAboutProps = {
    address: Address
    nftCount: number
    collectionsCount: number
}

export function UserAbout({ address, nftCount, collectionsCount }: UserAboutProps) {
    return (
        <div className={styles.wrap}>
            <UnstyleLink
                href={getAddressExplorerURL(address)}
                rel='noreferrer noopener'
                target='_blank'
                className={styles.owner}
            >
                <Owner
                    size='xl'
                    address={address}
                />

                <Link className={styles.ownerIcon} />
            </UnstyleLink>

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