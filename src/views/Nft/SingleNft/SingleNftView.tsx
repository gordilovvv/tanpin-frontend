import { Container } from '@/components/Layout';
import { Button, Link as LinkIcon, Polygon, Share } from '@/uikit';
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
                <div className={styles.card}>
                    <img
                        className={styles.img}
                        src="https://s3-alpha-sig.figma.com/img/2f18/5f5e/18100085c77444b3e00e10428a0599cd?Expires=1684713600&Signature=hYwf6-BNv-lEf0wSulBi1n8F0-cQvZrzBCMu~~Q8SP3u-E8c9rgYpDFPgRg7yXCje5ndOs31Mh8FSqTuMU3DARndDpEYCTYP930qIo--wffxg95QIFJik7Q7~9cLI-~Z8rTJ9eR1GeB1PojbhoW1hzwfwGCZOCVQw2dfGqkPpoT9XA0G1QQ-6zO96vwdBDIwsBl~gA0sNr0m5fZDRUsex8NScXdpgUNjAdWYZ96OTB4DOSjXQ8LZqgoqNiJeazctS3-U5cTCIjiTI0-2aEPjGAQsaL6oysJ~rIJ9xvH7kGvYcs5rWfD34pDCKDGF0uy2TsbovJz~5AVzucGicIkMyw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                    />

                    <Button
                        view="secondary"
                        className={styles.btn}
                        iconSlot={<LinkIcon />}
                    >
                        View original
                    </Button>
                </div>

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