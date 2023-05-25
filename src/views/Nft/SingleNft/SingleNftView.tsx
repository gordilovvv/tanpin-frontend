import { Container } from '@/components/Layout';
import { Button, Polygon, Share } from '@/uikit';
import { Link } from 'react-router-dom';
import { CollectionLogo } from '@/components/Collections';
import { InfoItem } from './components/InfoItem/InfoItem';
import { BidStatus } from './components/BidStatus/BitStatus';
import { Attributes } from './components/Attributes/Attributes';
import { NFTAttribute } from '@/states/types';
import { Details } from './components/Details/Details';
import { BidsList } from './components/BidsList/BidsList';
import { TransactionsList } from './components/TransactionsList/TransactionsList';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import styles from './SingleNftView.module.scss';
import { Card } from './components/Card/Card';
import { getTransactionExplorerURL } from "@/utils/explorer";

const mockDetails = {
    owner: 'John Doe',
    tokenID: '123456789',
    contractAddress: '0x123456789ABCDEF',
    network: 'Ethereum',
};

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
]

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
]

const mockAttributes = [
    {
        traitType: 'traitType',
        value: 'traitType',
    },
    {
        traitType: 'traitType2',
        value: 'traitType2',
    },
    {
        traitType: 'traitType3',
        value: 'traitType3',
    }
] as NFTAttribute[];

export function SingleNftView() {
    const isMobile = useMediaQuery('(max-width: 1600px)'); //видимо надо переименовать в isBreakpoint? todo
    getTransactionExplorerURL()
    return (
        <Container space>
            <div className={styles.wrapper}>
                <Card
                    link="/"
                    photoUrl='https://images.thevoicemag.ru/upload/img_cache/1c8/1c83f6f695855deceec54ebd48a3d40b_cropped_666x833.jpg'
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
                            Mercedes-Benz A45 AMG
                        </div>
                    </div>

                    {isMobile && < div className={styles.bid}>
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
                            <Details details={mockDetails} />  {/* todo как это можно решить? */}
                        </InfoItem >

                        <BidStatus
                            title="You’ve lost this auction"
                            view="error"
                        >
                            <Button>Take your bid back?</Button>
                        </BidStatus >

                    </div>}

                    <InfoItem title="Properties">
                        {
                            <Attributes attributes={mockAttributes} />
                        }
                    </InfoItem>

                    <InfoItem title="Description">
                        <div className={styles.description}>
                            The Mercedes-Benz A-Class is a compact car produced by the German automobile manufacturer Mercedes-Benz as the brand's entry-level vehicle. The A 45 AMG is a performance version of the A-Class.
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
                    <div className={styles.bid}>
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
                            <Details details={mockDetails} />
                        </InfoItem >

                        <BidStatus
                            title="You’ve lost this auction"
                            view="error"
                        >
                            <Button>Take your bid back?</Button>
                        </BidStatus >

                    </div>
                }
            </div>
        </Container >
    );
}