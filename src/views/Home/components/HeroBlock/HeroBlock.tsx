import { Arrow, Button, Title } from '@/uikit';
import styles from './HeroBlock.module.scss';

type HeroBlockProps = {
}

export function HeroBlock({ }: HeroBlockProps) {
    return (
        <div className={styles.wrapper}>


            <div className={styles.main}>
                <div className={styles.info}>
                    <Title className={styles.title}>
                        Discover, Buy and Sell
                        <div className={styles.green}>
                            Unique Gaming NFTs
                        </div>
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
                    {(new Array(4)).fill(1).map((el, idx) => (
                        <div
                            className={styles.imageWrap}
                            style={{ opacity: (idx * 25 + 25) + '%' }}
                        >
                            <img
                                src="https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9pLnNlYWRuLmlvL2djcy9maWxlcy81NmQ1NDJjNjdiNjAyOTA4NzVkMzNiZDhiNTlhNTljNi5naWY/YXV0bz1mb3JtYXQmdz0xMDAw"
                                className={styles.image}
                            />
                        </div>))
                    }
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