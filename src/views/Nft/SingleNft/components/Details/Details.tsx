import { Link as LinkIcon, UnstyleLink } from '@/uikit';
import { ellipseAddress } from '@/utils/addressHelper';
import { Owner } from '@/components/User';
import { NFT } from '@/states/types';
import { getAddressExplorerURL } from '@/utils/explorer';
import styles from './Details.module.scss';

type DetailsProps = {
    details: NFT,
    network: string
}

export function Details({ details, network }: DetailsProps) {
    const { owner, tokenID, contractAddress } = details; // откуда брать нетворк?

    return (
        <div className={styles.details}>
            {owner && (
                <div
                    className={styles.detailsItem}
                >
                    <div className={styles.detailsLabel}>Owner</div>

                    <UnstyleLink
                        href={getAddressExplorerURL(owner)}
                        rel='noreferrer noopener'
                        target='_blank'
                        className={styles.link}
                    >
                        <Owner address={owner} />
                    </UnstyleLink>
                </div>
            )
            }

            {
                contractAddress && (
                    <div className={styles.detailsItem}>
                        <div className={styles.detailsLabel}>Contract Address</div>

                        <div className={styles.detailsValue}>
                            <UnstyleLink
                                href={getAddressExplorerURL(contractAddress)}
                                rel='noreferrer noopener'
                                target='_blank'
                                className={styles.link}
                            >
                                {ellipseAddress(contractAddress)}
                            </UnstyleLink>
                        </div>
                    </div>
                )
            }

            {
                network && (
                    <div className={styles.detailsItem}>
                        <div className={styles.detailsLabel}>Network</div>
                        <div className={styles.detailsValue}>{network}</div>
                    </div>
                )
            }

            {
                tokenID && (
                    <div className={styles.detailsItem}>
                        <div className={styles.detailsLabel}>Token ID</div>

                        <div className={styles.detailsValue}>
                            <LinkIcon /> {tokenID}
                        </div>
                    </div>
                )
            }
        </div >
    );
}
