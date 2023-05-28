import { Container, PageWrapper } from '@/components/Layout';
import { Button, Polygon, Share, Spin } from '@/uikit';
import { Link } from 'react-router-dom';
import { CollectionLogo } from '@/components/Collections';
import { InfoItem } from './components/InfoItem/InfoItem';
import { Attributes } from './components/Attributes/Attributes';
import { Details } from './components/Details/Details';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useNFTQuery } from '@/states/nft/hooks/useNFTQuery';
import { activeChain } from '@/config/chain';
import styles from './SingleNftView.module.scss';
import { TokenImage } from './components/Image/TokenImage';
import { TokenAction } from './components/Action/TokenAction';
import { TransactionsHistory } from './components/TransactionsHistory/TransactionsHistory';
import { AuctionBetsHistory } from './components/AuctionBetsHistory/AuctionBetsHistory';

// TODO: АДАПТИРОВАТЬ ЛЕАУТ ЕШЕ РАЗ
export function SingleNftView() {
    const isMobile = useMediaQuery('(max-width: 1600px)');
    const { isLoading, nft, error } = useNFTQuery('3');

    if (isLoading) {
        return (
            <div className={styles.loading}><Spin size='m' /></div>
        );
    }

    if (!nft) {
        return ({ error });
    }

    return (
        <PageWrapper>
            <Container space>
                <div className={styles.wrapper}>
                    <TokenImage image={nft.imageURL} />

                    <div className={styles.info}>
                        <div className={styles.header}>
                            <div className={styles.subtitle}>
                                <Link
                                    to="/"
                                    className={styles.link}
                                >
                                    <CollectionLogo
                                        image='https://e7.pngegg.com/pngimages/556/552/png-clipart-grand-theft-auto-v-grand-theft-auto-vice-city-computer-icons-rockstar-games-grand-theft-auto-episodes-from-liberty-city-social-icons-miscellaneous-game.png'
                                        size='xxs'
                                    />
                                </Link>

                                <Link
                                    to="/"
                                    className={styles.link}
                                >
                                    <span className={styles.headerText}>
                                        Cars Drop 2023
                                    </span>
                                </Link>
                            </div>

                            <div className={styles.title}>
                                {nft.name}
                            </div>
                        </div>

                        {isMobile && < div className={styles.column}>
                            <TokenAction nft={nft} />

                            <div className={styles.buttons}>
                                <Button
                                    iconSlot={<Polygon />}
                                    view="secondary"
                                >PolygonScan</Button>

                                <Button
                                    iconSlot={<Share />}
                                    view="secondary"
                                >Share</Button>
                            </div>

                            <InfoItem title="Details">
                                <Details
                                    details={nft}
                                    network={activeChain.name}
                                />
                            </InfoItem >
                        </div>}

                        <InfoItem title="Properties">
                            <Attributes attributes={nft.attributes} />
                        </InfoItem>

                        <InfoItem title="Description">
                            <div className={styles.description}>
                                {nft.description}
                            </div>
                        </InfoItem>

                        <InfoItem title="Bids">
                            <AuctionBetsHistory id={nft.ID} />
                        </InfoItem>

                        <InfoItem title="transitions">
                            <TransactionsHistory id={nft.ID} />
                        </InfoItem>

                    </div>

                    {!isMobile &&
                        <div className={styles.column}>
                            <TokenAction nft={nft} />

                            <div className={styles.buttons}>
                                <Button
                                    iconSlot={<Polygon />}
                                    view="secondary"
                                >PolygonScan</Button>

                                <Button
                                    iconSlot={<Share />}
                                    view="secondary"
                                >Share</Button>
                            </div>

                            <InfoItem title="Details">
                                <Details
                                    details={nft}
                                    network={activeChain.name}
                                />
                            </InfoItem >
                        </div>
                    }
                </div>
            </Container >
        </PageWrapper>
    );
}