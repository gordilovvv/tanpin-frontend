import { Owner } from '@/components/User';

import styles from './UserHead.module.scss';
import { Link, UnstyleLink } from '@/uikit';
import { getAddressExplorerURL } from '@/utils/explorer';

type UserHeadProps = {
    address: string
    nftCount: number
    collectionsCount: number
}

export function UserHead({ address, nftCount, collectionsCount }: UserHeadProps) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.info}>
                    <UnstyleLink
                        href={getAddressExplorerURL(address)}
                        rel='noreferrer noopener'
                        target='_blank'
                        className={styles.link}
                    >
                        <Owner
                            size="xl"
                            address="0x331F298e2Dfb55777f8692959cE0a5379Fe0C81F"
                        />
                    </UnstyleLink>

                    <Link className={styles.action} />
                </div>

                <div className={styles.counter}>
                    <div className={styles.item}>
                        <div className={styles.itemLabel}>NFTs</div>
                        <div className={styles.itemValue}>{nftCount}</div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.itemLabel}>Collections</div>
                        <div className={styles.itemValue}>{collectionsCount}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}