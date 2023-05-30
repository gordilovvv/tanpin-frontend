import { Link as LinkIcon, UnstyleLink } from '@/uikit';
import { ellipseAddress } from '@/utils/addressHelper';
import { Owner } from '@/components/User';
import { NFT, TransactionType } from '@/states/types';
import { getAddressExplorerURL, getTransactionExplorerURL } from '@/utils/explorer';
import styles from './TokenDetails.module.scss';
import { DetailRow } from './Row/DetailRow';
import { useNFTStore } from '@/states/nft/store';
import { useMemo } from 'react';
import { activeChain } from '@/config/chain';

type TokenDetailsProps = {
    nft: NFT
}

export function TokenDetails({ nft }: TokenDetailsProps) {
    const historyTransactions = useNFTStore(state => state.historyTxs);

    const mintTransaction = useMemo(() => {
        return historyTransactions?.find(tx => tx.type === TransactionType.MINT);
    }, [historyTransactions]);

    return (
        <div className={styles.details}>
            <DetailRow title='Owned by'>
                <UnstyleLink
                    href={getAddressExplorerURL(nft.owner)}
                    rel='noreferrer noopener'
                    target='_blank'
                    className={styles.link}
                >
                    <Owner address={nft.owner} />
                </UnstyleLink>
            </DetailRow>

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
