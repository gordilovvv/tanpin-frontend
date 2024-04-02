import { useMemo } from 'react';
import { Link as LinkIcon, UnstyleLink } from '@/uikit';
import { Owner } from '@/components/User';
import { DetailRow } from './Row/DetailRow';
import { activeChain } from '@/config/chain';
import { useTranslation } from '@/localization';
import { useActivityStore } from '@/states/activity/store';
import { getAddressExplorerURL, getTransactionExplorerURL } from '@/utils/explorer';
import { ellipseAddress } from '@/utils/addressHelper';
import { ActivityType } from '@/states/activity/types';
import { NFT } from '@/states/types';
import styles from './TokenDetails.module.scss';

type TokenDetailsProps = {
    nft: NFT,
    unique: boolean
}

export function TokenDetails({ nft, unique }: TokenDetailsProps) {
    const { t } = useTranslation();
    const historyTransactions = useActivityStore(state => state.activityList);

    const ownerAddress = unique ? nft.owners[0].owner : undefined;
    const mintTransaction = useMemo(() => {
        return historyTransactions?.find(tx => tx.type === ActivityType.MINT);
    }, [historyTransactions]);

    return (
        <div className={styles.details}>
            {ownerAddress && <DetailRow title={t('Owned by')}>
                <Owner
                    address={ownerAddress}
                    size='s'
                />
            </DetailRow>}

            {mintTransaction && <DetailRow title={t('Token ID')}>
                <UnstyleLink
                    href={getTransactionExplorerURL(mintTransaction.transactionHash)}
                    rel='noreferrer noopener'
                    target='_blank'
                    className={styles.link}
                >
                    <LinkIcon /> {nft.tokenID}
                </UnstyleLink>
            </DetailRow>}

            <DetailRow title={t('Network')}>
                {activeChain.name}
            </DetailRow>

            <DetailRow title={t('Token Standard')}>
                ERC-1155
            </DetailRow>

            <DetailRow title={t('Contract Address')}>
                <UnstyleLink
                    href={getAddressExplorerURL(nft.contractAddress)}
                    rel='noreferrer noopener'
                    target='_blank'
                    className={styles.link}
                >
                    <LinkIcon /> {ellipseAddress(nft.contractAddress)}
                </UnstyleLink>
            </DetailRow>
        </div >
    );
}
