import { Button } from '@/uikit';
import { Container, PageWrapper } from '@/components/Layout';
import styles from './TokenClaimView.module.scss';
import promoImg from '@/app/assets/bg/big-promo.png';

export function TokenClaimView() {

    return (
        <PageWrapper>

            <Container
                className={styles.wrapper}
                space
            >
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

                <div
                    className={styles.inner}
                    style={{ background: `#0C0C0C url(${promoImg})` }}
                >
                    <div className={styles.top}>
                        <div className={styles.images}>
                            <img
                                src='src/app/assets/bg/dots-border.svg'
                                className={styles.border}
                            />
                            <img
                                src="src/app/assets/images/crystal2.png"
                                className={styles.icon}
                            />
                        </div>
                        <div className={styles.title}>TOKEN CLAIM</div>
                    </div>

                    <div className={styles.items}>
                        <div className={styles.item}>
                            <div className={styles.itemTitle}>Title</div>
                            <div className={styles.itemValue}>sdfdsfsd</div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.itemTitle}>Title</div>
                            <div className={styles.itemValue}>sdfdsfsd</div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.itemTitle}>Title</div>
                            <div className={styles.itemValue}>sdfdsfsd</div>
                        </div>
                    </div>

                    <Button>
                        Connect Wallet
                    </Button>

                    <div className={styles.text}>You will need to sign multiple blockchain transactions<br />if you have tokens available to claim in multiple vesting rounds.</div>

                </div>

            </Container>
        </PageWrapper>
    );
}
