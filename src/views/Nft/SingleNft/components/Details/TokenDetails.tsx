import { Link as LinkIcon, UnstyleLink } from '@/uikit';
import { ellipseAddress } from '@/utils/addressHelper';
import { Owner } from '@/components/User';
import { getAddressExplorerURL, getTransactionExplorerURL } from '@/utils/explorer';
import { DetailRow } from './Row/DetailRow';
import { useMemo } from 'react';
import { activeChain } from '@/config/chain';
import { NFT } from '@/states/types';
import { ActivityType } from '@/states/activity/types';
import { isSingleNFT } from '@/utils/nft';
import { useActivityStore } from '@/states/activity/store';
import styles from './TokenDetails.module.scss';

type TokenDetailsProps = {
    nft: NFT
}

export function TokenDetails({ nft }: TokenDetailsProps) {
    const isSingle = isSingleNFT(nft);
    const historyTransactions = useActivityStore(state => state.tokenActivity);

    const mintTransaction = useMemo(() => {
        return historyTransactions?.find(tx => tx.type === ActivityType.MINT);
    }, [historyTransactions]);

    return (
        <div className={styles.details}>
            {isSingle && <DetailRow title='Owned by'>
                <Owner
                    address={nft.owner}
                    size='s'
                />
            </DetailRow>}

            {mintTransaction && <DetailRow title='Token ID'>
                <UnstyleLink
                    href={getTransactionExplorerURL(mintTransaction.transactionHash)}
                    rel='noreferrer noopener'
                    target='_blank'
                    className={styles.link}
                >
                    <LinkIcon /> {nft.tokenID}
                </UnstyleLink>
            </DetailRow>}

            <DetailRow title='Network'>
                {activeChain.name}
            </DetailRow>

            <DetailRow title='Token Standard'>
                ERC-1155
            </DetailRow>

            <DetailRow title='Contract Address'>
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
