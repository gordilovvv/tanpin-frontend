import { Button, Polygon, Share } from '@/uikit';
import { getAddressExplorerURL } from '@/utils/explorer';
import { NFTInStore } from '@/states/nft/types';
import styles from './TokenShareLinks.module.scss';

type TokenShareLinksProps = {
    nft: NFTInStore
}

export function TokenShareLinks({ nft }: TokenShareLinksProps) {
    return (
        <div className={styles.buttons}>
            <Button
                as='a'
                href={getAddressExplorerURL(nft.contractAddress)}
                rel='noreferrer noopener'
                target='_blank'
                view='secondary'
                iconSlot={<Polygon />}
            >
                PolygonScan
            </Button>

            <Button
                iconSlot={<Share />}
                view='secondary'
            >
                Share
            </Button>
        </div>
    );
}