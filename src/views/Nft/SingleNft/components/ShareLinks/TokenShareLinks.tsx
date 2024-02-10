import { Button, Polygon, Share } from '@/uikit';
import { getAddressExplorerURL } from '@/utils/explorer';
import { NFT } from '@/states/types';
import { useTranslation } from '@/localization';
import styles from './TokenShareLinks.module.scss';

type TokenShareLinksProps = {
    nft: NFT
}

export function TokenShareLinks({ nft }: TokenShareLinksProps) {
    const { t } = useTranslation();

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
                {t('Share')}
            </Button>
        </div>
    );
}