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
import { useIsMobile } from '@/hooks/useIsMobile';
import styles from './SingleNftView.module.scss';
import { Card } from './components/Card/Card';

const mockDetails = {
    owner: 'John Doe',
    tokenID: '123456789',
    contractAddress: '0x123456789ABCDEF',
    network: 'Ethereum',
    tokenId: '987654321',
};

const mockBids = [
    {
        contractAddress: '0x24f73...d6f9',
        currency: 'USDT',
        amount: '1.83',
        date: new Date('2022-05-01T07:20:00'),
    },
    {
        contractAddress: '0x12345...6789',
        currency: 'USDT',
        amount: '2.50',
        date: new Date('2022-06-15T12:30:00'),
    },
];
const mockTransctions = [
    {
        contractAddress: '0x24f73...d6f9',
        currency: 'USDT',
        amount: '1.83',
        date: new Date('2022-05-01T07:20:00'),
    },
    {
        contractAddress: '0x12345...6789',
        currency: 'USDT',
        amount: '2.50',
        date: new Date('2022-06-15T12:30:00'),
    },
];

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
    const isMobile = useIsMobile(1000); //видимо надо переименовать в isBreakpoint? todo

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
                            <Details details={mockDetails} />
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