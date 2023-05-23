import { Link as LinkIcon, UnstyleLink } from '@/uikit';
import { ellipseAddress } from '@/utils/addressHelper';
import { Owner } from '@/components/User';
import styles from './Details.module.scss';

type detail = {
    owner: string
    tokenID: string
    contractAddress: string
    network: string
    tokenId: string
}

type DetailsProps = {
    details: detail
}

export function Details({ details }: DetailsProps) {
    const { owner, tokenID, contractAddress, network, tokenId } = details;

    return (
        <div className={styles.details}>
            {owner && (
                <div className={styles.detailsItem}>
                    <div className={styles.detailsLabel}>Owner</div>
                    <Owner contractAddress={contractAddress} />
                </div>
            )}

            {tokenID && (
                <div className={styles.detailsItem}>
                    <div className={styles.detailsLabel}>Token ID</div>
                    <div className={styles.detailsValue}>{tokenID}</div>
                </div>
            )}

            {contractAddress && (
                <div className={styles.detailsItem}>
                    <div className={styles.detailsLabel}>Contract Address</div>

                    <div className={styles.detailsValue}>
                        <UnstyleLink
                            href={`https://example.com/wallet/${contractAddress}`}
                            rel='noreferrer noopener'
                            target='_blank'
                            className={styles.link}
                        >
                            {ellipseAddress(contractAddress)}
                        </UnstyleLink>
                    </div>
                </div>
            )}

            {network && (
                <div className={styles.detailsItem}>
                    <div className={styles.detailsLabel}>Network</div>
                    <div className={styles.detailsValue}>{network}</div>
                </div>
            )}

            {tokenId && (
                <div className={styles.detailsItem}>
                    <div className={styles.detailsLabel}>Token ID</div>

                    <div className={styles.detailsValue}>
                        <LinkIcon /> {tokenId}
                    </div>
                </div>
            )}
        </div>
    );
}
