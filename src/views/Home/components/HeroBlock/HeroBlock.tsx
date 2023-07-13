import { Arrow, Button, Title } from '@/uikit';
import heroCards from '@/app/assets/images/hero-cards.png';
import styles from './HeroBlock.module.scss';

type HeroBlockProps = {
}

export function HeroBlock({ }: HeroBlockProps) {
    return (
        <div className={styles.wrapper}>
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
                    view="secondary"
                    iconSlot={<Arrow className={styles.arrow} />}
                >Start Exploring</Button>
            </div>

            <div className={styles.collections}>
                <div className={styles.cards}>
                    <img
                        src={heroCards}
                        alt=''
                    />
                </div>

                <div className={styles.footer}>
                    <div className={styles.name}>NFTGTA.io</div>

                    <Button>
                        View collections
                    </Button>
                </div>
            </div>


            <div className={styles.greenEllipse} />
            <div className={styles.pinkEllipse} />
            <div className={styles.blueEllipse} />
        </div >
    );
}