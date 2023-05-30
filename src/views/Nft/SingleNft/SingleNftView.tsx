import { Container, PageWrapper } from '@/components/Layout';
import { Spin } from '@/uikit';
import { BlockWrap } from './components/BlockWrap/BlockWrap';
import { TokenAttributes } from './components/Attributes/TokenAttributes';
import { TokenDetails } from './components/Details/TokenDetails';
import { TokenImage } from './components/Image/TokenImage';
import { TokenAction } from './components/Action/TokenAction';
import { TokenHead } from './components/Head/TokenHead';
import { TokenShareLinks } from './components/ShareLinks/TokenShareLinks';
import { TokenHistory } from './components/History/TokenHistory';
import { useParams } from 'react-router-dom';
import { useNFTStore } from '@/states/nft/store';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useNFTAndAuctionQuery } from '@/states/nft/hooks/useNFTAndAuctionQuery';
import styles from './SingleNftView.module.scss';

export function SingleNftView() {
    const { tokenID } = useParams() as {
        gameID: string,
        collectionID: string,
        tokenID: string
    };

    const nft = useNFTStore(state => state.nft);
    const { isLoading, error } = useNFTAndAuctionQuery(tokenID);

    const isMobile = useMediaQuery('(max-width: 1000px)');

    if (isLoading || error || !nft) {
        return (
            <div className={styles.loading}>
                <Spin size='m' />
            </div>
        );
    }

    // TODO: Error
    // if (!nft) {
    //     return ({ error });
    // }

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
                            <TokenAction nft={nft} />
                            <TokenShareLinks />
                        </>}

                        <BlockWrap title="Properties">
                            <TokenAttributes attributes={nft.attributes} />
                        </BlockWrap>

                        <BlockWrap title="Description">
                            <div className={styles.description}>
                                {nft.description}
                            </div>
                        </BlockWrap>

                        {isMobile && <BlockWrap title="Details">
                            <TokenDetails nft={nft} />
                        </BlockWrap >}

                        <TokenHistory />
                    </div>

                    {!isMobile &&
                        <div className={styles.rightColumn}>
                            <TokenHead
                                nft={nft}
                                className={styles.head}
                            />

                            <TokenAction nft={nft} />
                            <TokenShareLinks />

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