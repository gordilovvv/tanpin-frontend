import { Container, PageWrapper } from '@/components/Layout';
import { Button, Polygon, Share, Spin } from '@/uikit';
import { Link } from 'react-router-dom';
import { CollectionLogo } from '@/components/Collections';
import { InfoItem } from './components/InfoItem/InfoItem';
import { Attributes } from './components/Attributes/Attributes';
import { Details } from './components/Details/Details';
import { BidsList } from './components/BidsList/BidsList';
import { TransactionsList } from './components/TransactionsList/TransactionsList';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Card } from './components/Card/Card';
import { useNFTQuery } from '@/states/nft/hooks/useNFTQuery';
import { activeChain } from '@/config/chain';
import { AuctionBorder } from './components/АuctionBorder/AuctionBorder';
import styles from './SingleNftView.module.scss';

const mockBids = [
    {
        type: 'mint',
        owner: '0x1a3b5c7d',
        date: '2023-05-25',
        transactionHash: '0xabc123',
    },
    {
        type: 'transfer',
        owner: '0xe2f4a6b8',
        transferedTo: '0x3d5f7h9j',
        date: '2023-05-24',
        transactionHash: '0xdef456',
    },
    {
        type: 'buy',
        owner: '0x9k8j7h6g',
        price: {
            amount: '10.25',
            currency: 'USDT',
        },
        date: '2023-05-23',
        transactionHash: '0xghi789',
    },
    {
        type: 'bid',
        owner: '0xc4v6b8n2',
        price: {
            amount: '5.75',
            currency: 'CUSTOM_TOKEN',
        },
        date: '2023-05-22',
        transactionHash: '0xjkl012',
    },
    {
        type: 'cancelBid',
        owner: '0x3h5k7j9d',
        date: '2023-05-21',
        transactionHash: '0xmnop34',
    },
];

const mockTransctions = [
    {
        type: 'mint',
        owner: '0x1a3b5c7d',
        date: '2023-05-25',
        transactionHash: '0xabc123',
    },
    {
        type: 'transfer',
        owner: '0xe2f4a6b8',
        transferedTo: '0x3d5f7h9j',
        date: '2023-05-24',
        transactionHash: '0xdef456',
    },
    {
        type: 'buy',
        owner: '0x9k8j7h6g',
        price: {
            amount: '10.25',
            currency: 'USDT',
        },
        date: '2023-05-23',
        transactionHash: '0xghi789',
    },
    {
        type: 'bid',
        owner: '0xc4v6b8n2',
        price: {
            amount: '5.75',
            currency: 'CUSTOM_TOKEN',
        },
        date: '2023-05-22',
        transactionHash: '0xjkl012',
    },
    {
        type: 'cancelBid',
        owner: '0x3h5k7j9d',
        date: '2023-05-21',
        transactionHash: '0xmnop34',
    },
];


export function SingleNftView() {
    const isMobile = useMediaQuery('(max-width: 1600px)');
    const { isLoading, nft, error } = useNFTQuery('3');
    console.log(nft);

    if (isLoading) return (
        <div className={styles.loading}><Spin size="s" /></div>
    );

    if (!nft) return (
        { error }
    );

    return (
        <PageWrapper>
            <Container space>
                <div className={styles.wrapper}>
                    <Card
                        link="/"
                        photoUrl={nft.imageURL}
                    />

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
                            <AuctionBorder>
                                <div className={styles.currentInfo}>
                                    <div className={styles.currentSubtitle}>Current bid:</div>
                                    <div className={styles.currentTitle}>56.8 MATIC</div>
                                    <div className={styles.currentPrice}>60 USDT</div>
                                </div>

                                <Button block>Place a bid</Button>

                                <div className={styles.currentTime}>
                                    Sale ends in <span className={styles.white}>17d 6h 37m 7s</span>
                                </div>
                            </AuctionBorder>


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
                                <Details details={{ ...nft, network: activeChain.name }} />
                            </InfoItem >


                            <AuctionBorder>
                                <Button>Take your bid back?</Button>
                            </AuctionBorder>


                        </div>}

                        <InfoItem title="Properties">
                            {
                                <Attributes attributes={nft.attributes} />
                            }
                        </InfoItem>

                        <InfoItem title="Description">
                            <div className={styles.description}>
                                {nft.description}
                            </div>
                        </InfoItem>

                        <InfoItem title="Bids">
                            <BidsList bids={mockBids} />
                        </InfoItem>

                        <InfoItem title="Bids">
                            <TransactionsList transactions={mockTransctions} />
                        </InfoItem>

                    </div>

                    {!isMobile &&
                        <div className={styles.column}>
                            <div className={styles.current}>
                                <div className={styles.currentInfo}>
                                    <div className={styles.currentSubtitle}>Current bid:</div>
                                    <div className={styles.currentTitle}>56.8 MATIC</div>
                                    <div className={styles.currentPrice}>60 USDT</div>
                                </div>

                                <Button block>Place a bid</Button>

                                <div className={styles.currentTime}>
                                    Sale ends in <span className={styles.white}>17d 6h 37m 7s</span>
                                </div>
                            </div>


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
                                <Details details={{ ...nft, network: activeChain.name }} />
                            </InfoItem >

                            <AuctionBorder>
                                <div className={styles.auctionTitle}>title</div>
                                <Button>Take your bid back?</Button>
                            </AuctionBorder >

                        </div>
                    }
                </div>
            </Container >
        </PageWrapper>
    );
}