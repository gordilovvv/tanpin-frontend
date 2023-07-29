import { useMemo } from 'react';
import { Container, PageError, PageLoader, PageWrapper } from '@/components/Layout';
import { BlockWrap } from './components/BlockWrap/BlockWrap';
import { TokenAttributes, TokenImage } from "@/components/Nft";
import { TokenDetails } from './components/Details/TokenDetails';
import { TokenHead } from './components/Head/TokenHead';
import { TokenTabs } from './components/Tabs/TokenTabs';
import { OwnerAction } from './components/Action/Owner/OwnerAction';
import { SaleAction } from './components/Action/SaleAction';
import { BestOfferAction } from './components/Action/BestOfferAction';
import { useParams } from 'react-router-dom';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useNFTStore } from '@/states/nft/store';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useNFTFetch } from '@/states/nft/hooks/useNFTFetch';
import { useTransactionsHistory } from '@/states/nft/hooks/useTransactionsHistory';
import { isAddressOwner } from '@/utils/addressHelper';
import { isMultipleNFT, isOwnerOfMultipleNFT, isSingleNFT } from '@/utils/nft';
import { moneyTokensIds } from '@/config/constants/nftgta';
import { GameDeposit } from './components/Action/GameDeposit/GameDeposit';
import styles from './SingleNftView.module.scss';

// TODO: Доделать кнопку share
export function SingleNftView() {
    const { address } = useAccount();
    const { tokenID } = useParams() as {
        gameID: string,
        collectionID: string,
        tokenID: string
    };

    useTransactionsHistory(tokenID);

    const nft = useNFTStore(state => state.nft);
    const isMobile = useMediaQuery('(max-width: 1000px)');
    const isSingle = nft && isSingleNFT(nft);
    const isMultiple = nft && isMultipleNFT(nft);
    const { isLoading, error } = useNFTFetch(tokenID);

    const tokenAction = useMemo(() => {
        if (!nft) {
            return null;
        }

        // Unique token
        if (isSingle) {
            const isUserOwner = isAddressOwner(address, nft.owner);

            if (isUserOwner) {
                return (<OwnerAction
                    nftID={nft.ID}
                    tokenID={nft.tokenID}
                    sale={nft.sale}
                    auction={nft.auction}
                    status={nft.status}
                />);
            } else {
                return (<SaleAction
                    nftID={nft.ID}
                    sale={nft.sale}
                    auction={nft.auction}
                    status={nft.status}
                />)
            }
        }

        // Multiple token (Copies)
        if (isMultiple) {
            const ownerOfCopy = isOwnerOfMultipleNFT(
                address,
                nft.owners
            );

            if (ownerOfCopy) {
                let availableEditions = ownerOfCopy.value;

                for (const sale of ownerOfCopy.sales) {
                    availableEditions -= sale.stock;
                }

                for (const auction of ownerOfCopy.auctions) {
                    availableEditions -= auction.amount;
                }

                return (<>
                    {moneyTokensIds.includes(nft.tokenID) && availableEditions > 0 && <GameDeposit
                        nftID={nft.ID}
                        tokenID={nft.tokenID}
                        editionsAvailable={availableEditions}
                    />}
                    <OwnerAction
                        nftID={nft.ID}
                        tokenID={nft.tokenID}
                        availableEditions={availableEditions}
                        sale={ownerOfCopy.sales[0]}
                        auction={ownerOfCopy.auctions[0]}
                        status={ownerOfCopy.status}
                    />
                </>);
            } else {
                return (<BestOfferAction nft={nft} />)
            }
        }

        return null;
    }, [nft, address, isSingle, isMultiple]);

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
                        <TokenImage image={nft.imageURL} />
                    </div>

                    <div className={styles.content}>
                        <TokenImage
                            image={nft.imageURL}
                            className={styles.image}
                        />

                        <TokenHead
                            nft={nft}
                            className={styles.head}
                        />

                        {isMobile && <>
                            {tokenAction}
                            {/* <TokenShareLinks nft={nft} /> */}
                        </>}

                        {!!nft.attributes.length && <BlockWrap title="Properties">
                            <TokenAttributes attributes={nft.attributes} />
                        </BlockWrap>}

                        <BlockWrap title="Description">
                            <div className={styles.description}>
                                {nft.description}
                            </div>
                        </BlockWrap>

                        {isMobile && <BlockWrap title="Details">
                            <TokenDetails nft={nft} />
                        </BlockWrap >}

                        <TokenTabs nft={nft} />
                    </div>

                    {!isMobile &&
                        <div className={styles.rightColumn}>
                            <TokenHead
                                nft={nft}
                                className={styles.head}
                            />

                            {tokenAction}
                            {/* <TokenShareLinks nft={nft} /> */}

                            <BlockWrap title="Details">
                                <TokenDetails nft={nft} />
                            </BlockWrap>
                        </div>
                    }
                </div>
            </Container >
        </PageWrapper>
    );
}