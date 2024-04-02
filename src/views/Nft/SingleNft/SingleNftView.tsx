import { useMemo } from 'react';
import { Container, PageError, PageLoader, PageWrapper } from '@/components/Layout';
import { TokenAttributes, TokenImage } from '@/components/Nft';
import { BlockWrap } from './components/BlockWrap/BlockWrap';
import { TokenDetails } from './components/Details/TokenDetails';
import { TokenHead } from './components/Head/TokenHead';
import { TokenTabs } from './components/Tabs/TokenTabs';
import { OwnerAction } from './components/Action/OwnerAction';
import { BestOffer } from './components/Action/BestOffer';
import { useParams } from 'react-router-dom';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useNFTStore } from '@/states/nft/store';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useNFTFetch } from '@/states/nft/hooks/useNFTFetch';
import { useTokenHistory } from '@/states/nft/hooks/useTokenHistory';
import { useTranslation } from '@/localization';
import { isUniqueNFT } from '@/utils/nft';
import { isAddressEqual } from '@/utils/addressHelper';
import styles from './SingleNftView.module.scss';

export function SingleNftView() {
    const { t } = useTranslation();
    const { address: userAddress } = useAccount();
    const { contractAddress, tokenID } = useParams() as {
        contractAddress: `0x${string}`,
        tokenID: string
    };

    useTokenHistory(tokenID);

    const nft = useNFTStore(state => state.nft);
    const isMobile = useMediaQuery('(max-width: 1000px)');
    const isUnique = !!nft && isUniqueNFT(nft);
    const { isLoading, error } = useNFTFetch(contractAddress, tokenID);

    const tokenAction = useMemo(() => {
        if (!nft) {
            return null;
        }

        const userOwner = userAddress
            ? nft.owners.find(({ owner }) => isAddressEqual(userAddress, owner))!
            : undefined;

        if (userOwner) {
            return (
                <OwnerAction
                    contractAddress={nft.contractAddress}
                    tokenID={nft.tokenID}
                    amount={userOwner.value}
                    sales={userOwner.sales}
                    auctions={userOwner.auctions}
                    status={userOwner.status}
                />
            );
        } else {
            return (<BestOffer nft={nft} />);
        }
    }, [nft, userAddress]);

    if (isLoading) {
        return (<PageLoader />);
    }

    if (error || !nft) {
        return (<PageError error={error} />);
    }

    return (
        <PageWrapper>
            <Container space>
                <div className={styles.wrapper}>
                    <div className={styles.leftColumn}>
                        <TokenImage
                            contractAddress={nft.contractAddress}
                            tokenID={nft.tokenID}
                            image={nft.imageURL}
                        />
                    </div>

                    <div className={styles.content}>
                        <TokenImage
                            contractAddress={nft.contractAddress}
                            tokenID={nft.tokenID}
                            image={nft.imageURL}
                            className={styles.image}
                        />

                        <TokenHead
                            nft={nft}
                            unique={isUnique}
                            className={styles.head}
                        />

                        {isMobile && <>
                            {tokenAction}
                        </>}

                        {!!nft.attributes.length && <BlockWrap title={t('Properties')}>
                            <TokenAttributes attributes={nft.attributes} />
                        </BlockWrap>}

                        {nft.description && <BlockWrap title={t('Description')}>
                            <div className={styles.description}>
                                {nft.description}
                            </div>
                        </BlockWrap>}

                        {isMobile && <BlockWrap title={t('Details')}>
                            <TokenDetails
                                nft={nft}
                                unique={isUnique}
                            />
                        </BlockWrap >}

                        <TokenTabs nft={nft} />
                    </div>

                    {!isMobile &&
                        <div className={styles.rightColumn}>
                            <TokenHead
                                nft={nft}
                                unique={isUnique}
                                className={styles.head}
                            />

                            {tokenAction}

                            <BlockWrap title={t('Details')}>
                                <TokenDetails
                                    nft={nft}
                                    unique={isUnique}
                                />
                            </BlockWrap>
                        </div>
                    }
                </div>
            </Container >
        </PageWrapper>
    );
}