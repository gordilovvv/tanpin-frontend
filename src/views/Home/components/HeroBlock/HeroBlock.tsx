import { Button, FeaturedGame, SvgProps, Title } from '@/uikit';
import { Container } from '@/components/Layout';
import heroCards from '@/app/assets/images/hero-cards.png';
import styles from './HeroBlock.module.scss';
import { Link } from 'react-router-dom';

const ArrowDown = (props: SvgProps) => {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.0303 9.21967C14.3232 9.51256 14.3232 9.98744 14.0303 10.2803L9.53033 14.7803C9.23744 15.0732 8.76256 15.0732 8.46967 14.7803L3.96967 10.2803C3.67678 9.98744 3.67678 9.51256 3.96967 9.21967C4.26256 8.92678 4.73744 8.92678 5.03033 9.21967L8.25 12.4393L8.25 3.75C8.25 3.33579 8.58579 3 9 3C9.41421 3 9.75 3.33579 9.75 3.75L9.75 12.4393L12.9697 9.21967C13.2626 8.92678 13.7374 8.92678 14.0303 9.21967Z"
                fill="currentColor"
            />
        </svg>
    );
};

export function HeroBlock() {
    return (
        <div className={styles.wrap}>
            <Container space>
                <div className={styles.content}>
                    <div
                        className={styles.background}
                        style={{
                            ['--gradient-1' as string]: '#3CE361',
                            ['--gradient-2' as string]: '#1C379A',
                            ['--gradient-3' as string]: 'rgba(255, 0, 122, 0.50)',
                        }}
                    >
                        <div className={styles.gradientFirst}></div>
                        <div className={styles.gradientSecond}></div>
                        <div className={styles.gradientThird}></div>
                    </div>

                    <div className={styles.main}>
                        <div className={styles.info}>
                            <Title className={styles.title}>
                                Discover, Buy and Sell<br />
                                <span>Unique Gaming NFTs</span>
                            </Title>

                            <div className={styles.text}>
                                Tanpin is the new generation marketplace,
                                bridging off-chain games with Web 3.0
                            </div>
                        </div>

                        <Button
                            to='/collections'
                            view="secondary"
                            iconSlot={<ArrowDown />}
                        >
                            Start Exploring
                        </Button>
                    </div>

                    <div className={styles.featured}>
                        <div className={styles.label}>
                            <div className={styles.labelIcon}>
                                <FeaturedGame />
                            </div>

                            <div className={styles.labelText}>
                                Featured Game
                            </div>
                        </div>

                        <div className={styles.cards}>
                            <Link
                                to='/'
                                className={styles.cardsLink}
                            >
                                <img
                                    src={heroCards}
                                    alt=''
                                />
                            </Link>
                        </div>

                        <div className={styles.game}>
                            <div className={styles.gameName}>
                                NFTGTA.io
                            </div>

                            {/* TODO: real url */}
                            <Button to='/aabb4a6c-eb73-458a-9f72-2f4438e49e18/026dcd1f-f604-4f61-b9f0-b367f55d8dcd'>
                                View collections
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </div >
    );
}