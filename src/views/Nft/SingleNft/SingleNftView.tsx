import styles from './SingleNftView.module.scss';
import { Container } from '@/components/Layout';
import { Button, Link as LinkIcon, Polygon, Share } from '@/uikit';
import { Link } from 'react-router-dom';
import { CollectionLogo } from '@/components/Collections';
import { InfoItem } from './components/InfoItem/InfoItem';
import { BidStatus } from './components/BidStatus/BitStatus';

//ellipseAddress
//

export function SingleNftView() {
    return (
        <Container>
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

                    <InfoItem title="Properties">
                        <div className={styles.inner}>
                            {(new Array(10).fill(1)).map((el, key) =>
                                <div
                                    className={styles.item}
                                    key={key}
                                >
                                    <div className={styles.itemTitle}>Rarity</div>
                                    <div className={styles.itemBody}>Legendary</div>
                                </div>)}
                        </div>
                    </InfoItem>

                    <InfoItem title="Description">
                        <div className={styles.description}>
                            The Mercedes-Benz A-Class is a compact car produced by the German automobile manufacturer Mercedes-Benz as the brand's entry-level vehicle. The A 45 AMG is a performance version of the A-Class.
                        </div>
                    </InfoItem>

                    <InfoItem title="History">
                        <div
                            className={styles.history}
                        >
                            <div className={styles.historyItem}>
                                <div className={styles.historyLogo} />


                                <div className={styles.historyInfo}>
                                    <div className={styles.historyTitle}>
                                        <span className={styles.white}>0x24f73...d6f9</span> listed for <span className={styles.white}>1.83 USDT</span>
                                    </div>

                                    <div className={styles.historyMeta}>
                                        01.05.2022, 07:20
                                    </div>
                                </div>
                            </div>

                            <div className={styles.historyItem}>
                                <div className={styles.historyLogo} />


                                <div className={styles.historyInfo}>
                                    <div className={styles.historyTitle}>
                                        <span className={styles.white}>0x24f73...d6f9</span> listed for <span className={styles.white}>1.83 USDT</span>
                                    </div>

                                    <div className={styles.historyMeta}>
                                        01.05.2022, 07:20 <LinkIcon />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </InfoItem>

                </div>

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
                        <div className={styles.details}>
                            <div className={styles.detailsItem}>
                                <div className={styles.detailsLabel}>Owned by</div>
                                <div className={styles.detailsValue}>Polygon</div>
                            </div>

                            <div className={styles.detailsItem}>
                                <div className={styles.detailsLabel}>Owned by</div>
                                <div className={styles.detailsValue}>Polygon</div>
                            </div>

                            <div className={styles.detailsItem}>
                                <div className={styles.detailsLabel}>Owned by</div>
                                <div className={styles.detailsValue}>Polygon</div>
                            </div>

                            <div className={styles.detailsItem}>
                                <div className={styles.detailsLabel}>Owned by</div>
                                <div className={styles.detailsValue}> <LinkIcon /> Polygon</div>
                            </div>
                        </div>
                    </InfoItem >

                    <BidStatus
                        title="You’ve lost this auction"
                        view="error"
                    >
                        <Button>Take your bid back?</Button>
                    </BidStatus >

                </div>


            </div>
        </Container>
    );
}